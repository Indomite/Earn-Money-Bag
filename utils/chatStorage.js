export function addFriend(friend_id, friend, chatContent) {
  const chatFriendSet=  getFriendList();
  if(!(friend_id in chatFriendSet)) {
    chatFriendSet[friend_id] = {
      friend,
      chatContentList: [chatContent]
    }
  }
  wx.setStorageSync('chatFriendSet', chatFriendSet);
  return chatFriendSet
}

export function getFriendList() {
  const chatFriendSet=  wx.getStorageSync('chatFriendSet') || {};
  return chatFriendSet
}

export function deleteFriend(friend_id) {
  const chatFriendSet=  getFriendList();
  delete chatFriendSet[friend_id]
  wx.setStorageSync('chatFriendSet', chatFriendSet);
  return chatFriendSet
}

export function getFriend(friend_id) {
  const chatFriendSet=  getFriendList();
  return chatFriendSet[friend_id]
}

export function saveChatContent(friend_id, chatContentList) {
  const chatFriendSet=  getFriendList();
  chatFriendSet[friend_id].chatContentList = chatContentList
  wx.setStorageSync('chatFriendSet', chatFriendSet);
}


export function addChatContent(friend_id, {id, content}) {
  const chatFriendSet=  getFriendList();
  chatFriendSet[friend_id].chatContentList.push({id, content})
  wx.setStorageSync('chatFriendSet', chatFriendSet);
}

export function receiveContent(from,  content) {
  const chatFriendSet=  getFriendList();
  const {friend_id} = from
  if(friend_id in chatFriendSet) { //如果已经有这个聊天记录了
    const {chatContentList} = chatFriendSet[friend_id]
    chatContentList.push({id: friend_id, content})
  }else { //没有记录，创建快照
    chatFriendSet[friend_id] = {
      friend: from,
      chatContentList: [{id: friend_id, content}]
    }
  }
  //最终存储起来
  wx.setStorageSync('chatFriendSet', chatFriendSet);
}