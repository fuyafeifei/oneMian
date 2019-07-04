<template>
    <div>
        <map 
            id="map" 
            :longitude="longitude" 
            :latitude="latitude" 
            scale="14"  
            subkey="X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL"
            show-location="true"
            style="width: 100%; height: 100%;">
        </map>
        <cover-view class="current">
            <cover-image class="potoItem" @click="local" src="/static/images/location.png" />
        </cover-view>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed:{
        ...mapState({
            longitude:state=>state.index.longitude,
            latitude: state=>state.index.latitude
        })
    },
}
</script>

<style scoped>
div{
  position: relative;
  height: 100%;
}
map{
  width: 100%;
  height: 100%;
}
.current{
  position: absolute;
  bottom: 150rpx;
  left: 20rpx;
}
.potoItem{
  height: 80rpx;
  width: 80rpx;
}
</style>
