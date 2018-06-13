// pages/goodsList/goodsList.js
var config = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //商品列表
    list: '',
    complexFold: true,
    complexText: '综合',
    maskShow: false,
    //是否显示筛选二级页面
    showSelectAll: false,
    //二级页面数据
    filterPanel2:{
      name: '',
      value: ''
    },
    //筛选options
    filterOptions:{
      price: '',
      gender: '',
      season: '',
      situation: '',
      series: '',
      color: '',
      size: '',
      fabrics: '',
    },
    //默认图片
    defaultImg: '',
    //
    lazyloadList: [],
    //一页有多少条数据
    pageSize: '',
    //当前页数
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var _this = this;

    this.fetchGoodsList(1,function(data){
      //创造一个每个值都为false，长度和list一样的数组
      var length = data.list.length;
      _this.setData({pageSize: length});
      var arr = [];
      // arr = arr.join('false,').split(',');
      // arr.length = arr.length - 1;
      for(var i = 0; i< length;i++){
        if(i<4){
          arr[i] = true
        }
        else{
          arr[i] = false;
        }
      }
      // var arrHeight = [];
      // data.list.forEach(function(item,index){
      //   arrHeight[index] = Math.floor(index / 2 ) * 340;
      // })
      _this.setData({ 
        list : data.list,
        defaultImg: data.img_host.default,
        lazyloadList : arr,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  fetchGoodsList: function (pageNum,callback) {
    pageNum = pageNum ? pageNum : 1;
    wx.request({
      url: 'http://m.banggo.com/searchbrand/get-search-goods/a_a_a_MC_a_a_a_a_a_a_a_a.shtml?ts=&discountRate=a&controller=searchBrand&suffix=&word=&currentPage=' + pageNum,
      success: function (res) {
        callback(res.data.data);
      }
    })
  },
  complexHandler: function(){
    var complexFold = this.data.complexFold;
    this.setData({ complexFold: !complexFold});
  },
  changeComplex: function(e){
    var text = e.target.dataset.text;
    this.setData({ 
      complexText: text,
      complexFold: true
    });
  },
  filterUnfold: function(){
    var _this = this;
    this.setData({ filterPanel : true});
    wx.request({
      url: 'http://m.banggo.com/searchbrand/get-filter-info/a_a_a_MC_a_a_a_a_a_a_a_a.shtml?ts=&discountRate=a&controller=searchBrand&suffix=&word=&',
      success: function(res){
        var othersList = res.data.data.others;
        var category = res.data.data.cate;
        _this.setData({
          category : category,
          othersList : othersList
        })
      }
    })
  },
  //滚动事件
  scrollHandler:function(e){
    var scrollTop = e.detail.scrollTop;
    var calc = Math.floor((scrollTop + 1360/config.config.dpi)/(680/config.config.dpi)*2);
    console.log(scrollTop);
    console.log(calc);
    var arr = this.data.lazyloadList;
    if ( arr[calc] == false ){
      for(var i = 0;i<arr.length;i++){
        if(i<calc){
          arr[i] = true;
        }else{
          break;
        }
      }
      this.setData({ lazyloadList : arr});
    }
  },
  scrolltoLowerHandler:function(){
    var size = this.data.pageSize;
    var num = this.data.pageNum;
    var _this = this;
    var list = _this.data.list;
    var arr = this.data.lazyloadList;
    var newArr = [];
    for (var i = 0; i < size;i++){
      newArr[i] = false;
    }
    this.fetchGoodsList(num + 1, function (data) {
      var newList = data.list;
      
      _this.setData({ 
        list: list.concat(newList),
        lazyloadList: arr.concat(newArr),
        pageNum: num+1
      });
      // debugger;
    });
  },
  // 收起筛选页面
  foldFilterPanel: function(){
    this.setData({ 
      filterPanel : false ,
      showSelectAll: false
    });
  },
  // 筛选二级页面展开
  showSelectAllHandler: function(e){
    var name = e.target.dataset.name;
    var value = e.target.dataset.value;
    this.setData({
      showSelectAll : true,
      filterPanel2:{
        name: name,
        value: value
      }
    });
  },
  //筛选二级返回一级
  backFirstCate: function(){
    this.setData({
      showSelectAll : false,
      filterPanel: true
    })
  },
  selectFilter: function(e){
    var code = e.target.dataset.code;
    var name = e.target.dataset.name;
  },
  generateLazyLoadList: function(){

  }
})