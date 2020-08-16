//Page Object
import { getUserCollections } from './../../service/user'
const app = getApp();

Page({
  data: {

  },
  async getUserCollections() {
    const { user_id } = app.globalData.userInfo
    const { data: { task_collections } } = await getUserCollections(user_id)
    this.setData({ task_collections })
  },
  //options(Object)
  onLoad: function (options) {
    this.getUserCollections()
  },
  onReady: function () {

  }
});