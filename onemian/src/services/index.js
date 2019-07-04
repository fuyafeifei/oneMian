import request from '@/utils/request';

//登录
export function login(code){
    return request.post('/user/code2session',{
        code:code
    })
}

//获取面试列表
export function getSign(params){
    if(params.key===-1 || params.key===0 || params.key=== 1){
        return request.get('/sign?status='+params.key+'&page='+params.page+'&pageSize='+params.pageSize)
    }else{
        return request.get('/sign?page='+params.page+'&pageSize='+params.pageSize)
    }
}

//添加面试
export function addSign(params){
    console.log(params)
    return request.post('/sign',{
        company	:params.company,//是	string	面试公司名
        phone	:params.phone,//是	string	面试联系人方式
        form_id	:params.form_id,//是	string	模板消息推送id
        address	:params.address,//是	string	面试地址stringify后的字符串
        latitude	:params.latitude,//是	number	纬度
        longitude	:params.longitude,//是	number	经度
        start_time	:params.start_time,//是	number	开始时间
        description	:params.description,//否	string	面试备注
    })
}

//获取面试详情
export function signDetail(params){
    return request.get('/sign/'+params)
}

//更新面试信息
export function upSign(params){
    console.log(params)
    return request.put('/sign/'+params.id,{
        status:params.status,
        remind:params.remind
    })
}

//解密数据
export function encryptData(params){
    console.log(params)
    return request.post('/user/decrypt',{
        encryptedData:params.encryptedData,
        iv:params.iv
    })
}