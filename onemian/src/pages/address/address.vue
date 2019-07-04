<template>
    <div class="wrapper">
        <div class="wrapTop">
            <div class="city">北京</div>
            <input type="text" placeholder="面试地址" :value="ress" @input="getSugges">
        </div>
        <div class="list" v-if="searches.length>0">
            <div v-for="item in searches" :key="item.id" @click="choose(item.id)">
                <h2>{{item.title}}</h2>
                <p>{{item.city}}{{item.district}}{{item.addr}}</p>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';
import QQMapWX from '@/utils/qqMapWX';

export default {
    data(){
        return {
            qqmapsdk:''
        }
    },
    computed:mapState({
        ress:state=>state.index.ress,
        searches:state=>state.index.searches
    }),
    created(){
        this.qqmapsdk = new QQMapWX({
            key: 'X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL'
        });
    },
    methods:{
        choose(key){
            this.$store.commit('index/choose',{
                key
            })
            wx.navigateTo({
                url:"/pages/counter/main"
            })
        },
        getSugges(e){
            console.log(e)
            var _this = this;
            this.qqmapsdk.getSuggestion({
                keyword: e.target.value, 
                success: function(res) {//搜索成功后的回调
                    _this.$store.commit('index/getRess',{
                        data:res.data,
                        value:e.target.value
                    })
                }
            });
        }
    }
}
</script>

<style scoped>
.wrapTop{
    width:100%;
    height:88rpx;
    border-top:solid 1px #ccc;
    border-bottom: solid 1px #ccc;
    display: flex;
    align-items: center;
    padding:20rpx 0;
    box-sizing: border-box;
}
.city{
    height: 100%;
    width:180rpx;
    font-size: 36rpx;
    text-align: center;
    border-right: solid 1px #ccc;
    margin-right:20rpx;
}
.wrapTop input{
    flex:1;
}
.list{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.list div{
    width: 100%;
    padding:14rpx 20rpx;
    box-sizing: border-box;
    border-bottom: solid 1px #ccc;
    font-size:34rpx;
}
.list div p{
    color:#ccc;
    font-size:24rpx;
}
</style>
