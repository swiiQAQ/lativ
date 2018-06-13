var dpi;
wx.getSystemInfo({
  success: function(res) {
    var screenWidth = res.screenWidth;
    dpi = 750/screenWidth;
  },
})
var config = {
  arrFilter: {
    brand: "a",
    cid: "a",
    color: "a",
    discount: "a",
    discountRange: "a",
    price: "a",
    promotionId: "a",
    size: "a",
    sortField: "a",
    sortType: "a",
    stock: "a",
    tcode: "a"
  },
  dpi: dpi
}
module.exports.config = config;