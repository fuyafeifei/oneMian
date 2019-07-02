import request from '../utils/request';


export let login = code=>{
    return request.post('/user/code2session', {
      code
    })
  }

  export let getlist = params =>{
    return request.get('/sign',params)
  }
  