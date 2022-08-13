<template>
    <div id="login">
        <h1 class="title">Login</h1>
        <form>
          <div class="flex-container">
              <input type="text" autocomplete="username" v-model="input.username" placeholder="Username" />
              <input type="password" autocomplete="current-password" v-model="input.password" placeholder="Password" />
              <button type="button" v-on:click="login()">Login</button>
              <p class="error" v-if="missing_credential">A username and password must be present</p>
              <p class="error" v-if="error_credential">Error Identification: Your Username and Password are not correct</p>
          </div>
          <!--<p>
              <router-link to="/forgot-password">Forgot password ?</router-link>
          </p>-->
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    data() {
        return {
            input: {
                username: "",
                password: ""
            },
            missing_credential : false,
            error_credential : false
        }
    },
    methods: {
        login() {
            if(this.input.username != "" && this.input.password != "") {
              let request_body = {
                username : this.input.username,
                password : this.input.password
              }
              //axios.post(`http://localhost:${process.env.VUE_APP_SOCKET_PORT}/api/connexion`,request_body).then(response => {
              axios.post(`api/connexion`,request_body).then(response => {
                //if connexion successfull
                if(response.data.length !== 0){
                  this.$store.commit('UpdateActiveUser', response.data[0]);
                  this.$emit("authenticated", true);
                  //this.$router.replace({ name: "home" });
                  this.$router.push({ name: "home" });
                }else{
                  this.error_credential = true;
                  this.missing_credential = false;
                }

              }).catch(error => console.log(error));

            } else {
                this.missing_credential = true;
                this.error_credential = false;
            }
        }
    }
}
</script>

<style scoped>
    #login {
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
      justify-content: center;
      align-items: center;
      /*align-items: flex-start;
      margin-right: 5px;
      margin-left: 5px;*/
    }
    input {
      width: 400px;
      margin-bottom: 10px;
    }
    button {
      width: 100px;
    }
    .error {
      color: red;
    }

    /*mobile*/
    @media screen and (max-width: 650px){
      #login {
          width: 80%;
      }
      input {
        width: 70%;
      }
    }
</style>
