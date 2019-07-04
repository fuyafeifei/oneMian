import { upSign } from '@/services';

const state = {
    phoneNumber:'15110****36',
    remind:-1,
    status:-1,
    id:0
};

const mutations = {
    changePhone(state,payload){
        let fn = payload.substring(0,3);
        let ph = payload.substring(7);
        state.phoneNumber = fn + '****' + ph;
    },
    changeRemind(state,payload){
        state.remind = payload ? 1 : -1;
    },
    giveUp(state){
        state.status = 1;
    },
    getId(state,payload){
        state.id = payload;
    }
};

const actions = {
    async upSigns(store,payload){
        let data = await upSign({
            status:1,
            remind:store.state.remind,
            id:payload
        })
        // if(data.code === 0){
        //     store.dispatch('index/getDetail',payload)
        // }
        return data;
    }
};

export default {
    namespaced:true,
    state,
    mutations,
    actions
}