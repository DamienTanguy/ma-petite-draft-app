import axios from 'axios';
//import vm from './main.js';
//import VueSocketIOExt from 'vue-socket.io-extended';
//import io from 'socket.io-client'

//UserLineUp component
const getGameList = function(context) {
  if(context.state.user.id){
    let request_body = {
        user_id : context.state.user.id
    }
    axios.post(`api/game_list_of_user`,request_body).then(response => {
      context.commit('UpdateGameList',response.data);
    }).catch(error => console.log(error));
  }
};

//DraftTable component
const addPick = function(context) {
    //console.log('actions - ADD PICK');
    let request_body = {
      game_id : context.state.selectedGame.id,
      player_id : context.state.pickedPlayer.id,
      user_id : context.state.user.id
    }
    axios.post(`api/add_picked_player`,request_body).then(response => {
      console.log(response.data);
      //message for the player
      /*var message = '';
      message += context.state.PickedPlayer.name; 
      message += '('+ context.state.PickedPlayer.position.name + ' - ' + context.state.PickedPlayer.club.name +')'
      message += ' has been added';
      this.$bvModal.msgBoxOk(message);*/


      //Building of the message to display to the other players
      let object_to_emit = {};
      object_to_emit = {
        message : context.state.pickedPlayer.name + ' has been selected by '+context.state.user.username,
        game_id : context.state.selectedGame.id
      }
      //console.log('********VueSocketIOExt')
      //console.log(VueSocketIOExt)
      //vm.$socket.emit('player_added',object_to_emit);
      this._vm.$socket.emit('player_added',object_to_emit);
      
      //this.$bvModal.msgBoxOk('response.data');
      
      this.dispatch('getDraftList'); //to update the player available in the draft 
      this.dispatch('getUserListInGame'); //to update the user information in the game in the UserLineUp component
      context.commit('UpdateUserListInGame',context.state.userListInGame);
      this.dispatch('getPickedTeamByUser'); //to update the team picked of the user
    }).catch(error => console.log(error));
};

const getDraftList = function(context){
  if(context.state.selectedGame.id){
    //console.log('actions - GET DRAFT LIST');
    let request_body = {
      game_id : context.state.selectedGame.id,
      user_id : context.state.user.id //to check the number of player ofr each position in the request
    }
    axios.post(`api/player_list_left_for_draft`,request_body).then(response => {
      context.commit('UpdateDraftList',response.data);
    }).catch(error => console.log(error));
  }
};

//DraftPick component
const getUserListInGame = function(context) {
  //console.log('actions - GET USER GAME LIST');
  if(context.state.selectedGame.id){
    let game_id = context.state.selectedGame.id;
    axios.post(`api/user_in_game`,{game_id}).then(response => {
      context.commit('UpdateUserListInGame',response.data);
    }).catch(error => console.log(error));
  }
};

const getPickedTeamByUser = function(context) {
  //console.log('actions - GET PICKED TEAM BY USER');
  if(context.state.selectedGame.id){
    let request_body = {};
    if(context.state.selectedUser.id){
      request_body = {
        game_id : context.state.selectedGame.id,
        user_id : context.state.selectedUser.id
      }
    }else{
      request_body = {
        game_id : context.state.selectedGame.id,
        user_id : context.state.user.id
      }
    }
    axios.post(`api/picked_player_in_game_by_a_user`,request_body).then(response => {
      context.commit('UpdatePickTeam',response.data);
    }).catch(error => console.log(error));
  }
};

//GameManagement component
const getOpponentList = function(context) {
  let user_id = context.state.user.id;
  axios.post(`api/opponent_list_new_game`,{user_id}).then(response => {
    context.commit('UpdateOpponentList',response.data);
  }).catch(error => console.log(error));
};

export default {
  getGameList,
  addPick,
  getDraftList,
  getUserListInGame,
  getPickedTeamByUser,
  getOpponentList
};
