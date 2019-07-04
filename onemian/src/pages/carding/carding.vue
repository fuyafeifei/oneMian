<template>
    <div class="wrapper">
        <div class="wrap">
            <div class="wrapItem">
                <p>面试地址：</p>
                <div>{{detail.address}}</div>
            </div>
            <div class="wrapItem">
                <p>面试时间：</p>
                <div>{{detail.start_time}}</div>
            </div>
            <div class="wrapItem">
                <p>联系方式：</p>
                <div>{{detail.phone}}</div>
            </div>
            <div class="wrapItem">
                <p>是否提醒：</p>
                <div>{{detail.remind?'未提醒':'已提醒'}}</div>
            </div>
            <div class="wrapItem">
                <p>面试状态：</p>
                <div>{{detail.status==-1?'未开始':detail.status==0?'已打卡': '已放弃'}}</div>
            </div>
            <div class="wrapItem" v-if="detail.status===-1">
                <p>取消提醒：</p>
                <div>
                    <switch @change="switchChange"/>
                </div>
            </div>
        </div>
        <div class="btns" v-if="detail.status===-1">
            <button class="go" @click="goSign">去打卡</button>
            <button class="giveUp" @click="giveUp">放弃面试</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed:mapState({
        detail:state=>state.index.detail
    }),
    methods:{
        switchChange(e){
            this.$store.commit('trivial/changeRemind',e.mp.detail.value)
        },
        giveUp(){
            let that = this;
            wx.showModal({
                title: '放弃',
                content: '您确定放弃面试',
                success: async res => {
                    if (res.confirm) {
                        let data = await that.$store.dispatch('trivial/upSigns',that.detail.id)
                        console.log(data);
                        if(data.code === 0){
                            console.log('再次获取详情')
                            that.$store.dispatch('index/getDetail',{
                                id:that.detail.id
                            });
                        }
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        },
        goSign(){
            wx.navigateTo({
                url:"/pages/card/main"
            })
        }
    },
    mounted(){
        console.log('detail',this.detail)
        // this.$store.commit('trivial/getId')
    }
}
</script>

<style scoped>
.wrap{
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top:solid 1px #ccc;
    border-bottom:solid 1px #ccc;
    padding-left:30rpx;
    box-sizing: border-box;
}
.wrapItem{
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom:solid 1px #ccc;
    padding:20rpx;
    box-sizing: border-box;
    justify-content: space-between;
}
.wrapItem:last-child{
    border-bottom: none;
}
.wrapItem>p{
    width: 160rpx;
    margin-right:20rpx;
    font-size: 30rpx;
    color:#999;
}
.wrapItem div{
    flex:1;
    font-size:30rpx;
}
.btns{
    width: 100%;
    display: flex;
    padding:30rpx 0;
    box-sizing: border-box;
    margin-top:30rpx;
}
.btns button{
    flex:1;
    margin:0 30rpx;
    height:100rpx;
}
.go{
    background:blue;
    color:#fff;
}
.giveUp{
    background:red;
    color:#fff;
}
</style>
