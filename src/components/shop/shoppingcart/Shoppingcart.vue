<template>
    <div>
        <!-- 导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{name:'list'}">首页</router-link>&gt;
                <router-link to="">购物车</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!-- 头部进度 -->
                    <div class="cart-head clearfix">
                        <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 商品列表 -->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <!-- value属性的值是由其他商品的selected值共同决定的 -->
                                        <el-switch @change="changeAll" :value="selectedAll" active-color="#13ce66"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>

                                <tr v-for="item in goodsList" :key="item.id">
                                    <th width="48" align="center">
                                        <el-switch v-model="item.selected" active-color="#13ce66"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">
                                        <img width="50" height="50" :src="item.img_url" alt="">
                                        <span>{{item.title}}</span>
                                    </th>
                                    <th width="84" align="left">
                                        ￥{{item.sell_price}}
                                    </th>
                                    <th width="104" align="center">
                                        <el-input-number v-model="$store.state.cart[item.id]" size="mini" :min="1" ></el-input-number>
                                    </th>
                                    <th width="104" align="left">
                                        <td>￥{{item.sell_price * $store.state.cart[item.id]}}</td>
                                    </th>
                                    <th width="54" align="center">
                                        <el-button @click="del(item.id)" size="mini">删除</el-button>
                                    </th>
                                </tr>

                                <tr v-if="goodsList.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning"><i class="iconfont icon-tip"></i></div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{total}}</b> 件 &nbsp;&nbsp;&nbsp;
                                        商品总金额（不含运费）：
                                        <span class="red">￥</span><b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button">继续购物</button>
                            <button class="submit">立即结算</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                goodsList:[]
            }
        },
        methods: {
            getgoodslist(){
                let ids = Object.keys(this.$store.state.cart);//提取所有id的值
                // console.log('id='+ids);
                this.$http.get(this.$api.shopcartGoods + ids).then(res=>{
                    if(res.data.status == 0){
                        //给每个商品添加selected属性
                        res.data.message.forEach(v => v.selected = true );

                        this.goodsList = res.data.message;
                        console.log(this.goodsList);
                        
                    }
                })
            },
            changeAll(newState){
                 // 监听全选按钮的点击事件, 得到新的状态值, 然后遍历所有商品依次设为新的状态
                 this.goodsList.forEach(v => v.selected = newState)
            },
            //删除
            del(id){
                //先从goodsList里删除，再从全局cart状态里删除
                this.goodsList = this.goodsList.filter(v => v.id != id);//返回不用删除的

                this.$store.commit('del',id);
            }
        },
        //计算属性
        computed: {
            selectedAll(){
                 // 如果所有商品的selected为true, 那么这个属性值就为true, 有一个false, 那么就为false
                 return this.goodsList.every(v => v.selected)
            },

            total(){
                  // 被选商品总数 => 遍历所有商品, 如果selecred为true, 那么累加该商品的购买数量
                let sum = 0;
                this.goodsList.forEach(v => v.selected && (sum += this.$store.state.cart[v.id]));
                return sum;
            },

            totalPrice(){
                //总价格
                let sum = 0;
                this.goodsList.forEach(v => v.selected && (sum += this.$store.state.cart[v.id] * v.sell_price));
                return sum;
            }
        },
        created () {
            this.getgoodslist();
        }
    }
</script>

<style scoped>

</style>