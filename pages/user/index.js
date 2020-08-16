import {getOpenId, getCode, getUserInfo, getToken} from './../../service/thirdParty'
import {getUserInfo as initUserInfo} from './../../service/user'
import {init, socketLogin, socketOutLogin} from './../../utils/clienrSocket'
var app = getApp()
Page({
  data: {
    // token: ''
  },
  async getCode() {
    const {code} = await getCode()
    this.code =code
    console.log(code)
  },

  async getUserInfo() {
    const userInfo = await getUserInfo()
    this.userInfo = userInfo
  },

  async login(e) {
    let {code, userInfo} = this
    //退出登入之后
    if(!code) {
      await this.getCode()
      await this.getUserInfo()
      code = this.code
      userInfo = this.userInfo
    }
    const {data: {tokens: {openid}}} = await getOpenId(code)
    const {nickName: name, city, avatarUrl: avatar_url, gender} = userInfo
    const result = await getToken({openid, name, city, avatar_url, gender})
    if(result.status === 'success') {
      const {user, token} = result.data
      this.setData({
        userInfo: {...user},
        token
      })
      app.globalData.token = token
      app.globalData.userInfo = user
      wx.setStorageSync('user_id', user.user_id);
      wx.setStorageSync('token', token);
      //登入之后重新开始聊天
      init()
      socketLogin({
        user_id: user.user_id,
        name: user.name,
        avatar_url: user.avatar_url
      })
    }
  },
  loginOut(e) {
    //退出聊天
    socketOutLogin(this.data.userInfo)
    //清楚数据本地，全局，该页面
    app.globalData.userInfo = {}
    app.globalData.token = '' //其实可以只设置token就行
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('token');
    this.setData({
      userInfo: {},
      token: ''
    })
    this.code = ''
    this.userInfo = null
  },
  async initUserInfo() {
    const token  = this.token
    if(token) {
      const user_id  = wx.getStorageSync('user_id');
      const {data: {user}} = await initUserInfo(user_id, {token})
      //更新全局，因为这里会产生局部更新，必须同步
      this.setData({
        userInfo: user,
        token
      })
      app.globalData.userInfo = user
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token  = wx.getStorageSync('token');
    this.token = token
    this.initUserInfo()
    if(!token) {
      this.getCode()
      this.getUserInfo()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})