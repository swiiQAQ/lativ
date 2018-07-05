// components/filterPanel/filterPanel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showSelectAll: Boolean,
    othersList: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    //是否显示筛选二级页面
    showSelectAll: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 收起筛选页面
    foldFilterPanel: function () {
      this.setData({
        showSelectAll: false
      });
      this.triggerEvent('FoldHandler');
    },
    // 筛选二级页面展开
    showSelectAllHandler: function (e) {
      var name = e.target.dataset.name;
      var value = e.target.dataset.value;
      this.setData({
        showSelectAll: true,
        filterPanel2: {
          name: name,
          value: value
        }
      });
    },
    //筛选二级返回一级
    backFirstCate: function () {
      this.setData({
        showSelectAll: false,
        filterPanel: true
      })
    },
    selectFilter: function (e) {
      var code = e.target.dataset.code;
      var name = e.target.dataset.name;
    }
  }
})
