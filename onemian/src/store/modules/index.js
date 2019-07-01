const state = {
    longitude: '113.324520',
    latitude: '23.099994',
    list:[{
        title:"未开始",
        flag:true,
        key:-1
    },{
        title:"已打卡",
        flag:false,
        key:0,
    },{
        title:"已放弃",
        flag:false,
        key:1,
    },{
        title:"全部",
        flag:false,
        key:2
    }],
}

const mutations = {
    upGetLocation(state,payload){
        state.longitude = payload.longitude;
        state.latitude = payload.latitude;
    },
    upIndex(state,payload){
        state.key = state.list[payload.payload].key;
        state.list.map(item=>{
            item.flag = false;
        })
        state.list[payload.payload].flag = true;
    },
}

const actions = {
    getLocation(state,payload){
        wx.getLocation({
            type: 'wgs84',
            success (res) {
                console.log('res...', res);
                state.commit('upGetLocation',res)
            }
        })    
    },
    getIndex(state,payload){
        console.log(payload)
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}