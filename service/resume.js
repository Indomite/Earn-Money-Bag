import {$GET, $POST, $PUT, BASE_URL} from '../utils/request'

//获取openid
export const getResume = function(id) {
  const API = 'api/v1/resumes'
  return $GET(API + '/' + id)
}

//获取更新简历
export const updateResume = function(id, params) {
  const API = 'api/v1/resumes'
  return $PUT(API + '/' + id, params)
}

//更换头像
export const uploadAvatarUrl = async function(resume_id) {
  const API = 'api/v1/upload/avatar_url'
  const tempFilePaths =  await chooseImage()
  return await uploadFile(BASE_URL + API, tempFilePaths, {id: resume_id})
}


function chooseImage() {
  return new Promise((resolve, reject)=>{
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        resolve(tempFilePaths)
      },
      fail (error) {
        reject(error)
      }
    })
  })
}

function uploadFile(url, tempFilePaths, formData) {
  return new Promise((resolve, reject)=>{
    wx.uploadFile({
      url,
      filePath: tempFilePaths[0],
      name: 'file',
      formData,
      success (res){
        resolve(JSON.parse(res.data))
      },
      fail () {
        reject(error)
      }
    })
  })
}