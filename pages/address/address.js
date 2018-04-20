// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[
      {
        name: '王大毛',
        phone: 123456789,
        address_name: '上海市浦东新区',
        address: '康桥东路700号'
      },
      {
        name: 'David',
        phone: 123456789,
        address_name: '上海市浦东新区',
        address: '康桥东路800号'
      }
    ],
    editAddress:''
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
  editAddress: function(e){
    var index = e.target.dataset.index;
    var addressList = this.data.addressList;
    wx.navigateTo({
      url: '../addressOperate/addressOperate?data=' + JSON.stringify(addressList[index]),
    })
    // this.setData({ editAddress : addressList[index] });
  },
  wxAddAddress: function(){
    wx.openSetting({
      
    })
  }
  
})