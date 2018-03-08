export default {

    state: {
        //初始化的数据先从localstorage里取， 如果没有创建一个空的对象
        cart:JSON.parse(localStorage.getItem('addgoods')) ||{}
    },

    mutations: {
        modify(state,data){
            let {id,num} = data;
            state.cart[id] = num;//根据id修改对应购买的数据的值
            //每次改变后把新的记录存储到localstorage里，防止数据丢失
            localStorage.setItem('addgoods',JSON.stringify(state.cart))
            // console.log(state.cart);
            
        }
    }

}