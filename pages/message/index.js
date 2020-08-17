import {getFriendList, deleteFriend} from './../../utils/chatStorage'
import {showModal} from './../../utils/prompt'
const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async deleteMessage(e) {
    const friend_id = e.target.dataset.friendId
    const result = await showModal({title: '温馨提示', content: '您将删除该对象的所有的本地聊天记录'})
    if(result) {
      const friendList = deleteFriend(friend_id)
      this.setData({friendList: friendList})
      wx.showToast({title: '删除成功', icon: 'success', duration: 500})
    }
  },

  enterChat(e) {
    const friend_id = e.currentTarget.dataset.friendId
    wx.navigateTo({
      url: './../chat_room/index?friend_id=' + friend_id
    })
  },
  /**
   * 生命周期函数--监听页面加载 一次加载
   */
  onLoad: function (options) {
    
  },
  onShow: function (options) { //每次显示页面时都是
    this.setData({friendList: getFriendList()})
  },
  onHide: function() {
  }
})