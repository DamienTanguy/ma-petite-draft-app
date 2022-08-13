import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'

import state from './state';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state,
  actions,
  mutations
});



/*import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  //strict: true,
  state: { //as the  data  property
    user: {},
    //UserLineUp component
    GameList : [],
    selectedGame : {},
    //DraftTable component
    PickedPlayer : {},
    DraftList : [],
    //DraftPick componenT
    UserGameList: [],
    PickTeam : [],
    selectedUser : {},
    //GameManagement component
    OpponentList: [],
    selectedOpponentList: {}
  },
  getters: { //as the  computed property - to return a modified value of state data
  },
  mutations: { //update/modify state - mutations must be synchronous
    //Login
    UpdateActiveUser(state,payload){
      state.user.id = payload.id;
      state.user.username = payload.username;
    },
    //UserLineUp component
    UpdateSelectedGame(state,payload){
      //if(Object.keys(payload).length !== 0){
      state.selectedGame = payload;
      //}
      state.selectedUser = state.user; //to display automatically the team picked of the user
      this.dispatch('getUserGameList');
      this.dispatch('getPickedTeamByUser');
      this.dispatch('getDraftList');
    },
    UpdateGameList(state,payload){
      //console.log('Mutation - UpdateGameList');
      state.GameList = payload;
    },
    //DraftTable component
    UpdatePickedPlayer(state, payload) {
      //console.log('Mutation - UpdatePickedPlayer');
      state.PickedPlayer = payload;
    },
    UpdateDraftList(state, payload){
      //console.log('Mutation - UpdateDraftList');
      state.DraftList = payload;
    },
    //DraftPick component
    UpdateUserGameList(state, payload) {
      console.log('Mutation - UpdateUserGameList');
      state.UserGameList = payload;
    },
    UpdatePickTeam(state, payload){
      //console.log('Mutation - UpdatePickTeam');
      state.PickTeam = payload;
    },
    UpdateSelectedUser(state, payload){
      //console.log('Mutation - UpdateSelectedUser');
      state.selectedUser = payload;
      //Update of the pick team of the selected user
      this.dispatch('getPickedTeamByUser');
    },
    //GameManagement component
    UpdateOpponentList(state, payload){
      state.OpponentList = payload;
    },
    UpdateSelectedOpponentList(state,payload){
      state.selectedOpponentList = payload;
    },
  },
  actions: { //as method property - asynchronous
    //UserLineUp component
    getGameList(context) {
      var request_body = {
          user_id : context.state.user.id
      }
      axios.post('http://localhost:4000/api/game_list_of_user',request_body).then(response => {
        context.commit('UpdateGameList',response.data);
      }).catch(error => console.log(error));
    },
    //DraftTable component
    addPick(context) {
        //console.log('actions - ADD PICK');
        var request_body = {
          game_id : context.state.selectedGame.id,
          player_id : context.state.PickedPlayer.id,
          user_id : context.state.user.id
        }
        //var picked_player_to_add = context.state.PickedPlayer.id;
        axios.post('http://localhost:4000/api/add_picked_player',request_body).then(response => {
          console.log(response.data);

          //this.$bvModal.msgBoxOk('response.data');
          
          this.dispatch('getDraftList'); //to update the player available in the draft 
          //to update the user information in the game in the UserLineUp component
          this.dispatch('getUserGameList');
          context.commit('UpdateUserGameList',context.state.UserGameList);
          this.dispatch('getPickedTeamByUser'); //to update the team picked of the user
        }).catch(error => console.log(error));
    },
    getDraftList(context){
      if(context.state.selectedGame.id){
        //console.log('actions - GET DRAFT LIST');
        var request_body = {
          game_id : context.state.selectedGame.id,
          user_id : context.state.user.id //to check the number of player ofr each position in the request
        }
        axios.post('http://localhost:4000/api/player_list_left_for_draft',request_body).then(response => {
          context.commit('UpdateDraftList',response.data);
        }).catch(error => console.log(error));
      }
    },
    //DraftPick component
    getUserGameList(context) {
      //console.log('actions - GET USER GAME LIST');
      if(context.state.selectedGame.id){
        var game_id = context.state.selectedGame.id;
        axios.post('http://localhost:4000/api/user_in_game',{game_id}).then(response => {
          context.commit('UpdateUserGameList',response.data);
        }).catch(error => console.log(error));
      }
    },
    getPickedTeamByUser(context) {
      //console.log('actions - GET PICKED TEAM BY USER');
      if(context.state.selectedGame.id){
        var request_body = {};
        if(context.state.selectedUser.id){
          request_body = {
            game_id : context.state.selectedGame.id,
            user_id : context.state.selectedUser.id
          }
        }else{
          request_body = {
            game_id : context.state.selectedGame.id,
            user_id : context.state.user_id
          }
        }
        axios.post('http://localhost:4000/api/picked_player_in_game',request_body).then(response => {
          context.commit('UpdatePickTeam',response.data);
        }).catch(error => console.log(error));
      }
    },
    //GameManagement component
    getOpponentList(context) {
      var user_id = context.state.user.id;
      axios.post('http://localhost:4000/api/opponent_list_new_game',{user_id}).then(response => {
        context.commit('UpdateOpponentList',response.data);
      }).catch(error => console.log(error));
    }
  },
  modules: {
  }
})*/
