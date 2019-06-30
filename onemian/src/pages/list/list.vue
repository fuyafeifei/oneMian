<template>
    <div class="wrapper">
        <div class="wrapTop">
            <!-- <div class="active">未开始</div>
            <div>未打卡</div>
            <div>未放弃</div>
            <div>全部</div> -->
            <div v-for="(item,index) in list" 
                :key="index" 
                :class="item.flag?'active':''" 
                @click="tab(index)">
                {{item.title}}
            </div>
        </div>
        <div>
            当前分类还没有面试！
        </div>
    </div>
</template>

<script>

import { mapState,mapActions } from 'vuex';

export default {
    data(){
        return {
        }
    },
    computed:{
        ...mapState({
            list:state=>state.index.list
        })
    },
    methods:{
        tab(index){
            // this.getIndex();
        },
        // ...mapActions({
        //     store.get
        //     getIndex:("index/getIndex",1),
        // })
        
    }

}
</script>

<style scoped>
.wrapTop{
    width: 100%;
    height:100rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top:solid 1px #ccc;
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
</style>
