// pages/goodsList/goodsList.js
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var _this = this;
    // this.fetchGoodsList();
    // debugger;
    // this.setData({ list : data.list});
    // this.setData({ defaultImg : data.img_hsot});
    this.fetchGoodsList(1,function(data){
      _this.setData({ list : data.list});
      _this.setData({ defaultImg : data.img_hsot});
    })
    
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
  fetchGoodsList: function (pageNum,func) {
    pageNum = pageNum ? pageNum : 1;
    wx.request({
      url: 'http://m.banggo.com/searchbrand/get-search-goods/a_a_a_MC_a_a_a_a_a_a_a_a.shtml?ts=&discountRate=a&controller=searchBrand&suffix=&word=&currentPage=' + pageNum,
      success: function (res) {
        func(res.data.data);
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
  scrollHandler:function(){
    // debugger;
  },
  foldFilterPanel: function(){
    this.setData({ 
      filterPanel : false ,
      showSelectAll: false
    });
  },
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
  backFirstCate: function(){
    this.setData({
      showSelectAll : false,
      filterPanel: true
    })
  },
  selectFilter: function(e){
    var code = e.target.dataset.code;
    var name = e.target.dataset.name;
    
  }
})