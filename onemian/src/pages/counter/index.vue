<template>
    <form class="wrapper" report-submit="true" report-submit-timeout=10 @submit="sure">
        <div class="title">面试信息</div>
        <div class="wrap">
            <div class="wrapItem">
                <p>公司名称</p>
                <input type="text" name="name" placeholder="请输入公司名称" :value="name" v-model="name" @input="changeName">
            </div>
            <div class="wrapItem">
                <p>公司电话</p>
                <input type="text" name="phone" placeholder="请输入面试联系人电话" :value="phone" v-model="phone" @input="changePhone">
            </div>
            <div class="wrapItem">
                <p>面试时间</p>
                <picker class="picker" name="time" mode="multiSelector" @change="bindMultiPickerChange" :value="multiIndex" :range="newMultiArray">
                    <span>{{time}}</span>
                </picker>
                <icon type="warn" size="24" color="#197DBF" @click="tobel"></icon>
            </div>
            <div class="wrapItem">
                <p>面试地址</p>
                <div @click="choose" v-if="ress === ''">选择面试地址</div>
                <input name="address" @click="choose" v-else :value="ress" />
            </div>
        </div>
        <div class="title">备注信息</div>
        <div class="wrapElse">
            <textarea class="text" :value="remarks" @input="changeRemarks" placeholder="请输入备注信息"></textarea>    
        </div>
        <button class="btn" form-type="submit">确定</button>
    </form>
</template>

<script>

import { mapState } from 'vuex';
const moment = require('moment');

export default {
    data(){
        return {
            res:/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            multiArray: [],
            multiIndex: [0, 0, 0]
        }
    },

    created(){
        this.$store.commit('index/getTime');
        console.log(moment().hour())
    },
    
    computed: {
        newMultiArray(){
            const array = [];
            const date = new Date();
            const days = [];
            const hours = [];
            const minutes = [];
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            let day = date.getDate();
            let hour = date.getHours();
            
            //日期
            if(moment().hour()===23){
                day+=1;
                hour = 0;
            }
            for (let i = day; i <= day+10; i++) {
                days.push(i>=10?i:'0'+i);
            }
            array.push(days);

            //小时
            // if()
            // for (let i = hour; i < 24; i++) {
            //     hours.push(i>=10?i:'0'+i);
            // }
            for(let i = 0;i < 24; i++){
                hours.push(i>=10?i:'0'+i);
            }
            array.push(hours);

            //分钟
            for (let i = 0; i < 60; i++) {
                if(i%10 === 0){
                    minutes.push(parseInt(i/10)+'0');
                }
            }
            array.push(minutes);
            return array;
        },
        ...mapState({
            name:state=>state.index.name,
            phone:state=>state.index.phone,
            time:state=>state.index.time,
            remarks:state=>state.index.remarks,
            ress:state=>state.index.ress,
            years:state=>state.index.years,
            months:state=>state.index.months,
            flag:state=>state.index.flag
        })
    },
    methods: {
        choose(){
            wx.navigateTo({
                url:"../../pages/address/main"
            })
        },
        tobel(){
            wx.showToast({
                title: '面试前一个小时我们会提醒你哦',
                icon:"none",
                duration: 2000
            })
        },
        changeName(e){//公司名称
            this.$store.commit('index/changeName',e.target.value);
        },
        changePhone(e){//电话
            this.$store.commit('index/changePhone',e.target.value);
            
        },
        changeRemarks(e){//备注信息
            this.$store.commit('index/changeRemarks',e.target.value);
        },
        async sure(e){//点击确定
            if(this.name === ''){
                wx.showToast({
                    title: '请输入公司名称',
                    icon:"none",
                    duration: 2000
                })
            }else{
                if(this.res.test(this.phone)){
                    if(this.ress === ''){
                        wx.showToast({
                            title: '请选择公司地址',
                            icon:"none",
                            duration: 2000
                        })
                    }else{
                        console.log(e)
                        this.flag = true;
                        let res = await this.$store.dispatch('index/addSigns',e.mp.detail.formId);
                        if(res.code === 0){
                            this.flag = false;
                            wx.showModal({
                                title: '温馨提示',
                                content: '添加面试成功',
                                showCancel:false,
                                confirmText:"确定",
                                success (res) {
                                    if (res.confirm) {
                                        wx.navigateTo({
                                            url: '/pages/order/main'
                                        })
                                    }
                                }
                            })
                        }
                    }
                }else{
                    wx.showToast({
                        title: '请输入面试联系人的手机或座机',
                        icon:"none",
                        duration: 2000
                    })
                }
            }
        },
        bindMultiPickerChange(e) {
            this.multiIndex = e.target.value;
            const index = this.multiIndex;
            const day = this.newMultiArray[0][index[0]];
            const hour = this.newMultiArray[1][index[1]];
            const minute = this.newMultiArray[2][index[2]];
            let time = this.years + "-" + this.months + "-" + day + " " + hour + ":" + minute;
            this.$store.commit('index/changeTime',{
                time
            })
        }
    }
}
</script>

<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
    background:#eee;
    /* paddding-left */
}
.title{
    width: 100%;
    font-size:34rpx;
    padding:15rpx 0 15rpx 30rpx;
    box-sizing: border-box;
}
.wrap{
    width: 100%;
    padding-left:30rpx;
    box-sizing: border-box;
    background:#fff;
    display: flex;
    flex-direction: column;
}
.wrapItem{
    width: 100%;
    height: 100rpx;
    padding:18rpx 0;
    box-sizing: border-box;
    border-bottom:solid 1px #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.wrapItem p{
    font-size: 30rpx;
    width: 170rpx;
}
.wrapItem input,.wrapItem div,.wrapItem .picker{
    flex:1;
    font-size: 30rpx;
}
.wrapItem icon{
    margin-right: 10px;
}
.wrapElse{
    width:100%;
    padding:30rpx;
    box-sizing: border-box;
    background:#fff;
}
.text{
    width: 100%;
    height:200rpx;
    border:solid 1px #ccc;
    font-size: 30rpx;
    padding:5rpx;
    box-sizing: border-box;
}
.btn{
    width: 100%;
    height:100rpx;
    background:#999;
    color:#fff;
}
.maker{
    background:darkblue;
}
</style>
