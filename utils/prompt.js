export function showModal({title, content}) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      success (res) {
        resolve(res.confirm)
      },
      fail(error){
        reject(error)
      }
    })
  })
}