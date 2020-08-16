import {getCitys} from './../../service/city'
import {debounce} from './../../utils/debounce'
import {createTask} from './../../service/task'
var app =  getApp();

const filterCity = debounce(function(value){
  let city_likes = []
  if(value) {
    city_likes = this.citys.filter((city)=>{
      return city.name.indexOf(value) == 0
    })
  }
  this.setData({
    city_likes: city_likes.slice(0, 8)
  })
}, 500)
Page({
  data: {
    isPop: 'none',
    task_name: '',
    city_model: {
      name: ''
    },
    task_type: '',
    task_pay: '',
    task_desc: '',
    need_worker_nub: '0',
    city_name: ''
  },
  openPop() {
    this.setData({
      isPop: 'flex'
    })
  },
  async getCitys() {
    const {data: {citys}} = await getCitys()
    this.citys = citys
  },
  //选择城市
  selectCity(e) {
    const {detail: {value}} = e
    this.filterCity(value)
  },
  //确认城市
  sureCity(e) {
    if(this.closePopTimer) clearTimeout(this.closePopTimer)
    const {detail: {value}} = e

    const city_model = this.citys[value-1]
    this.setData({
      city_model,
      city_name: city_model.name
    })
    this.closePopTimer = setTimeout(() => {
      this.setData({
        isPop: 'none',
      })
    }, 1000);
  },
  save() {
    const {user_id} = app.globalData.userInfo
    const token = app.globalData.token
    const {task_name, task_type, task_pay, task_desc, need_worker_nub, city_model: {id: task_city_id}} = this.data
    //创建
    createTask({
      task_name, task_type, task_pay, task_desc, need_worker_nub, task_city_id, user_id, token
    })
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 1000
    })
    setTimeout(()=>{
      wx.switchTab({
        url: './../user/index'
      })
    }, 1500)
  },
  onLoad: function(options){
    //先获取citys到内存
    this.getCitys()
    //绑定函数以便调用
    this.filterCity = filterCity
  },
  onReady: function(){
    
  }
});