export const BASE_URL = 'www.wczix.top:6666/' && 'http://39.106.126.99:7777/'


const request = function(method) {
  return function(API, params) {
    return new Promise((resolve, reject)=>{
      wx.request({
        url: BASE_URL + API,
        method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params,
        dataType: 'json',
        // responseType: 'text',
        success: (res) => {
          resolve(res.data) //直接过滤一层
        },
        fail: (error) => {
          reject(error)
        }
      })
    }).catch((error)=>{
      console.log(error)
    })
  }
}

export const $GET = request('GET')
export const $POST = request('POST')
export const $PUT = request('PUT')
export const $DELETE = request('DELETE')