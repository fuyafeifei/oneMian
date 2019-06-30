<template>
    <div class="wrapper">
        <div class="wrapTop">
            <div class="city">北京</div>
            <input type="text" placeholder="面试地址">
        </div>
    </div>
</template>

<script>
export default {

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
</style>
