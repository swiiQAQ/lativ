//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortBar:[
      { title: '首页', id: '0'},
      { title: '女装', id: 474},
      { title: '男装', id: 498},
      { title: '童装', id: 476},
      { title: '婴幼儿', id: 486},
      { title: '运动', id: 480}
    ],
    showId: 0,
    swiper: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    plate:{
      category1:'',
      category4:{
        banner: 'http://img.banggo.com/sources/cms/banggo2017/APP/dxrmbapptz18-0130_01.jpg',
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  categorySelectHandler:function(e){
    var id = e.target.dataset.id;
    var plateId = e.target.dataset.plateid;
    this.setData({showId: id});
    this.fetchPlateContent(id,plateId);
  },
  fetchPlateContent:function(id,plateId){
    var _this = this;
    wx.request({
      url: 'http://m.banggo.com/list-category/getCateRelChild.shtml?cate_id='+plateId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        // debugger;
        var data = res.data.data[0].children;
        var plateIndex = "plate.category"+id
        // debugger;
        _this.setData({
          [plateIndex]: data
        })
      }
    })
  }
})
