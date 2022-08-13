<template>
  <div id="app">
    <!--<NavBar />-->
    <div class="header">
        <label class="title"><span>Ma Petite Draft</span></label>
        <label class="short-title"><span>MPD</span></label>
        <label class="subtitle"><span>{{ sub_header }}</span></label>
        <!--<h3 class="header-tittle">Ma Petite Draft</h3><h5>{{ sub_header }}</h5>-->
      <input class="menu-btn" type="checkbox" id="menu-btn"> <!-- link with the for attribute of the label, to be able to check the checkbox by clicking on the label -->
      <label class="menu-icon" for="menu-btn"><span class="nav-icon"></span></label>
      <ul class="menu">
        <li><router-link to="/home">Home </router-link></li>
        <li v-if="!authenticated"><router-link to="/login">Login</router-link></li>
        <li v-if="!authenticated"><router-link to="/signup">Sign up</router-link></li>
        <li v-if="authenticated"><router-link to="/draft">Draft</router-link></li>
        <!--<router-link v-if="authenticated" to="/wish">Wish</router-link>-->
        <li v-if="authenticated"><router-link to="/draft_management">Draft Management</router-link></li>
        <li v-if="authenticated"><router-link v-on:click.native="logout()" to="/home">Logout </router-link></li>
        <!--<span v-show="$route.name==='home'" class="user_number">Connected Users: {{ connectedUserNumber }}</span>-->
      </ul>
    </div>
    
    <div id="body">
        <router-view @authenticated="setAuthenticated" />    
    </div>
    <div id="footer" v-show="$route.name==='home'">
        <span>Connected Users: {{ connectedUserNumber }}</span>
    </div>
  </div>
</template>

<script>
//import NavBar from '@/components/NavBar.vue';

export default {
    name: 'App',
    /*components: {
        NavBar
    },*/
    data() {
        return {
            authenticated: false,
            sub_header: '- Home',
            user: {},
            connectedUserNumber: 0
        }
    },
    mounted() {
        if(!this.authenticated) {
            this.$router.push({ name: "home" }).catch(error => console.log(error));
        }
        this.$socket.on('nb_total_user', (data) => {
            console.log('nb_total_user event');
            this.connectedUserNumber = data;
        })
    },
    methods: {
        setAuthenticated(status) {
            this.authenticated = status;
            this.user = this.$store.state.user;
        },
        logout() {
            this.authenticated = false;
            this.$store.commit('UpdateActiveUser', {});
        }
    },
    watch: {
      '$route' (to) {
        this.sub_header = to.meta.title || ''
      }
    }
}
</script>

<style>

.title {
    padding: 10px 10px;
    float: left;
    font-size: 20px;
    margin-bottom: 0;
}
.short-title {
    display: none;
    margin-bottom: 0;
  }
.subtitle {
    padding: 15px 0;
    float: left;
    font-size: 15px;
    margin-bottom: 0;
}
#app {
    display: flex;
    flex-direction: column;
}
/*#nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    width: 100%;
    overflow: hidden;
}*/
#footer {
    margin: auto;
    text-align: center;
    font-size: 14px;
}

/* FIREFOX FIX OF UGLY SELECT BOXES */
/*https://github.com/twbs/bootstrap/issues/16201*/
@supports (-moz-appearance:none) {

  select {
      -moz-appearance:none !important;
      background: #070d17 url('data:image/gif;base64,R0lGODlhBgAGAKEDAFVVVX9/f9TU1CgmNyH5BAEKAAMALAAAAAAGAAYAAAIODA4hCDKWxlhNvmCnGwUAOw==') right center no-repeat !important;
      background-position: calc(100% - 5px) center !important;
  }

}

/*CSS mobile-to-desktop*/ 
/*https://www.youtube.com/watch?v=sjrp1FEHnyA*/

.header {
    /*position: fixed;
    display: block;*/
    width: 100%;
    height: 50px;
    z-index:3;
    border-bottom: 1px solid #11ece55e;
}

.header ul {
  margin:0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  float: left;
}

.header ul a{
  display: block;
  text-align: center;
}

.header ul a:hover  {
  background-color: #11ece55e;
}

.header .header-tittle {
  float: left;
  display: block;
  padding: 4px 5px;
}

.header .menu { /*initially close but when we click, the menu opening*/
  clear: both;
  max-height: 0;
  transition: max-height .2s ease-out;
  /*border-top: 1px solid #11ece55e;*/
}
.menu-icon {
  margin-bottom: 0;
}

/*Checkbox management*/
.header .menu-icon {
  padding: 19px 10px;
  position: relative; /*parent container of the span element --> relative position to use the position absolute for the child element*/
  float: right;
  cursor: pointer;
}

/*the 1st bar element description*/
.header .menu-icon .nav-icon{
  background: #11ece55e;
  display: block;
  height: 2px;
  width: 18px;
  position: relative;
  transition: background .2s ease-out;
}

/*the original bar element description*/
.header .menu-icon .nav-icon:before{
  background: #11ece55e;
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 5px;
}

/*the below bar element description*/
.header .menu-icon .nav-icon:before{
  background: #11ece55e;
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  transition: all .2s ease-out;
  top: 5px;
}

/*the above bar element description*/
.header .menu-icon .nav-icon:after{
  background: #11ece55e;
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  transition: all .2s ease-out;
  top: -5px;
}

.header .menu-btn {
  display: none;
}

.header .menu-btn:checked ~ .menu {  /*~ .menu --> look for the next element with the class menu --> Affect the height of the UL element*/
  max-height: 240px; /*initialisation from the .navbar .menu element with transition: max-height .2s ease-out;*/
  background-color: #213a43;
  width: 100%;
}

/*Cross barre description*/
.header .menu-btn:checked ~ .menu-icon .nav-icon{
  background:transparent;
}

.header .menu-btn:checked ~ .menu-icon .nav-icon:before{
  transform: rotate(-45deg);
  top: 0px;
}

.header .menu-btn:checked ~ .menu-icon .nav-icon:after{
  transform: rotate(45deg);
  top: 0px;
}

@media (min-width: 870px) {

  .header li{
    float: left;
  }

  .header li a {
    padding: 12px 20px;
  }
  .header .menu {
    clear: none;
    float: right;
    max-height: none;
    border-top:none;
  }
  .header .menu-icon {
    display: none;
  }

}

@media (max-width: 360px) {

  .title{
    display: none;
  }
  .short-title {
    display: block;
    float: left;
    padding: 15px 5px;
  }

}
</style>
