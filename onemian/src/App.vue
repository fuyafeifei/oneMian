<script>
import { login } from "./request/index";
import {mapMutations} from 'vuex';

export default {
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
          

        wx.login({
        success: async res=>{
          console.log('res...', res);
          let data = await login(res.code);
          console.log(data)
          this.updateState(data.data);
          wx.setStorageSync('openid', data.data.openid);
        }
      })


    wx.getSetting({
      success(res) {
        if (!res.authSetting["scope.record"]) {
          wx.authorize({
            scope: "scope.record",
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord();
            }
          });
        } else {
          wx.authorize({
            scode: "scope.userInfo",
            success: () => {
              wx.getUserInfo();
            },
            fail: () => {
              wx.openSetting();
            }
          });
        }
        // console.log(res)
      }
    });
  },

    methods: {
    ...mapMutations({
      updateState: 'updateState'
    })
  }
};
</script>

<style>
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
