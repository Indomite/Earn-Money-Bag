//Page Object
import { getUserApplications } from './../../service/user'
const app = getApp();

Page({
  data: {

  },
  async getUserApplications() {
    const { user_id } = app.globalData.userInfo
    const { data: { task_applications } } = await getUserApplications(user_id)
    this.setData({ task_applications })
  },
  //options(Object)
  onLoad: function (options) {
    this.getUserApplications()
  },
  onReady: function () {

  }
});