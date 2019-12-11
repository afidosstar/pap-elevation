<template>
        <div class="login-clean">
            <form method="post" v-on:submit.prevent="verifCheck()" action="#">
                <h2 class="sr-only">P.A.P</h2>
                <div class="illustration"><i class="fa fa-apple"></i></div>
                <div class="error text-red" v-if="error">{{msg}}</div>
                <div class="input-field">
                    <input  type="text" v-model="username" id="username" required placeholder="Utilisateur">
                </div>
                <div class="input-field">
                    <input  type="password" v-model="password" required placeholder="Mot de passe">
                </div>
                <div class="input-field">
                    <button class="btn" type="submit" >Se connecter</button>
                </div>
            </form>
        </div>
</template>
<style>
    @import url("/static/css/Login-Form-Clean.css");
</style>
<script>
    import auth from 'auth';
    export default{

        data(){
            return{
                username:'',
                password:'',
                msg:'indentifiant incorrect',
                error:false,
            }
        },
        methods:{
            verifCheck(){
                auth.log in(this.username,this.password,(verification)=>{
                    if(verification){
                        this.$router.replace(this.$route.query.redirect || '/dashboard')
                    }else{
                        this.error=true;
                    }
                });
                this.password='';
            }
        }
    }
</script>