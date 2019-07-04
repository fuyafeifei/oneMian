<template>
    <div class="wrapper">
        <div class="wrapTop">
            <div v-for="(item,index) in list" 
                :key="index" 
                :class="item.flag?'active':''" 
                @click="tab(index)">
                {{item.title}}
            </div>
        </div>
        <div v-if="lists.length===0" class="wrap">当前分类没有数据</div>
        <scroll-view class="wrap" scroll-y="true" lower-threshold=50 v-else>
            <div class="wrapItem" v-for="item in lists" :key="item.id" @click="detail(item.id)">
                <div class="itemLeft">
                    <p>{{item.company}}</p>
                    <span>{{item.address}}</span>
                    <p>面试时间:{{item.start_time}}</p>
                </div>   
                <div class="itemRight">
                    <span>{{item.status?item.status==1?'已放弃':'未开始':'已打卡'}}</span>
                    <span>{{item.remind?'未提醒':'已提醒'}}</span>
                </div>
            </div>
        </scroll-view>
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
export default {
    data(){
        return {
            index:0
        }
    },
    computed:{
        ...mapState({
            list:state=>state.index.list,
            lists:state=>state.index.lists,
            key:state=>state.index.key
        })
    },
    methods:{
        tab(index){
            this.$store.commit({
                type:"index/upIndex",
                payload:index
            }),
            this.$store.dispatch('index/getListDate')
        },
        detail(id){
            this.$store.dispatch('index/getDetail',{
                id
            })
            wx.navigateTo({
                url:"/pages/carding/main"
            })
        },
        lower(){
            console.log(111)
            this.$store.commit('index/pages')
            this.$store.dispatch('index/getListDate')
        }
    },
    mounted(){
        this.$store.dispatch('index/getListDate')
    },
    onPullDownRefresh(e){
        console.log('下拉',e)
    },
    onReachBottom(e){
        console.log('上拉',e)
    }
}
</script>

<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
    background: #eee;
    display: flex;
    flex-direction: column;
}
.wrapTop{
    width: 100%;
    height:100rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top:solid 1px #ccc;
    background:#fff;
    margin-bottom:30rpx;
}
.wrapTop>div{
    height: 100%;
    display: flex;
    align-items: center;
}
.active{
    border-bottom:solid 1px #ccc;
    color:#197dbf;
}
.wrap{
    flex:1;
    width: 100%;
    background:#fff;
    overflow: hidden;
}
.wrapItem{
    width: 100%;
    padding:20rpx 30rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.itemLeft{
    flex:1;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.itemLeft p{
    margin:20rpx 0;
    font-size: 34rpx;
}
.itemLeft span{
    color:#ccc;
    font-size:30rpx;
}
.itemRight{
    width:200rpx;
    margin-left:10rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.itemRight span{
    padding:10rpx;
    box-sizing: border-box;
    font-size: 32rpx;
}
.itemRight span:nth-child(1){
    color:#f56c6c;
    background:hsla(0,87%,69%,.1);
}
.itemRight span:nth-child(2){
    color:#909399;
    background:hsla(220,4%,58%,.1);
}
</style>
