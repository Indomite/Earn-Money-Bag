import {getUserSystemMessage} from './../../service/user'
const app =  getApp();

Page({
  data: {
    
  },
  async getUserSystemMessage() {
    const {user_id} = app.globalData.userInfo
    console.log(user_id)
    const {data: {system_messages}} = await getUserSystemMessage(user_id)
    this.setData({
      system_messages
    })
  },
  //options(Object)
  onLoad: function(options){
    this.getUserSystemMessage()
  },
  onReady: function(){
    
  }
});