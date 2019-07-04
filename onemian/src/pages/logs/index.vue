<template>
    <div class="wrapper">
        <div class="wrapTop">
            <div class="wrapImg">
                <img src="../../../static/images/user.png" alt="" />
            </div>
            <div class="wrapUser">{{phoneNumber}}</div>
        </div>
        <div class="wrap">
            <div class="wrapItem" @click="interview">
                <icon type="waiting" size="18"></icon>
                <div>我的面试</div>
                <p>></p>
            </div>
            <div class="wrapItem" @click="model">
                <icon type="info" size="18"></icon>
                <div>客服中心</div>
                <p>></p>
            </div>
        </div>
            <button open-type="getPhoneNumber" @getphonenumber="getUser">获取手机号</button> 
            <button v-if="setting" open-type="openSetting">打开设置页</button>   
        <!-- <div class="model">
        </div>
        <div class="model">
        </div> -->
    </div>
</template>

<script>
import {encryptData} from '@/services'
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState({
            hasPhone:state=>state.scope.hasPhone,
            setting:state=>state.scope.setting,
            phoneNumber:state=>state.trivial.phoneNumber
        })
    },
    created () {
        let that = this;
        wx.getSetting({
            success (res) {
                console.log(res.authSetting)
                if(res.authSetting['scope.userInfo']){
                    wx.getUserInfo({
                        withCredentials:true,
                        success(res){
                            that.hasPhone = true;
                        }
                    })
                }else{
                    that.hasPhone = false;
                }
            }
        })
    },

    methods:{
        interview(){
            wx.navigateTo({
                url: '../order/main'
            })
        },
        model(){
            wx.showModal({
                title: '模拟进入客服会话',
                content: '开发者工具暂不支持打开客服会话,请使用真机模式',
                showCancel:false,
                confirmText:"返回",
                success (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        },
        async getUser(e){
            console.log('e',e)
            if(e.target.errMsg === "getPhoneNumber:ok"){
                let data = await encryptData({
                    encryptedData:e.target.encryptedData,
                    iv:e.target.iv
                })
                console.log(data)
                this.$store.commit('trivial/changePhone',data.data.phoneNumber)
            }else{
                this.$store.commit('scope/change')
            }
        }
    }
}
</script>

<style scoped>
.wrapper{
    width: 100%;
    height:100%;
    position: relative;
}
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
.model{
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    position: absolute;
    top:0;
    left:0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.model button{
    width: 300rpx;
    height:100rpx;
    border:none;
    background:#fff;
    padding:0;
}
</style>
