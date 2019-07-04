import { login, getSign, addSign, signDetail } from '@/services';

const state = {
    openid:'',
    phone:'',
    longitude: '113.324520',
    latitude: '23.099994',
    list:[{
        title:"未开始",
        flag:true,
        key:-1
    },{
        title:"已打卡",
        flag:false,
        key:0
    },{
        title:"已放弃",
        flag:false,
        key:1
    },{
        title:"全部",
        flag:false,
        key:2
    }],
    name:"",
    phone:"",
    time:'2019-07-01',
    addres:"",
    latitudes:0,
    longitudes:0,
    remarks:"",//备注信息
    years:'',
    months:'',
    lists:[],
    data:[],
    key:-1,
    ress:'',
    addresss:"",
    searches:[],
    id:'',
    detail:{},
    flag:false,
    page:1,
    pageSize:10
}

const getter={}

const mutations = {
    getCodes(state,payload){
        state.openid = payload.openid;
        wx.setStorage({
            key:"openid",
            data:payload.openid
        })
    },
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
        state.lists = [];
        state.page = 1;
    },
    getTime(state){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        state.years = year;
        state.months = month >= 10 ? month : '0' + month;
        state.time = date.toLocaleString().replace(/\//g,  "-").replace(/上午|下午/,'');
        let lastIndex = (state.time).lastIndexOf(':');
        state.time = (state.time).substring(0,lastIndex);
    },
    changeTime(state,payload){
        state.time = payload.time;
    },
    changeName(state,payload){
        state.name = payload;
    },
    changePhone(state,payload){
        state.phone = payload;
    },
    changeRemarks(state,payload){
        state.remarks = payload;
    },
    getList(state,payload){
        state.data = payload;
        payload.map(item=>{
           state.lists.push(item)
        })
        state.lists.map(item=>{
            let time = new Date(parseInt(item.start_time)).toLocaleString().replace(/\//g,  "-").replace(/上午|下午/,'');
            let lastIndex = time.lastIndexOf(':');
            item.start_time = time.substring(0,lastIndex);
            if(item.address.substring(0,1) === '{'){
                item.address = JSON.parse(item.address).address
            }
        })
    },
    getRess(state,payload){
        var sug = [];
        for (var i = 0; i < payload.data.length; i++) {
            // 获取返回结果，放到sug数组中
            sug.push({
               title: payload.data[i].title, 
               id: payload.data[i].id,
               addr: payload.data[i].address,
               city: payload.data[i].city,
               district: payload.data[i].district,
               latitude: payload.data[i].location.lat,
               longitude: payload.data[i].location.lng
           });
        }
        state.searches = sug;
        state.ress = payload.value;
    },
    choose(state,payload){
        let item = state.searches.filter(item=>item.id === payload.key);
        state.ress = item[0].title;
        state.latitudes = item[0].latitude;
        state.longitudes = item[0].longitude;
        state.addresss = item[0].city+item[0].district+item[0].addr;
        state.id = item[0].id;
    },
    upDetail(state,payload){
        state.detail = payload;
        let time = new Date(parseInt(payload.start_time)).toLocaleString().replace(/\//g,  "-").replace(/上午|下午/,'');
        let lastIndex = time.lastIndexOf(':');
        payload.start_time = time.substring(0,lastIndex);
        state.detail.start_time = time;
        if(payload.address.substring(0,1) === '{'){
            state.detail.address = JSON.parse(payload.address).address
        }
        console.log('详情',state.detail)
    },
    pages(state){
        state.page = ++state.page;
    }
}

const actions = {
    getLocation(store){
        wx.getLocation({
            type: 'wgs84',
            success (res) {
                store.commit('upGetLocation',res)
            }
        })    
    },
    //面试列表
    async getListDate(store){
        // if(store.state.data.length<store.state.pageSize && store.state.data.length !== 0){
        //     return;
        // }
        let data = await getSign({
            key:store.state.key === 2 ? '' :store.state.key,
            page:store.state.page,
            pageSize:store.state.pageSize
        });
        console.log(data)
        store.commit('getList',data.data)
    },
    //登录
    async getCode(store,payload){
        let data = await login(payload.code);
        store.commit('getCodes',{
            openid:data.data.openid,
            phone:data.data.phone
        })
    },
    //添加面试
    async addSigns(store,payload){
        console.log(payload)
        let data = await addSign({
            company:store.state.name,
            phone:store.state.phone,
            address:store.state.addresss,
            form_id:payload,
            latitude:store.state.latitudes,
            longitude:store.state.longitudes,
            start_time:new Date(store.state.time).getTime(),
            description:store.state.remarks
        })
        return data;
    },
    //面试详情
    async getDetail(store,payload){
        let data = await signDetail(payload.id);
        console.log(data)
        store.commit('upDetail',data.data);
        return data.data;
    }
}

export default {
    namespaced:true,
    state,
    getter,
    mutations,
    actions
}