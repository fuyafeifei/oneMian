<script>

import request from '@/utils/request';
import store from '@/store'

export default {
    created () {
        // 调用API从本地缓存中获取数据
        /*
        * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
        * 微信：mpvue === wx, mpvuePlatform === 'wx'
        * 头条：mpvue === tt, mpvuePlatform === 'tt'
        * 百度：mpvue === swan, mpvuePlatform === 'swan'
        * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
        */

        let logs
        if (mpvuePlatform === 'my') {
            logs = mpvue.getStorageSync({key: 'logs'}).data || []
            logs.unshift(Date.now())
            mpvue.setStorageSync({
                key: 'logs',
                data: logs
            })
        } else {
            logs = mpvue.getStorageSync('logs') || []
            logs.unshift(Date.now())
            mpvue.setStorageSync('logs', logs)
        }

        wx.login({
            success (res) {
                if (res.code) {
                    store.dispatch('index/getCode',{
                        code:res.code
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })

        //授权
        // wx.getSetting ({
        //     success (res) {
        //         let flag = res.authSetting['scope.userLocation'];
        //         if(flag){
        //             wx.showModal({
        //                 title: '获取用户信息',
        //                 content: '这是一个模态弹窗',
        //                 success (res) {
        //                     if (res.confirm) {
        //                         console.log('用户点击确定')
        //                     } else if (res.cancel) {
        //                         console.log('用户点击取消')
        //                     }
        //                 }
        //             })
        //         }else{
        //             wx.authorize({
        //                 scope: 'scope.record',
        //                 success (res) {
        //                     console.log("58",res)
        //                 }
        //             })
        //         }
        //     }
        // })
    },
    log () {
        console.log(`log at:${Date.now()}`)
    }
}
</script>

<style>
page{
    width: 100%;
    height: 100%;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
