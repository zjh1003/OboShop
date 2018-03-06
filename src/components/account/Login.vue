<template>
    
    <div class="login">
       
       <section>
           <el-form :model="ruleForm2" label-position="top" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="user_name">
                    <el-input type="text" v-model="ruleForm2.user_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
           </el-form>
       </section>
    </div>
</template>

<script>
     export default {
      data() {
  
      return {
        //表单数据
        ruleForm2: {
          user_name: '',
          password: ''
        },
        //验证规则
        rules2: {
          user_name: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        //登录
        login(){
            this.$http.post(this.$api.login,this.ruleForm2).then((res)=>{
                // console.log(res.data);
                if(res.data.status==0){
                    localStorage.setItem('uname',res.data.message.uname)
                    this.open()
                    // 登陆成功后, 跳转到用户未登陆前要访问的页面
                    //如果url地址栏有要访问的详细路径，则登录成功后调到详细路径页面
                    //如果没有 则直接调到后台的主页面
                    this.$router.push({ path: this.$route.query.next || '/shop/list' })
                }else{
                    this.$alert(res.data.message)
                }
            })
        },
        open() {
        this.$notify({
          title: '成功',
          message: '登录成功',
          type: 'success'
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.login();
          } else {
            console.log('error submit!!');
            return false;
          } 
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
    }
</script>

<style scoped lang="less">
   .login{
        height: 100%;
        background-color: #35495e;
     
        h2{
            text-align: center;
            color: #fff;
            position: absolute;
            top: -80px;
            left: 75px;
        }
        
        section{
            width: 400px;
            height: 300px;
            border: 1px solid #fff;
            border-radius: 5px;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            margin: 0 auto;
            .demo-ruleForm{
                padding: 10px;
            }
        }
    }
</style>