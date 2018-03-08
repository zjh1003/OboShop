<template>
    <div>                  
        <div class="comment-box">
            <!--取得评论总数-->
            <form id="commentForm" name="commentForm" class="form-box" @submit.prevent="sendComments">
                <div class="avatar-box">
                    <i class="iconfont icon-user-full"></i>
                </div>
                <div class="conn-box">
                    <div class="editor">
                        <textarea id="txtContent" v-model="commenttxt.commenttxt" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                    </div>
                    <div class="subcon">
                        <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                        <!-- <button @click="sendComments">提交</button> -->
                        <span class="Validform_checktip"></span>
                    </div>
                </div>
            </form>
            <ul id="commentList" class="list-box">
                <p v-if="comments.length==0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>

                <li v-for="(item,index) in comments" :key="index">
                    <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="inner-box" >
                        <div class="info">
                            <span>{{item.user_name}}</span>
                            <span>{{item.add_time}}</span>
                        </div>
                        <p>{{item.content}}</p>
                    </div>
                </li>
            </ul>
            <!--放置页码-->
            <!-- <div class="page-box" style="margin:5px 0 0 62px">
                <div id="pagination" class="digg">
                    <span class="disabled">« 上一页</span>
                    <span class="current">1</span>
                    <span class="disabled">下一页 »</span>
                </div>
            </div> -->
            <!--/放置页码-->
        </div>
    </div>
</template>

<script>
export default {
     props:['id'],

    data () {
        return {
            comments:[],
            commenttxt:{
                commenttxt:''
            }
        }
    },
   
    methods: {
        getComments(){
            console.log(this.id);
            
            var url = `${this.$api.commentList}goods/${this.id}?pageIndex=1&pageSize=10`;
            this.$http.get(url).then(res => {
                console.log(res);
                if(res.data.status == 0){
                    this.comments = res.data.message;
                }
                
            })
        },
        //发送评论
        sendComments(){
            
            let url = `${this.$api.comment}goods/${this.id}`;
            this.$http.post(url,this.commenttxt).then(res=>{
                console.log(res);
                
                // if(res.data.status == 0){
                //     // console.log(this.comments);
                    
                //     // this.commenttxt.comment = '';
                //     this.getComments();//刷新评论列表
                // }
            })
        }
    },
    created () {
        this.getComments();
    },
    watch: {
        id(){
            this.getComments();
        }
    }
};
</script>

<style scoped>

</style>