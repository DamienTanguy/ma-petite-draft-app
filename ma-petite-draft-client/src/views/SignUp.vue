<template>
  <div class="signup">
    <form id="signup" @submit.prevent>
      <h1 class="title">Sign Up</h1>
      <div class="flex-container">

        <div :class="{ 'form-group--error': $v.username.$error, 'form-group--loading': $v.username.$pending }">
          <label for="username">Username: </label>
          <input class="username-input" v-model.trim="$v.username.$model" placeholder="Username"/>
          <span class="error" v-if="!$v.username.required"> Username is required.</span>
        </div>

        <!--<div :class="{ 'form-group--error': $v.email.$error, 'form-group--loading': $v.email.$pending }">
          <label for="email">Email address: </label>
          <input class="email-input" v-model.trim="$v.email.$model" placeholder="Email address"/>
          <span class="error" v-if="!$v.email.required"> Email is required.</span>
        </div>-->

        <div :class="{ 'form-group--error': $v.password1.$error, 'form-group--loading': $v.password1.$pending }">
          <label for="password">Password: </label>
          <input class="password-input" type="password" v-model.trim="$v.password1.$model" placeholder="Password"/>
          <span class="error" v-if="!$v.password1.required"> Password is required.</span>
        </div>
        <div :class="{ 'form-group--error': $v.password2.$error, 'form-group--loading': $v.password2.$pending }">
          <label for="password">Confirm your password: </label>
          <input class="password-input-confirm" type="password" v-model.trim="$v.password2.$model" placeholder="Password"/>
          <span class="error" v-if="!$v.password2.required"> Password is required.</span>
        </div>           

        <div class="error" v-if="error_password">Your password are not the same</div>

        <div class="button-container">
          <button class="button-sign-up" v-on:click="signup()">Sign Up</button>
          <div class="text-sing-in">Already registered 
            <router-link :to="{name: 'login'}">sign in?</router-link>
          </div>
        </div>

      </div>

    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { required } from 'vuelidate/lib/validators';

export default {
    data() {
        return {
      errors:[],
      username:'',
      password1:'',
      password2:'',
      //email:'',
      error_password : false
        }
    },
  validations: {
    username: {
      required
    },
    password1: {
      required
    },
    password2: {
      required
    }/*,
    email: {
      required
    }*/
  },
    methods : {
    signup:function() {
      if(this.username && this.password1 && this.password2/* && this.email*/){
          if(this.password1 === this.password2){
              this.error_password = false;
              let request_body = {
                username : this.username,
                password : this.password1,
                //email : this.email
              }
              axios.post(`api/new_user`,request_body).then(response => {
                if(response.data === 'username already taken'){
                    this.$bvModal.msgBoxOk(response.data);
                }else{
                    this.$emit("authenticated", true);
                    this.$store.commit('UpdateActiveUser', response.data);
                    this.$router.push({ name: "home" });
                }
              }).catch(error => console.log(error));
          }else{
            this.error_password = true;
          }
      }
    }
    }
}
</script>

<style scoped>
    .signup {
        width: 650px;
        background-color: #1d2636;
        margin: auto;
        margin-top: 100px;
        padding: 20px;
        border-radius: 16px;
    }
    .title {
      text-align: center;
      margin-bottom: 30px;
    }
    .flex-container {
      display: flex;
      flex-direction: column;
    }
    .username-input {
      margin-left: 128px;
    }
    .email-input {
      margin-left: 98px;
    }
    .password-input {
      margin-left: 132px;
    }
    .password-input-confirm {
      margin-left: 30px;
    }
    .button-container {
      align-self: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 300px;
      height: 75px;
    }
    .button-sign-up, .text-sing-in {
      margin: auto;
    }
    .error {
      color: red;
    }

    /*mobile*/
    @media screen and (max-width: 650px){
      .signup {
          width: 80%;
      }
      .flex-container div {
        display: flex;
        flex-direction: column;
      }
      .username-input,.email-input,.password-input,.password-input-confirm {
        margin-left: 0px;
      }
      input {
        width: 100%;
      }
    }
</style>