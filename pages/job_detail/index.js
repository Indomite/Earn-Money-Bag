import { getTaskDetail } from './../../service/task_detail'
import { createApplications, createCollect } from './../../service/task'
import { clientPush } from './../../utils/clienrSocket'
import { addFriend } from './../../utils/chatStorage'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async getTaskDetail(id) {
    const { data: { task } } = await getTaskDetail(id)
    const { issue, issue_id, task_type, task_pay, task_name, task_city_id, task_desc, need_worker_nub, apply_nub, update_time, city_model } = task
    this.setData({
      task_pay, task_name, task_city_id, task_desc, need_worker_nub, apply_nub, update_time, city_model
    })
    //绑定issue
    this.issue = {
      name: issue.name, avatar_url: issue.avatar_url, id: issue_id
    }
  },

  apply() {
    const user_id = app.globalData.userInfo.user_id;
    const token = app.globalData.token;
    // console.log(app.globalData.token);
    const task_id = this.id;
    console.log(task_id);
    createApplications({
      user_id, task_id, token
    });
    wx.showToast({
      title: '申请成功',
      icon: 'success',
      duration: 1000
    })
  },

  collect() {
    const user_id = app.globalData.userInfo.user_id;
    const token = app.globalData.token;
    // console.log(app.globalData.token);
    const task_id = this.id;
    // console.log(task_id);
    createCollect({
      user_id, task_id, token
    });
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 1000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    // console.log(id);
    this.id = id;
    this.getTaskDetail(id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //立即沟通
  immediatlyCommunicate(e) {
    const userInfo = app.globalData.userInfo
    console.log(userInfo)
    const { user_id, avatar_url, name } = userInfo
    const { id: issue_id, avatar_url: issue_avatar_url, name: issue_name } = this.issue
    const content = '您好，我对你的简历很感兴趣 能和你交流一下码'
    //发送消息
    clientPush({
      from: { id: user_id, avatar_url, name },
      to: { id: issue_id, avatar_url: issue_avatar_url, name: issue_name },
      content
    })
    const friend_id = issue_id
    const friend = { id: issue_id, name: issue_name, avatar_url: issue_avatar_url }
    const chatContent = { id: user_id, content }
    const chatFriendSet = addFriend(friend_id, friend, chatContent)
  }
})