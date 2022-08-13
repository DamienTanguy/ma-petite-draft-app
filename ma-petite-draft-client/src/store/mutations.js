//Login
const UpdateActiveUser = function(state,payload){
  state.user.id = payload.id;
  state.user.username = payload.username;
};

//UserLineUp component
const UpdateSelectedGame = function(state,payload){
  //if(Object.keys(payload).length !== 0){
  state.selectedGame = payload;
  //}
  //state.selectedUser = state.user; //to display automatically the team picked of the user
  /*this.dispatch('getUserListInGame');
  this.dispatch('getPickedTeamByUser');
  this.dispatch('getDraftList');*/
};

const UpdateGameList = function(state,payload){
  //console.log('Mutation - UpdateGameList');
  state.gameList = payload;
};

//DraftTable component
const UpdatePickedPlayer = function(state, payload) {
  //console.log('Mutation - UpdatePickedPlayer');
  state.pickedPlayer = payload;
};

const UpdateDraftList = function(state, payload){
  //console.log('Mutation - UpdateDraftList');
  state.draftList = payload;
};

const SortDraftList = function(state, payload){
  //console.log('Mutation - SortDraftList');
  //https://www.raymondcamden.com/2018/02/08/building-table-sorting-and-pagination-in-vuejs
  const draftList = this.state.draftList;
  draftList.sort((a, b) => {  
    let modifier = 1;
      if(payload.sortDir === 'desc') modifier = -1;
      if(a[payload.sortKey] < b[payload.sortKey]) return -1 * modifier;
      if(a[payload.sortKey] > b[payload.sortKey]) return 1 * modifier;
      return 0;
  });
  state.draftList = draftList;
};


//DraftPick component
const UpdateUserListInGame = function(state, payload) {
  //console.log('Mutation - UpdateUserListInGame');
  state.userListInGame = payload;
};

const UpdatePickTeam = function(state, payload){
  //console.log('Mutation - UpdatePickTeam');
  state.pickTeam = payload;
};

const UpdateSelectedUser = function(state, payload){
  //console.log('Mutation - UpdateSelectedUser');
  state.selectedUser = payload;
  //Update of the pick team of the selected user
  //this.dispatch('getPickedTeamByUser');
};

//GameManagement component
const UpdateOpponentList = function(state, payload){
  state.opponentList = payload;
};

const UpdateSelectedOpponentList = function(state,payload){
  state.selectedOpponentList = payload;
};

export default {
  UpdateActiveUser,
  //setSocket,
  UpdateSelectedGame,
  UpdateGameList,
  UpdatePickedPlayer,
  UpdateDraftList,
  SortDraftList,
  UpdateUserListInGame,
  UpdatePickTeam,
  UpdateSelectedUser,
  UpdateOpponentList,
  UpdateSelectedOpponentList
};
