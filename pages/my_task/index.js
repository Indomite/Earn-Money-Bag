//Page Object
import {getUserTasks} from './../../service/user'
const app =  getApp();

Page({
  data: {
    
  },
  async getUserTasks() {
    const {user_id} = app.globalData.userInfo
    const {data: {tasks}} = await getUserTasks(user_id)
    this.setData({tasks})
  },
  //options(Object)
  onLoad: function(options){
    this.getUserTasks()
  },
  onReady: function(){
    
  }
});