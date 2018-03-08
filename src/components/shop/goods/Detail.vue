<template>
    <div>
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{name:'list'}">首页 ></router-link>
                <router-link :to="{name:'detail'}">商品详情</router-link>
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
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in details.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
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
                                        <el-input-number :min="1" size="mini" v-model="num"></el-input-number>
                                        <dd>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{details.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy">立即购买</button>
                                                <button class="add" @click="addCart">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <el-tabs type="border-card">

                                <el-tab-pane label="商品介紹">
                                    <div v-html="details.goodsinfo.content"></div>
                                </el-tab-pane>

                                <el-tab-pane label="商品評論">
                                    <common-comment :id="id"></common-comment>
                                </el-tab-pane>

                            </el-tabs>
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
import CommonComment from "./subcom/CommonComment.vue";
import AppAside from "./subcom/CommonAside.vue";

import "@/assets/lib/imgzoom/css/magnifier.css";
import "@/assets/lib/imgzoom/js/magnifier.js";

import $ from "jquery";

export default {
  data() {
    return {
      id: this.$route.params.id,
      num: 1,
      details: {
        goodsinfo: {},
        imglist: [],
        hotgoodslist: []
      }
    };
  },
  components: {
    CommonComment,
    AppAside
  },
  methods: {
    getDetails() {
      this.$http.get(this.$api.goodsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          this.details = res.data.message;
          //    console.log(this.details.goodsinfo.id);
        }
      });
    },
    //添加购物车
    addCart() {
      //当前的数量加上以前的数量
      let newNum = this.num + (this.$store.state.cart[this.id] || 0);
      this.$store.commit("modify", { id: this.id, num: newNum });
      //加完之后重置为0
      this.num = 0;
    }
  },
  created() {
    this.getDetails();
  },
  //视图被挂载到页面上执行
  mounted() {},
  //监听id的变化
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.getDetails();
    },

    //监听detail的数据变化，数据变化后重新调用初始化方法
    details() {
      var magnifierConfig = {
        magnifier: "#magnifier1", //最外层的大容器
        width: 370, //承载容器宽
        height: 370, //承载容器高
        moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
        zoom: 3 //缩放比例
      };

      setTimeout(function() {
        var _magnifier = $().imgzoon(magnifierConfig);
      }, 100);
    }
  }
};
</script>

<style scoped>

</style>