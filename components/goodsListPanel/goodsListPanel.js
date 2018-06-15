// components/goodsListPanel/goodsListPanel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listId: {
      type: Number,
      observer: function(newVal,oldVal){
        console.log(newVal);
      }
    },
    list: {
      type: Object,
      observer: function(newVal,oldVal){
        console.log(newVal);
      }
    },
    defaultImg: String,
    lazyloadList: Array,
    currentPageList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
