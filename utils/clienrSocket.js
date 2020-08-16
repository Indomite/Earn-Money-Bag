const io = require('./weapp.socket.io')

let socket

export const init = (user_id) => {
  socket = io('http://192.168.1.103:7777')
  socket.on('connect', function () {
    console.log('socket.io has connected')
  });

  //接收消息
  socket.on('clientPull', function (message) {
    console.log(message)
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
export const clientPush = ({from, to_id, content}) => {
  if(!socket) return false
  socket.emit('serverPull', {from, to_id, content})
}