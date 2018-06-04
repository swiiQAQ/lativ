// components/editAddress/editAddress.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '',
    },
    phone: {
      type: String,
      value: ''
    },
    address_name: {
      type: String,
      value: ''
    },
    address: {
      type: null,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    region: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindRegionChange: function(e){
      // this.setData({
      //   region: e.detail.value
      // })
      this.properties.address_name = e.detail.value;
      this.setData({
        region: e.detail.value
      })
    }
  },

})
