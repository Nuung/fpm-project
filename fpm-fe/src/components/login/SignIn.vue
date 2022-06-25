<template>
  <div>
    <b-form-input
        id="userId"
        v-model="form.userId"
        placeholder="아이디"
        required
    ></b-form-input>
    <b-form-input
        id="userPass"
        v-model="form.password"
        placeholder="비밀번호"
        required
    ></b-form-input>
    <button @click="userLogin">submit</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            form : {
                userId : '', 
                password : ''
                }
        }
    },
    methods: {
        userLogin: function(){
            const data = {
                userId: this.form.userId,
                password: this.form.password
            }
            this.axios.post('/api/user/login', data)
                .then((result) => {
                    if(result.status == 201){
                        let token = result.data.data.token
                        let userId = this.form.userId
                        this.$store.commit("login", { token, userId });
                        //document.cookie("authorization", result.data.data.token);
                        this.axios.defaults.headers.common["authorization"] = result.data.data.token;
                        this.$router.push('/');
                    }
                })
                .catch(() => {
                    alert("아이디 또는 비밀번호를 잘못 입력하셨습니다.");
                })
        }
    }
}
</script>

<style>

</style>