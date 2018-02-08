// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstLevCates:'',
    firstCate0:{
      title:'',
      secondCates:{
        secondCate0:{
          title:'',
          banner:'',
          children:[
            {name:'',image:''}
          ]
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //一级目录
    wx.request({
      url: 'http://m.banggo.com/list-category/getFirstLevCates.shtml',
      success:function(res){
        var data = res.data.data;
        _this.setData({firstLevCates:data});
      }
    });
    // 一级目录第一项初始数据
    wx.request({

      url: 'http://m.banggo.com/list-category/getCateRelChild.shtml?cate_id=492',
      success:function(res){

        // debugger;
        // _this.setData({

        // })
      }

    });
    var query = wx.createSelectorQuery();
    query.select('.sortScroll').;
    debugger;
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
  
  }
})