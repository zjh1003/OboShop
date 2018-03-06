<template>
    <div>
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">

                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div  class="goods-spec">
                                <h1>{{details.goodsinfo.title}}</h1>
                                <p class="subtitle">{{details.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{details.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{details.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{details.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                           <el-input-number min="1" size="mini" v-model="num"></el-input-number>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{details.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                                                <button class="add" onclick="cartAdd(this,'/',0,'/cart.html');">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a class="selected" href="javascript:;">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" class="">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <!--/选项卡-->

                            <!--选项内容-->
                            <div class="tab-content entry" style="display:block;">
                                内容
                            </div>

                            <div class="tab-content" style="display: block;">
                                <!--网友评论-->
                                <common-comment></common-comment>
                                <!--/网友评论-->
                            </div>

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <app-aside :list="details.hotgoodslist"></app-aside>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import CommonComment from './subcom/CommonComment.vue'
    import AppAside from './subcom/CommonAside.vue'

export default {
    data () {
        return {
            id:this.$route.params.id,
            num:1,
            details:{
                goodsinfo:{},
                imglist:[],
                hotgoodslist:[]
            }
        }
    },
    components: {
        CommonComment,
        AppAside
    },
    methods: {
       getDetails(){
           this.$http.get(this.$api.goodsDetail+this.id).then(res => {
               if(res.data.status == 0){
                   this.details = res.data.message;
               }
           })
       }
    },
    created () {
        this.getDetails();
    }
};
</script>

<style scoped>

</style>