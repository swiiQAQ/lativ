// pages/cart/cart.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartInfo: '',
    cartScrollHeight: '',
    cartSelectedArr: [],
    selectAllBoolean: false
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
    wx.getStorage({
      key: 'cartInfo',
      success: res => {
        // debugger;
        // var cartInfo = JSON.parse(res.data);
        var cartInfo = res.data;
        this.setData({ cartInfo: cartInfo });
        this.setScrollHeight()
      }
    });

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

  setScrollHeight: function () {
    var _this = this;
    var windowHeight;
    wx.getSystemInfo({
      success: function (res) {
        windowHeight = res.windowHeight;
      },
    })

    wx.createSelectorQuery().select(".cart_bot").boundingClientRect(function (rect) {
      _this.setData({ cartScrollHeight: windowHeight - rect.height })
    }).exec();

  },

  //购物车数量增加
  increaseNum: function (e) {
    // wx.createSelectorQuery().select(".input_num" + e.target.dataset.index).boundingClient(function (rect) {

    // })
    var index = e.target.dataset.index;
    var num = this.data.cartInfo[index].num;
    var cartItemNum = 'cartInfo['+index+'].num';
    this.setData({
      [cartItemNum]: num+1
    })
  },
  //购物车数量减少
  decreaseNum: function(e){
    var index = e.target.dataset.index;
    var num = this.data.cartInfo[index].num;
    var cartItemNum = 'cartInfo['+index+'].num';
    this.setData({
      [cartItemNum] : num-1
    })
  },
  //选中全部
  selectAllHandler:function(){
    var arr = [];
    var cartInfo = this.data.cartInfo;
    cartInfo.forEach((value,index)=>{
      arr.push(index);
    });
    this.setData({ 
      cartSelectedArr : arr,
      selectAllBoolean: true
    });
  }
})