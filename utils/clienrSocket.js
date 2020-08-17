const io = require('./weapp.socket.io')
import {addFriend, addChatContent, receiveContent} from './chatStorage'
let socket

export const init = (user_id, app = getApp()) => {
  socket = io('http://192.168.1.103:7777')
  socket.on('connect', function () {
    console.log('socket.io has connected')
  });
  //接收消息，这里会混合其它的逻辑，有空尽量解耦
  socket.on('clientPull', function ({from, content}) {
    const {chatRoom} = app.globalData.pageModel
    const {friend_id} = chatRoom
    if(chatRoom) { //如果是存在那个页面的，值得是那个也页面在显示
      if(friend_id == from.id) { //是在和这个好友聊天
        const data = chatRoom.data
        const {chatContentList} = data
        chatContentList.push({id: from.id, content})
        this.setData({
          chatContentList
        })
      }
    }else {
      console.log('聊天页面关闭了呢')
    }
    receiveContent(from, content)
  });

  //接收错误消息
  socket.on('socketError', function (message) {
    console.log('socketError: ', message)
  });

  //接收错误消息
  socket.on('socketSuccess', function (message) {
    if(message === 'login') {
      console.log('socketSuccess: ', '用户聊天登入成功')
    }else if(message === 'outLogin') {
      console.log('socketSuccess: ', '用户聊天断开连接')
      socket.close()
    }else {
      console.log('socketSuccess: ', message)
    }
  });
}

//上线
export const socketLogin = ({user_id, name, avatar_url}) => {
  if(!socket) return false
  socket.emit('login', {user_id, name, avatar_url})
}

//下线
export const socketOutLogin = ({user_id}) => {
  if(!socket) return false
  socket.emit('outLogin', {user_id})
}

//发送消息
export const clientPush = ({from, to, content}) => {
  if(!socket) return false
  socket.emit('serverPull', {from, to, content})
}