<template>
    <div>
        <div class="left-220">
                <ul class="side-img-list">
                    <li v-for="(item,index) in list" :key="item.id">
                        <div class="img-box">
                            <label>{{index+1}}</label>
                            <img :src="item.img_url">
                        </div>
                        <div class="txt-box">
                            <!-- <a href="/goods/show-98.html">{{item.title}}</a> -->
                            <router-link :to="{name:'detail',params:{id:item.id}}">{{item.title}}</router-link>
                            <span>{{item.add_time | date}}</span>
                        </div>
                    </li>
                </ul>
            </div>
    </div>
</template>

<script>
    export default {
        //用来接收父组件传过来的数据
       props:['list'],
       filters: {
           date(tmpdate){
               let date = new Date(tmpdate);
               return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
           }
       }
    }
</script>

<style scoped>

</style>