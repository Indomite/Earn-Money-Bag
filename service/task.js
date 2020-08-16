import { $GET, $POST } from '../utils/request'

//获取openid
export const getTasks = function () {
  const API = 'api/v1/tasks'
  return $GET(API)
}

export const createTask = function ({
  user_id, task_name, task_type, task_pay, task_desc,
  need_worker_nub, task_city_id, token
}) {
  const API = 'api/v1/tasks'
  return $POST(API, {
    user_id, task_name, task_type, task_pay, task_desc,
    need_worker_nub, task_city_id, token
  })
}

export const createApplications = function ({ user_id, task_id, token }) {
  const API = 'api/v1/task_applications'
  return $POST(API, {
    user_id, task_id, token
  })
}

export const createCollect = function ({ user_id, task_id, token }) {
  const API = 'api/v1/task_collections'
  return $POST(API, {
    user_id, task_id, token
  })
}
