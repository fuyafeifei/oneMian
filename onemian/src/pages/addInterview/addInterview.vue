<template>
    <div class="wrapper">
        <div class="title">面试信息</div>
        <div class="wrap">
            <div class="wrapItem">
                <p>公司名称</p>
                <input @input="mingCheng" type="text" placeholder="请输入公司名称">
            </div>
            <div class="wrapItem">
                <p>公司电话</p>
                <input type="text" placeholder="请输入面试联系人电话">
            </div>
            <div class="wrapItem">
                <p>面试时间</p>
                <picker class="picker" mode="date" :value="date" start="2019-06-28" end="2020-09-01" @change="bindDateChange">
                    <div>
                        {{date}}
                    </div>
                </picker>
                <icon type="warn" size="24" color="#197DBF" @click="tobel"></icon>
            </div>
            <div class="wrapItem">
                <p>面试地址</p>
                <div @click="choose">选择面试地址</div>
            </div>
        </div>
        <div class="title">备注信息</div>
        <div class="wrapElse">
            <textarea class="text" name="" id="" cols="30" rows="10" placeholder="请输入备注信息"></textarea>    
        </div>
        <button class="btn">确定</button>
    </div>
</template>

<script>

export default {
    data(){
        return {
            date: '2019-06-28',
        }
    },
    computed: {
    },
    methods: {
        
        choose(){
            wx.navigateTo({
                url:"../../pages/address/main"
            })
        },

        bindDateChange(e){
            this.date = e.mp.detail.value;
        },

        tobel(){
            wx.showToast({
                title: '成功',
                duration: 2000
            })
        },
        mingCheng(res){
            console.log(res)
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
</style>
