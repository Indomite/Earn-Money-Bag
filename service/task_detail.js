import { $GET, $POST } from '../utils/request'

//获取openid
export const getTaskDetail = function (id) {
    const API = 'api/v1/tasks'
    return $GET(API + '/' + id)
}