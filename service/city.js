import { $GET, $POST } from '../utils/request'

//获取openid
export const getCitys = function () {
  const API = 'api/v1/citys'
  return $GET(API)
}