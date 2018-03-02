// pages/goodsDetail/goodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    galleryList:[],
    galleryIndex: 0,
    productName: '',
    productId: '',
    salesPrice: '',
    marketPrice: '',
    saleCount: '',
    commentCount: 230,
    productDetailGallery: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var id = options.productId;
    wx.request({
      url: 'http://mact.banggo.com/goods/getProductInfo.shtml?goods_sn='+id,
      dataType: 'json',
      success: function(res){
        // debugger;
        var dataString = res.data;
        var data = JSON.parse(dataString.replace("(","").replace(")",""));
        data = data.data.productInfo;
        console.log(data);
        // var data = JSON.parse(res.data);
        _this.setData({
          galleryList: data.galleryList,
          productName: data.productName,
          productId: data.productId,
          salesPrice: data.minSalesPrice,
          marketPrice: data.marketPrice,
          saleCount: data.saleCount
        })
      }
    });
    wx.request({
      url: 'http://mact.banggo.com/goods/getDescription.shtml?goods_sn='+id,
      dataType: 'json',
      success: function(res){
        var dataString = res.data;
        debugger;
        var data = JSON.parse(dataString.replace("(", "").replace(")", ""));
        _this.setData({productDetailGallery:data.data.images});
        debugger;
      }
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
  changeGalleryIndex:function(e){
    var newIndex = e.detail.current;
    this.setData({galleryIndex: newIndex});
  }
})