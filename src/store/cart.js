
import Vue from 'vue'

export default {

    state: {
        //初始化的数据先从localstorage里取， 如果没有创建一个空的对象
        cart:JSON.parse(localStorage.getItem('addgoods')) ||{}
    },

    getters: {
      total(state){
          return Object.values(state.cart).reduce((sum,v) => sum += v , 0 )
      }  
    },
    mutations: {
        modify(state,data){
            let {id,num} = data;
            // state.cart[id] = num;//根据id修改对应购买的数据的值

            // 因为可能加到商品是一个新的, 那么添加新属性需要用set方法才能让视图跟着更新
            Vue.set(state.cart,id,num)

            //每次改变后把新的记录存储到localstorage里，防止数据丢失
            localStorage.setItem('addgoods',JSON.stringify(state.cart))
            // console.log(state.cart);
            
        },
        del(state,id){
            // 第一个参数为要删除属性的对象, 第二个参数为属性名
            Vue.delete(state.cart,id);

             //每次改变后把新的记录存储到localstorage里，防止数据丢失
             localStorage.setItem('addgoods',JSON.stringify(state.cart))
        }
    }

}