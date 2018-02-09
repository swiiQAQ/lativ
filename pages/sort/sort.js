// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstLevCates: '',
    secondCateIndex: 0,
    thirdCateIndex: 0,
    // secondCate0: [
    //   {
    //     title: '',
    //     children: [
    //       { name: '', image: '' }
    //     ]
    //   },
    //   {
    //     title: '',
    //     children: [
    //       { name: '', image: '' }
    //     ]
    //   }
    // ],
    secondCate: [
      [
        {
          title: '',
          children: [
            { name: '', image: '' }
          ]
        },
        {
          title: '',
          children: [
            { name: '', image: '' }
          ]
        }
      ],
      []
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //一级目录
    wx.request({
      url: 'http://m.banggo.com/list-category/getFirstLevCates.shtml',
      success: function (res) {
        var data = res.data.data;
        _this.setData({ firstLevCates: data });
        // debugger;
        _this.initSecondCate();
      }
    });
    // 一级目录第一项初始数据

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
  //初始化二级菜单
  initSecondCate: function () {
    var _this = this;
    var query = wx.createSelectorQuery();
    query.select('.sortScroll').fields({
      dataset: true
    }, function (res) {
      var id = res.dataset.initid;
      _this.fetchFirstCate(id)
    }).exec();
  },
  
  //选择一级目录
  firSelectHandler:function(e){
    var id = e.target.dataset.id;
    var plateId = e.target.dataset.plateid;
    this.setData({
      secondCateIndex: id
    })
    this.fetchFirstCate(plateId);
  },
  // 选择二级目录
  secSelectHandler:function(e){
    var id = e.target.dataset.id;
    this.setData({
      thirdCateIndex: id
    })
    // debugger;
  },
  //选择一级目录后调取二级和三级数据存入data中
  fetchFirstCate: function (id) {
    var _this = this;
    wx.request({
      url: 'http://m.banggo.com/list-category/getCateRelChild.shtml?cate_id=' + id,
      success: function (res) {
        var data = res.data.data[0];
        // var banner = data.children[0];
        var secondCate = [];
        for (var i = 1; i < data.children.length; i++) {
          var children = [];
          secondCate[i - 1] = { title: data.children[i].site_cate_name };
          for (var j = 0; j < data.children[i].children.length; j++) {
            children.push(data.children[i].children[j]);
          }
          secondCate[i - 1].children = children;
        }
        var key = 'secondCate[' + _this.data.secondCateIndex + ']';
        _this.setData({
          [key]: secondCate
        });
      }
    });
  },
})