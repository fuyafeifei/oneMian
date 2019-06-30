const state = {
    longitude: '113.324520',
    latitude: '23.099994',
    list:[{
        title:"未开始",
        flag:true
    },{
        title:"未打卡",
        flag:false
    },{
        title:"未放弃",
        flag:false
    },{
        title:"全部",
        flag:false
    }]
}

const mutations = {
    upGetLocation(state,payload){
        state.longitude = payload.longitude;
        state.latitude = payload.latitude;
    }
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