import { $GET, $POST } from '../utils/request'

//获取openid
export const getUserSystemMessage = function (user_id) {
  const API = 'api/v1/users/' + user_id + '/system_messages'
  return $GET(API)
}

export const getUserInfo = function (user_id, { token }) {
  const API = 'api/v1/users/' + user_id
  return $GET(API, { token })
}

export const getUserTasks = function (user_id) {
  const API = 'api/v1/users/' + user_id + '/tasks'
  return $GET(API)
}

export const getUserApplications = function (user_id) {
  const API = 'api/v1/users/' + user_id + '/task_applications'
  return $GET(API)
}

export const getUserCollections = function (user_id) {
  const API = 'api/v1/users/' + user_id + '/task_collections'
  return $GET(API)
}