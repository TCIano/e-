

export default{
    namespaced: true,
    state:{
        currentIndex:{}
    },
    mutations:{
        getCurrentIndex(state,payload){
            state.currentIndex=payload
        }
    },
    actions:{
        getCurrentIndex(context,payload){
            context.commit('getCurrentIndex',payload)
        }
    }
}