import {$GET, $POST} from '../utils/request'

//获取openid
export const getOpenId = function(code) {
  const API = 'api/v1/third_party/weixin_tokens'
  return $POST(API, {code})
}

//登入获取code，注意，在network时不会出现请求记录的
export const getCode = async function() {
  return await new Promise((resolve, reject)=>{
    wx.login({
      success: res => {
        resolve(res)
      },
      fail: error => {
        reject(error)
      }
    })
  }).catch((error)=>{
    console.log(error)
  })
}


export const getToken = function({openid, name='', city='', avatar_url='', gender}) {
  const API = 'api/v1/users'
  return $POST(API, {openid, name, city, avatar_url, gender: gender.toString()})
}

