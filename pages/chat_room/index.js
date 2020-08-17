import {getFriend, saveChatContent} from './../../utils/chatStorage'
const app =  getApp();
import {clientPush} from './../../utils/clienrSocket'
Page({
  data: {
    canSend: false,
    value: '',
    height: '100vh',
    bottomIndex: '1'
  },
  onLoad: function(options){
    const selecter = wx.createSelectorQuery()
    const page = selecter.select('.chat_room')
    page.boundingClientRect( (rect) => {
      this.height = rect.height
      this.setData({
        height: rect.height + 'px'
      })
    }).exec()
  },
  //加载数据
  onShow: function(options = this.options){
    const {friend_id} = options
    this.friend_id = friend_id //保存朋友的id
    const {friend, chatContentList} = getFriend(friend_id) //获取本地信息
    const {user_id: id, name, avatar_url} = app.globalData.userInfo //获取用户信息
    const me = {id, name, avatar_url} // 拆分我的信息
    const users = {
      [me.id]: me,
      [friend.id]: friend
    }
    //设置导航栏
    wx.setNavigationBarTitle({
      title: friend.name
    })
    //更新数据
    this.setData({
      myId: id,
      users,
      chatContentList
    })
    //保存最下标
    this.bottomIndex = chatContentList.length - 1
    this.scrollBottom() //移动最下
    //开启聊天页面通信的通道
    app.globalData.pageModel.chatRoom = this
  },
  onHide() {
    //关闭聊天页面通信的通道
    app.globalData.pageModel.chatRoom = null
  },
  //检测是否能发送
  inPut(e) {
    const {value} = e.detail
    if(value) {
      this.setData({canSend: true})
    }else {
      this.setData({canSend: false})
    }
  },
  //发送消息
  send() {
    const {myId: id, chatContentList, value, users} = this.data
    chatContentList.push({id, content: value})
    this.setData({ //静态更新页面
      chatContentList
    })
    //存入本都
    saveChatContent(this.friend_id, chatContentList)
    this.setData({value: ''})
    this.scrollBottom(true)
    //向后台请求存入
    const me = users[id]
    const friend = users[this.friend_id]
    clientPush({from: me, to: friend, content: value})
  },
  tap() {
    this.scrollBottom() //滑动最下
  },
  //输入框点击
  focus(e) {
    const height = e.detail.height
    this.setData({height: this.height - height + 'px'})
    this.scrollBottom() //滑动最下
  },
  //输出框退出
  blur(e) {
    this.setData({height: this.height + 'px'})
  },

  //划到底部
  scrollBottom(flag = 0) {
    this.bottomIndex += flag
    console.log(this.bottomIndex)
    this.setData({
      bottomIndex: this.bottomIndex
    })
  }
});