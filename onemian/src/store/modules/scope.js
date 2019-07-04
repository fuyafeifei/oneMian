const state = {
    hasPhone:false,
    setting:false
};

const mutations = {
    change(state,payload){
        state.setting = true;
    }
};

const actions = {

};

export default {
    namespaced:true,
    state,
    mutations,
    actions
}