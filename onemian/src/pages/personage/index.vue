<template>
    <div class="wrapper">
        <div class="wrapTop">
            <div class="wrapImg">
                <img src="../../../static/images/user.png" alt="" />
            </div>
            <div class="wrapUser">{{phoneNumber}}</div>
        </div>
        <div class="wrap">
            <div class="wrapItem">
                <icon type="waiting" size="18"></icon>
                <div>我的面试</div>
                <p>></p>
            </div>
            <div class="wrapItem">
                <icon type="info" size="18"></icon>
                <div>客服中心</div>
                <p>></p>
            </div>     
        </div>
        <div v-if="!hasPhone">
              <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权手机号</button>
        </div>
        <div>
            <button v-if="showSetting" open-type="openSetting">打开设置页</button>
        </div>
       
    </div>
</template>

<script>

export default {
    components: {
        
    },

    // data () {
    //     return {
    //         hasPhone:false,
    //         showSetting:false,
    //         phhoneNumber:''
    //     }
    // },
//    methods:{

//        getPhoneNumber(e){
//            console.log(e,e.target.errMsg)
//            if(e.target.errMsg != 'getPhoneNumber:fail user deny'){
//                // 用户授权成功
//                let data =  encryptData({
//                    encryptData:e.target.encryptedData,
//                    iv:e.target.iv
//                })
//                this.phoneNumber = data.data.phoneNumber
//            }else{
//                // 用户授权失败,打开设置页面
//               this.showSetting = true
//            }
//        } 
//     },  

    // created () {
    //     // 获取已授权状态
    //     wx.getSetting({
    //         success(res){
    //             console.log(res.authSetting)
    //             if(res.authSetting['scope.userInfo']){
    //                 // 用户已授权
    //                 wx.getUserInfo({
    //                   withCredentials: true,
    //                   success: res => {
    //                         // 调用api获取用户信息
    //                         console.log(res)
    //                   },
    //                 });
    //             }else{
    //                 // 用户没有授权
    //             }
    //         }
    //     })
    // },
}
</script>

<style scoped>
.wrapTop{
    width: 100%;
    height: 350rpx;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background:#f4f6f9;
}
.wrapImg{
    width:100rpx;
    height:100rpx;
    background:#fff;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}
.wrapImg img{
    width:90%;
    height:90%;
    border-radius: 100%;
}
.wrap{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.wrapItem{
    width: 100%;
    padding:30rpx 40rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: solid 1px #ccc;
}
.wrapItem p{
    width: 40rpx;
    height: 40rpx;
}
.wrapItem div{
    flex:1;
    margin:0 8px;
    font-size: 36rpx;
}
</style>
