import {getResume, updateResume, uploadAvatarUrl} from './../../service/resume'
import {getCitys} from './../../service/city'
import {debounce} from './../../utils/debounce'
const app =  getApp();

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
  /**
   * 页面的初始数据
   */
  data: {
    isPop: 'none',
    city_name: ''
  },

  openPop() {
    this.setData({
      isPop: 'flex'
    })
  },

  selectCity(e) {
    const {detail: {value}} = e
    this.filterCity(value)
  },
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

  handleChange(e) {
    const {detail: {value}, target: {dataset: {messageType}}} = e
    this.setData({
      [messageType]: value
    })
  },

  async getResume(id) {
    const {data: {resume}}  = await getResume(id)
    console.log(resume)
    const {user_id, name, gender, avatar_url, city_model, expect_task_type, expect_pay, weixin_phone} = resume
    this.setData({
      name, gender, avatar_url, city_model, expect_task_type, expect_pay, weixin_phone,
      city_name: city_model.name
    })
    console.log(city_model.name)
  },

  async getCitys() {
    const {data: {citys}} = await getCitys()
    this.citys = citys
  },

  save() {
    const {user_id} = app.globalData.userInfo
    const token = app.globalData.token
    const {name, gender, expect_task_type, expect_pay, weixin_phone, city_model: {id: expect_city_id}} = this.data
    const updateData = {
      name, gender, expect_task_type, expect_pay, weixin_phone, expect_city_id
    }
    updateResume(this.resume_id, {
      user_id, token, updateData
    })
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1000
    })
    setTimeout(()=>{
      wx.switchTab({
        url: './../user/index'
      })
    }, 1500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id: resume_id} = options
    this.resume_id = resume_id
    this.getResume(resume_id)
    this.getCitys()
    this.filterCity = filterCity
  },

  //上传头像
  uploadAvatar() {
    this.uploadAvatarUrl()
  },

  async uploadAvatarUrl() {
    const {data: {avatar_url}} = await uploadAvatarUrl(this.resume_id)
    console.log(avatar_url)
    this.setData({avatar_url})
    wx.showToast({
      title: '修改头像成功',
      icon: 'success',
      duration: 500
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})