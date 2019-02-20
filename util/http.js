import {config} from '../config.js'
const tips = {
  1:'抱歉出现了一个错误',
  1005:'appKey无效',
  3000:'期刊不存在'
}
class HTTP{
  request(params){
    // url,data,method
    if(!params.method){
      params.method = "GET"
    }
    wx.request({
      url: config.api_base_url+params.url,
      method: params.method,
      data:params.data,
      header: {
        'content-type':'application/json',
        'appKey':config.appKey
      },
      success:(res)=>{
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
          params.success(res.data)
        }else{
          // 服务器异常
          console.log(res.data.error_code)
          this._show_error(res.data.error_code)

        }
      },
      fail:(err)=>{
        // 服务器调用失败
        this._show_error()
      }
    })
  }
  // 带下划线，在意义上代表是私有方法，但是外部可以调用
  _show_error(error_code){
    if(!error_code){
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export {HTTP}