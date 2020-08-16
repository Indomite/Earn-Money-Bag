import { $GET, $POST } from '../../utils/request'
Page({
  data: {
    tasks: [],
    // 取消 按钮 是否显示
    isFocus: false,
    // 输入框的值
    inpValue: ""
  },
  // 输入框的值改变 就会触发的事件
  handleInput(e) {
    // 1 获取输入框的值
    const { value } = e.detail;
    // 2 检测合法性
    if (!value.trim()) {
      this.setData({
        tasks: [],
        isFocus: false
      })
      // 值不合法
      return;
    }
    // 3 准备发送请求获取数据
    this.setData({
      isFocus: true,
      inpValue: value
    })
  },

  async handleSearch(e) {
    const API = 'api/v1/tasks';
    // console.log(this.data.inpValue)

    const result = await $GET(API + '?task_name=' + this.data.inpValue)
    // console.log(result)
    const { data: { tasks } } = result
    this.setData({
      tasks
    })
  },

  // 点击 取消按钮
  handleCancel() {
    this.setData({
      inpValue: "",
      isFocus: false,
      goods: []
    })
  }
})