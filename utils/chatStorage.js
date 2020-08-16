
export function addFriend(friend_id, frined, chatContent) {
  const chatFriendSet=  getFriendList();
  if(!(friend_id in chatFriendSet)) {
    chatFriendSet[friend_id] = {
      frined,
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