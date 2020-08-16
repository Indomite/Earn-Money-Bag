// pages/nearly_job/index.js
import { getTasks } from './../../service/task'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async getTasks() {
    const userInfo = app.globalData.userInfo;
    const { data: { tasks } } = await getTasks();
    tasks.sort(function (a, b) {
      const atime = new Date(a.update_time);
      const btime = new Date(b.update_time);
      return atime - btime;
    });

    this.setData({
      tasks,
      userInfo
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTasks();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})