<template>
    <div>
        <div v-for="item in listGroup" :key="item.level1cateid" class="section">
            <!--子类-->
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <!-- <a href="/goods/43.html">手机通讯</a> -->
                    <router-link v-for="subitem in item.level2catelist" :key="subitem.subcateid" to="">{{subitem.subcatetitle}}</router-link>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!--/子类-->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="subitems in item.datas" :key="subitems.artID">
                            <router-link :to="{name:'detail',params:{id:subitems.artID}}">
                                 <div class="img-box">
                                    <img :src="subitems.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{subitems.artTitle}}</h3>
                                    <p class="price">
                                        <b>¥{{subitems.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{subitems.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{subitems.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            listGroup:[]
        }
    },
    methods: {
        getListData(){
            this.$http.get(this.$api.goodsContent).then(res => {
                console.log(res);
                if(res.data.status == 0){
                     this.listGroup = res.data.message;
                }
            })
        }
    },
    created () {
        this.getListData();
    }
};
</script>

<style scoped>

</style>