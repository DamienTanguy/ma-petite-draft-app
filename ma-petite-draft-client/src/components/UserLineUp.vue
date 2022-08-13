<template>
  <div class="user-line-up">
      <div class="header-user-line-up">
        <div> Select a Draft: <!--{{ selectedGame }} selected--></div>
        <!--<select v-model="selectedGame">
          <option v-for="(game, id) in GameList" :key="id" :value="game">{{ game.name }}</option>
        </select>-->
        <select v-model="SelectedGameModel">
          <option v-for="(game, id) in gameList" :key="id" v-bind:value="game.id">{{ game.name }}</option>
        </select>
      </div>
      <div v-if="Object.keys(selectedGame).length !== 0">
        <table>
          <tr class="user-line-up-table-row">
            <td v-for="(user, id) in userListInGame" :key="id">
              {{ user.username }}
              <div v-if="user.user_games[0].turn_to_pick" class="pick_flag">
                  <div> pick a player </div>
                  <div v-if="Object.keys(userListInGame).length !== 2" class="maginL1"> <!-- only display the arrow if there are more than 2 players-->
                    <span v-if="user.user_games[0].way_id === 1"> <b-icon icon="arrow-right-circle"></b-icon> </span> 
                    <span v-else> <b-icon icon="arrow-left-circle"></b-icon> </span>
                  </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
  </div>
</template>


<script>
export default {
  name: 'UserLineUp',
  /*created() {
    this.$socket.on('player_added_message', (data) => {
      this.$bvModal.msgBoxOk(data);
    });
  },*/
  mounted: function (){
    this.$store.dispatch('getGameList');
    this.$store.commit('UpdateUserListInGame', []);
    this.$store.commit('UpdateSelectedGame', this.$store.state.selectedGame);
    this.$store.commit('UpdateSelectedUser', this.$store.state.user);
    this.$store.dispatch('getUserListInGame');
    this.$store.dispatch('getPickedTeamByUser');
    this.$store.dispatch('getDraftList');
  },
  destroyed: function(){
    this.$store.commit('UpdateSelectedGame', {});
  },
  data(){
    return {
      SelectedGameModel: this.$store.state.selectedGame.id //after creating a game, I want to initiaze the model with the store
    }
  },
  computed: {
    selectedGame: {
      get() {
        return this.$store.state.selectedGame
      },
      set(value) {
        this.$store.commit('UpdateSelectedGame', value)
      }
    },
    gameList: {
      get() {
        return this.$store.state.gameList
      }
    },
    userListInGame: {
      get() {
        return this.$store.state.userListInGame
      }
    }
  },
  watch: {
    SelectedGameModel: function () {
      this.$store.commit('UpdateSelectedGame',{id: this.SelectedGameModel});
      this.$store.commit('UpdateSelectedUser', this.$store.state.user);
      this.$store.dispatch('getUserListInGame');
      this.$store.dispatch('getPickedTeamByUser');
      this.$store.dispatch('getDraftList');
    }
  }
}
</script>

<style scoped>

  .user-line-up {
    /*width: 54%;
    position: relative;
    left: 10px;*/
    border-radius: 16px;
    background-color: #1d2636;
  }

  .header-user-line-up {
    text-align: center;
  }

  .user-line-up-table-row {
      display: flex;
      flex-wrap: wrap;
      margin-right: 1px;
      margin-left: 1px;
      margin-top: 10px;
      border: 1px solid #11ece5;
      border-radius: 16px;
    }

  table .user-line-up-table-row td:hover {
    background-color: rgba(255,255,255,0.1);
  }

  /*.rows > td:first-child {
    border-radius: 10px 10px 10px 16px;
  }*/

  /*table td:first-child {
    padding: 6px;
    border: 1px solid #11ece5;
    border-radius: 16px 16px 16px 16px;
  }*/

  @media (max-width: 420px) {

  .user-line-up-table-row {
    display: flex;
    flex-direction: column;
  }

  .user-line-up-table-row > td{
    display: flex;
    flex-direction: row;
  }
  .pick_flag {
    display: flex;
    flex-direction: row;
    margin-left: 20px;
  }
  .maginL1 {
    margin-left: 20px;
  }

  }

</style>
