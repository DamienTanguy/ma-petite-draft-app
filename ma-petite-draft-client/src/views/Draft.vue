<template>
  <div class="flex-container">
    <div class="column1">
        <UserLineUp class="user-line-up" />
        <DraftTable class="draft-table" />
    </div>
    <div class="column2">
        <DraftPick class="draft-pick" />
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import UserLineUp from '@/components/UserLineUp.vue'
import DraftTable from '@/components/DraftTable.vue'
import DraftPick from '@/components/DraftPick.vue'
//import { mapState,mapGetters,mapActions } from 'vuex'

export default {
  name: 'Draft',
  components: {
    DraftTable,
    DraftPick,
    UserLineUp
  },  
  created() {
    //listen if a player has been added --> display message and update of the component only if the game is selected 
    this.$socket.on('player_added_message', (data) => {
      if(this.$store.state.selectedGame.id === data.game_id){
        this.$bvModal.msgBoxOk(data.message);
        //update component UserLineUp + update component DraftPick + update component DraftTable
        this.$store.commit('UpdateSelectedGame', this.$store.state.selectedGame);
      }
    });
  }
}
</script>

<style scoped lang="scss">

  .flex-container {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    margin-right: 5px;
    margin-left: 5px;
    margin-top: 5px;
  }

  .column1 {
    width: 70%;
    flex-grow: 1;
    margin-right: 5px;
  } 

  .column2 {
    width: 30%;
    flex-grow: 1;
    margin-left: 5px;
  }


  .flex-container {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    margin-right: 5px;
    margin-left: 5px;
    margin-top: 5px;
  }

  @media (max-width: 700px) {

    .flex-container {
      display: block;
    }

    .column1, .column2 {
      width: 100%;
    }
    .column2 {
      margin-top: 10px;
    }
  }

</style>