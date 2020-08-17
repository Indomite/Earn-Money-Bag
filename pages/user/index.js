import {getOpenId, getCode, getToken} from './../../service/thirdParty'
import {getUserInfo as initUserInfo} from './../../service/user'
import {init, socketLogin, socketOutLogin} from './../../utils/clienrSocket'
var app = getApp()
Page({
  data: {
    b: 1,
    popUp: false
  },
  async getCode() {
    const {code} = await getCode()
    this.code =code //保存code，以便登入使用
  },

  popUpShow() {
    this.setData({popUp: true})
  },
  popUpDown() {
    this.setData({popUp: false})
  },

  async login(e) {
    const {userInfo} = e.detail
    console.log(userInfo)
    const {code} = this
    const {data: {tokens: {openid}}} = await getOpenId(code)
    let {nickName: name, city, avatarUrl: avatar_url, gender} = userInfo
    city = !!city || 'Nanchang'
    const result = await getToken({openid, name, city, avatar_url, gender})
    if(result.status === 'success') {
      this.popUpDown()//登入成功，关闭弹窗
      const {user, token} = result.data
      this.setData({
        userInfo: {...user},
        token
      })
      app.globalData.token = token
      app.globalData.userInfo = user
      wx.setStorageSync('user_id', user.user_id);
      wx.setStorageSync('token', token);
      //建立连接
      init()
      //登入聊天
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
    //删除保存的属性
    this.code = ''
    this.userInfo = null
    wx.reLaunch({url: './../user/index'})
  },
  async initUserInfo() {
    const token  = this.token
    if(token) {
      const user_id  = wx.getStorageSync('user_id');
      const {data: {user}} = await initUserInfo(user_id, {token})
      this.setData({userInfo: user, token}) //更新页面
      app.globalData.userInfo = user //同步全局
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //每次来到该页面就要获取信息，因为可能导致更新
  onShow() {
    const token  = wx.getStorageSync('token');
    this.token = token  //获取token，并绑定在对象上，确保每次拿到的都是本地存储的
    if(!token) { //未登入
      this.getCode()
      // this.getUserInfo()
    }else { //已登入
      this.initUserInfo()
    }
  }
})