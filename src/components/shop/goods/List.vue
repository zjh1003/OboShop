<template>
    <div>
        <!-- 面包屑 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{name:'list'}">首页</router-link>

            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->
                                <li v-for="item in goodsTop.catelist" :key="item.is">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">{{subitem.title}}&nbsp;</span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt>
                                                <a href="/goods/42.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <router-link v-for="subitem in item.subcates" :key="subitem.id" to="">{{subitem.title}}</router-link>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel style="height:100%">
                                <el-carousel-item v-for="item in goodsTop.sliderlist" :key="item.id">
                                    <img style="height:100%" :src="item.img_url" :alt="item.title">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!--/幻灯片-->

                    <!--推荐商品-->
                    <!-- :list用来接收需要的数据 -->
                    <app-aside :list="goodsTop.toplist"></app-aside>
                    <!--/推荐商品-->

                </div>
            </div>
        </div>
<!-- 商品列表 -->
            <list-main></list-main>
            <!-- 商品列表 -->
    </div>
</template>

<script>
import AppAside from "./subcom/CommonAside.vue";
import ListMain from "./subcom/ListMain.vue";

export default {
  data() {
    return {
      goodsTop: {
        catelist: [],
        sliderlist: [],
        toplist: []
      }
    };
  },
  methods: {
    getTopData() {
      this.$http.get(this.$api.goodsTop).then(res => {
        // console.log(res);
        if (res.data.status == 0) {
          this.goodsTop = res.data.message;
        }
      });
    }
  },
  created() {
    this.getTopData();
  },
  components: {
    AppAside,
    ListMain
  }
};
</script>

<style scoped>

</style>