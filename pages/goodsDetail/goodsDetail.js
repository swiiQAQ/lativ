// pages/goodsDetail/goodsDetail.js
var app = getApp();
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
    galleryList: [],
    galleryIndex: 0,
    productName: '',
    productId: '',
    salesPrice: '',
    marketPrice: '',
    saleCount: '',
    commentCount: 230,
    productDetailGallery: [],
    sizeList: [],
    colorList: [],
    //页面滚动id
    scrollId: '',
    //页面滚动高度
    scrollTop: '',
    //选择颜色尺码遮罩层是否显示
    mask: false,
    //尺寸ID
    sizeId: '',
    sizeCode: '',
    // 颜色ID
    colorId: '',
    colorCode: '',
    //尺寸名称
    sizeName: '',
    //颜色名字
    colorName: '',
    noStockArray: [],
    //颜色选择后小图显示
    colorImage: '',
    //排除下面的sticky，滚动高度
    scrollHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var id = options.productId;
    this.setData({
      productId: id
    })
    // debugger;
    wx.request({
      url: 'http://mact.banggo.com/goods/getProductInfo.shtml?goods_sn=' + id,
      dataType: 'json',
      success: function (res) {
        // debugger;
        var dataString = res.data;
        var data = JSON.parse(dataString.replace("(", "").replace(")", ""));
        data = data.data.productInfo;
        console.log(data);
        // var data = JSON.parse(res.data);
        _this.setData({
          galleryList: data.galleryList,
          productName: data.productName,
          productId: data.productId,
          salesPrice: data.minSalesPrice,
          marketPrice: data.marketPrice,
          saleCount: data.saleCount,
          sizeList: data.sizesList,
          colorList: data.colorsList,
          skuInfo: data.skuInfo
        })
      }
    });
    wx.request({
      url: 'http://mact.banggo.com/goods/getDescription.shtml?goods_sn=' + id,
      dataType: 'json',
      success: function (res) {
        //处理json字符串成json格式
        var dataString = res.data;
        var data = JSON.parse(dataString.replace(/^\(/g, "").replace(/\)$/g, ""));
        //遍历属性
        var goodsAttrs = [];
        for (var key in data.data.goodsAttrs) {
          goodsAttrs.push(data.data.goodsAttrs[key]);
        }
        _this.setData({
          productDetailGallery: data.data.images,
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
      _this.setData({ stickyTop: rect.top });
      // debugger;

    }).exec();



    //获取设备窗口高度
    wx.getSystemInfo({
      success: function (res) {
        var stickyBottomHeight;
        query.select(".goods_detail_stickyBottom").boundingClientRect(function (rect) {
          console.log(rect.height);
          stickyBottomHeight = rect.height;

          var windowWidth = res.windowWidth;
          // debugger;
          // _this.setData({ windowHeight: 750 / windowWidth * res.windowHeight});
          _this.setData({ windowHeight: res.windowHeight });
          _this.setData({ scrollHeight: res.windowHeight - stickyBottomHeight })

        }).exec();


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

  onPageScroll: function (res) {
    // debugger;
    // console.log(res.scrollTop);
    var stickyTop = this.data.stickyTop;
    // console.log(stickyTop);
    if (res.scrollTop > stickyTop) {
      // debugger;
      this.setData({ sticky: true });
    }
    else {
      this.setData({ sticky: false });
    }
    //滚到一定高度显示置顶按钮
    if (res.scrollTop > 700) {
      this.setData({ goTopShow: true })
    }
    else {
      this.setData({ goTopShow: false });
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  changeGalleryIndex: function (e) {
    var newIndex = e.detail.current;
    this.setData({ galleryIndex: newIndex });
  },

  //返回顶部
  scrollToTop: function () {
    // wx.pageScrollTo({
    //   scrollTop: 0,
    //   duration: 500
    // })
    this.setData({ scrollTop: 0 })
  },
  //图文详情和商品信息导航跳转
  stickyScroll: function (e) {
    var scrollId = e.target.dataset.scrollid;
    // debugger;
    this.setData({ scrollId: scrollId });
  },

  //页面滚动事件
  scrollHandler: function (e) {
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
    if (scrollTop < stickyTop) {
      // debugger;
      this.setData({ sticky: false });
    }
    else {
      this.setData({ sticky: true });
    }
  },

  selectSkuInfo: function () {
    this.setData({ mask: true });
  },

  //选择尺码
  selectSize: function (e) {
    var sizeId = e.target.dataset.id;
    var sizeName = e.target.dataset.sizename;
    var sizeCode = e.target.dataset.sizecode;
    if (sizeId !== this.data.sizeId) {
      this.setData({
        sizeId: sizeId,
        sizeName: sizeName,
        sizeCode: sizeCode
      });
    }
    else {
      this.setData({
        sizeId: '',
        sizeName: '',
        sizeCode: '',
      })
    }
    this.stockFilter();

  },

  //选择颜色
  selectColor: function (e) {
    var colorId = e.target.dataset.id;
    var colorName = e.target.dataset.colorname;
    var colorCode = e.target.dataset.colorcode;
    var colorImage = e.target.dataset.image;
    if (colorId !== this.data.colorId) {
      this.setData({
        colorId: colorId,
        colorName: colorName,
        colorCode: colorCode,
        colorImage: 'http://pic.banggo.com' + colorImage
      });
    }
    else {
      this.setData({
        colorId: '',
        colorName: '',
        colorCode: '',
        colorImage: ''
      })
    }
    this.stockFilter();
  },

  stockFilter: function () {
    var _this = this;
    var skuInfo = this.data.skuInfo;
    var colorCode = this.data.colorCode;
    var sizeCode = this.data.sizeCode;
    var arr = [];
    var attr = sizeCode ? 'saleAttr2ValueCode' : 'saleAttr1ValueCode';
    var another = sizeCode ? 'saleAttr1ValueCode' : 'saleAttr2ValueCode';

    skuInfo.forEach(function (skuItem, key) {
      if (((skuItem[attr] == sizeCode) || skuItem[attr] == colorCode) && (skuItem['stockNum'] == 0)) {
        arr.push(skuItem[another]);
      }
      if ((skuItem[another] == colorCode) && (skuItem['stockNum'] == 0)) {
        arr.push(skuItem[attr])
      }
    })
    _this.setData({
      noStockArray: arr
    })
  },

  addToCart: function () {
    var _this = this;
    var sizeCode = this.data.sizeCode;
    var colorCode = this.data.colorCode;
    if (sizeCode && !colorCode) {
      wx.showToast({
        title: '加入购物袋前，请先选择颜色!',
        icon: 'none'
      })
    }
    else if (colorCode && !sizeCode) {
      wx.showToast({
        title: '加入购物袋前，请先选择尺码',
        icon: 'none'
      })
    }
    else {
      // var qsData = {
      //   'goodsSn': this.data.productId, 'sizeCode': sizeCode, 'colorCode': colorCode, 'channelCode': "HQ01S116",
      //   'number': 1, 'productType': '', 'price': 2, 'extensionId': ''
      // }

      // wx.request({
      //   url: 'http://mact.banggo.com/cart/addGoodsToCartByAjax.shtml',
      //   data: qsData,
      //   method: 'get',
      //   success: function(res){
      //     // debugger;
      //     wx.request({
      //       url: 'http://mact.banggo.com/cart/GetCartNum.shtml?_ksTS=1521794693347_366&callback=jsonp367',
      //       success: function (res) {
      //         // debugger;
      //       }
      //     })
      //     wx.showToast({
      //       title: '恭喜您添加商品成功',
      //       icon: 'none',
      //     });
      //     _this.setData({ mask: false })
      //   }
      // })
      

      // 通过globalData存储数据

      // var cartItemList = app.globalData.cartInfo.cartItem ? app.globalData.cartInfo.cartItem : [];
      // var qsData = {
      //   'good_sn': this.data.productId, 
      //   'price': this.data.salesPrice, 
      //   'productName': this.data.productName, 
      //   'color': this.data.colorName,
      //   'size': this.data.sizeName, 
      //   'num': 1, 
      //   'image': this.data.colorImage
      // }
      // cartItemList.push(qsData);
      // app.globalData.cartInfo.cartItems = cartItemList;

      //通过数据缓存
      var cartItemList;
      wx.getStorage({
        key: 'cartInfo',
        success: res=>{
          debugger;
          cartItemList = res.data ? res.data: [];
        },
        fail: res=>{
          cartItemList = [];
        },
        complete: ()=>{
          _this.cartStorage(cartItemList)
        }
      })
    }
  },
  cartStorage: function(list){
    var qsData = {
      'good_sn': this.data.productId,
      'price': this.data.salesPrice,
      'productName': this.data.productName,
      'color': this.data.colorName,
      'size': this.data.sizeName,
      'num': 1,
      'image': this.data.colorImage
    }
    list.push(qsData);
    wx.setStorage({
      key: 'cartInfo',
      data: list,
      success: () => {
        wx.showToast({
          title: '恭喜您添加商品成功',
          icon: 'none',
        });
      },
      fail: () => {
        wx.showToast({
          title: '添加商品失败',
          icon: 'none',
        });
      },
      complete: () => {
        // debugger;
        this.setData({ mask: false })

      }
    })
  },
  //点击遮罩层外部，关闭遮罩层
  closeMask: function () {
    this.setData({ mask: false })
  },
})