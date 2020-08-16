import {getUserInfo} from './service/user'
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
  }
});
