// pages/goodsDetail/goodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //图文详情/评价导航是否置顶
    sticky: false,
    //返回顶部按钮是否显示
    goTopShow: false,
    //导航距离顶部位置
    stickyTop: 0,
    //商品信息
    galleryList:[],
    galleryIndex: 0,
    productName: '',
    productId: '',
    salesPrice: '',
    marketPrice: '',
    saleCount: '',
    commentCount: 230,
    productDetailGallery: [],
    //页面滚动id
    scrollId: '',
    //页面滚动高度
    scrollTop: ''
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
        //处理json字符串成json格式
        var dataString = res.data;
        var data = JSON.parse(dataString.replace(/^\(/g, "").replace(/\)$/g,""));
        //遍历属性
        var goodsAttrs = [];
        for (var key in data.data.goodsAttrs) {
          goodsAttrs.push(data.data.goodsAttrs[key]);
        }
        _this.setData({
          productDetailGallery:data.data.images,
          goodsAttrs: goodsAttrs,
          brandInfo: data.data.brandInfo
        });
        
        // console.log(goodsAttrs);
        // debugger;
      }
    });
    //获取stickyHeader的offsetTop
    var query = wx.createSelectorQuery();
    query.select(".stickyHeader").boundingClientRect(function (rect) {
      console.log(rect.top);
      _this.setData({stickyTop:rect.top});
      // debugger;

    }).exec();

    //获取设备窗口高度
    wx.getSystemInfo({
      success: function(res) {
        // debugger;
        var windowWidth = res.windowWidth;
        // debugger;
        // _this.setData({ windowHeight: 750 / windowWidth * res.windowHeight});
        _this.setData({windowHeight:res.windowHeight})
      },
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

  onPageScroll: function(res){
    // debugger;
    // console.log(res.scrollTop);
    var stickyTop = this.data.stickyTop;
    // console.log(stickyTop);
    if (res.scrollTop > stickyTop){
      // debugger;
      this.setData({sticky: true});
    }
    else{
      this.setData({sticky: false});
    }
    //滚到一定高度显示置顶按钮
    if(res.scrollTop > 800){
      this.setData({ goTopShow: true})
    }
    else{
      this.setData({ goTopShow: false});
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  changeGalleryIndex:function(e){
    var newIndex = e.detail.current;
    this.setData({galleryIndex: newIndex});
  },

  //返回顶部
  scrollToTop:function(){
    // wx.pageScrollTo({
    //   scrollTop: 0,
    //   duration: 500
    // })
    this.setData({scrollTop: 0})
  },
  //图文详情和商品信息导航跳转
  stickyScroll:function(e){
    var scrollId = e.target.dataset.scrollid;
    // debugger;
    this.setData({scrollId: scrollId});
  },
  scrollHandler: function(e){
    // debugger;
    var scrollTop = e.detail.scrollTop;
    if (scrollTop > 800) {
      // debugger;
      this.setData({ goTopShow: true })
    }
    else {
      this.setData({ goTopShow: false });
    }

    var stickyTop = this.data.stickyTop;
    // console.log(stickyTop);
    // if (scrollTop > stickyTop) {
    //   // debugger;
    //   this.setData({ sticky: true });
    // }
    // else {
    //   this.setData({ sticky: false });
    // }
  }
})