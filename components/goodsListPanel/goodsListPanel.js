// components/goodsListPanel/goodsListPanel.js
var app = getApp();
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

    defaultImg: String,
    lazyloadList: Array,
    currentPageList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  ready: function(){
    setTimeout(()=>{
      this.setList()
    },200);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setList: function(){
      this.setData({ list : app.globalData.list[this.properties.listId]});
    }
  }
  
})
