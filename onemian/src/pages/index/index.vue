<template>
    <div class="wrapper">
        <div class="top">
            <Map></Map>
        </div>
        <cover-view class="current">
            <button class="add" @tap="jump">添加面试</button>
            <button class="my" @tap="comeTo">
                <cover-image src="/static/images/my.png"/>
            </button>
        </cover-view>
    </div>
</template>

<script>
import QQMapWX from '@/utils/qqMapWX';
import { mapState, mapActions } from 'vuex';
import Map from '@/components/card';
export default {
    components:{
        Map
    },

    data(){
        return {
        }
    },

    computed:{
    },

    created(){
        let qqmapsdk = new QQMapWX({
            key: 'X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL'
        });
        this.getLocation();
    },

    methods: {
        ...mapActions({
            getLocation:"index/getLocation"
        }),
        jump(){
            wx.navigateTo({
                url:"/pages/counter/main"
            })
        },
        comeTo(){
            wx.navigateTo({
                url:"/pages/logs/main"
            })
        },
        local(){
            this.getLocation();
        }
    }
}
</script>

<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.top{
    width: 100%;
    height: 100%;
}
.poto{
    width: 100%;
    height:120rpx;
    position: absolute;
    bottom:100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 40rpx;
    box-sizing:border-box;
}
.current{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 240rpx;
}
.add{
    position: fixed;
    width: 100%;
    height: 100rpx;
    background: #000;
    color: #fff;
    font-weight: 500;
    bottom: 0;
    left: 0;
    font-size: 40rpx;
}
.my{
    position: fixed;
    display: inline-block;
    bottom: 150rpx;
    right: 0;
    width: 120rpx;
    height: 100rpx;
    border:none;
    background: rgba(0, 0, 0, 0)
}
cover-image{
    width: 80rpx;
    height: 80rpx;
    margin-top: 10rpx;
    margin-left: 10rpx;
    background: #000;
    border-radius: 50%;
}
</style>
