<template>
    <div class="wrapper">
        <div class="top">
            <map 
                id="map" 
                :longitude="longitude" 
                :latitude="latitude" 
                scale="14"  
                subkey="X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL"
                show-location="true"
                style="width: 100%; height: 100%;">
            </map>
            <div class="poto">
                <div class="potoItem">
                    <img src="../../../static/images/location.png" alt="" />
                </div>
                <div class="potoItem potoBack">
                    <img @click="btnList" src="../../../static/images/my.png" alt="" />
                </div>
                
            </div>
        </div>
        <button @click="jump">添加面试</button>
    </div>
</template>

<script>
import QQMapWX from '@/utils/qqMapWX';
import { mapState, mapActions } from 'vuex';
export default {
    data(){
        return {
        }
    },

    computed:{
        ...mapState({
            longitude:state=>state.index.longitude,
            latitude: state=>state.index.latitude
        })
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
                url:"/pages/addInterview/main"
            })
        },

        btnList(){
                wx.navigateTo({
                    url:"/pages/personage/main"
                })
        }
    }
}
</script>

<style>
page{
    width: 100%;
    height: 100%;
}
.wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.top{
    width: 100%;
    flex:1;
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
.potoItem{
    width:80rpx;
    height:80rpx;
    border-radius: 100%;
}
.potoItem img{
    width: 100%;
    height: 100%;
    border-radius: 100%;
}
.potoBack{
    background:#000;
}
button{
    width: 100%;
    height:100rpx;
    background:#000;
    color:#fff;
}
</style>
