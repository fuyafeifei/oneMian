import request from '../utils/request';

//  登录接口获取openId
export let login = code=>{
    return request.post('/user/code2session', {
      code
    })
  }

  
  //  解密用户数据
// export let  encryptData = params =>{
//   return request.post('/user/decrypt',params)
// }
  
