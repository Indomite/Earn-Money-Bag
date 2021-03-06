import {getUserInfo} from './service/user'
import {init, socketLogin} from './utils/clienrSocket'
App({
  onLaunch: function (options) {
    const token  = wx.getStorageSync('token');
    if(token) {
      const user_id  = wx.getStorageSync('user_id');
      this.globalData.token = token
      this.getUserInfo(user_id, {token})
    }
  },
  async getUserInfo(user_id, {token}) {
    const {data: {user}} = await getUserInfo(user_id, {token})
    this.globalData.userInfo = user
    this.initSocket(user)
  },

  initSocket(user) {
    //建立连接
    init()
    //登入聊天
    socketLogin({
      user_id: user.user_id,
      name: user.name,
      avatar_url: user.avatar_url
    })
  },

  onShow: function (options) {
    
  },
  onHide: function () {

  },
  onError: function (msg) {

  },
  onPageNotFound: function (options) {

  },
  globalData: {
    userInfo: {},
    token: '', //它就能确立登入状态
    pageModel: {
      chatRoom: null
    }
  }
});
