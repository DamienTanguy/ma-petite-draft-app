<template>
  <div id="home">
    <div id="logo">
      <img src="@/assets/logo.png" alt="MPD logo">
    </div>
    <div id="text">
      <div>Welcome {{ user.username }} to Ma Petit Draft</div>
      <div>You play to Mon Petit Gazon and you are bored by the traditionnal bid ?</div>
      <div>You miss the draft system of the ULTRA mode ?</div>
      <div>This application is made for you !</div>
      <div>Last Update of the Players: 16/10/2020</div>
      <div>Already : {{ nb_draft }} Draft started / {{ nb_user }} users</div>
      <div>Version 1.2 - released the 10/01/2021</div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: 'HomeComponent',
  data(){
    return {
      nb_draft:0,
      nb_user:0,
      user: this.$store.state.user
    }
  },
  mounted() {
    axios.get(`api/nb_draft`).then(response => {
        this.nb_draft = response.data.nb_draft;
    }).catch(error => console.log(error));

    axios.get(`api/nb_user`).then(response => {
        this.nb_user = response.data.nb_user;
    }).catch(error => console.log(error));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  /*#home{*/
  #text {
    /*width: 100%;
    text-align: center;
    margin-top: 20px;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    height: 40vh;/*55vh;*/
    background-color: #1d2636;
    margin: auto;
    margin-top: 100px;
    border-radius: 16px;
  }
  /*#home div {*/
  #text {
    margin: auto;
    text-align: center;
  }
  #logo {
    text-align: center;
  }
  #logo img{
    width: 162px;
    height: 198px;
  }
  h3 {
    margin: 40px 0 0;
  }
  a {
    color: #42b983;
  }

</style>
