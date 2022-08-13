<template>
  <div class="draftpick-panel">
    <div>
        <table class="marginB2">
          <thead>
            <tr>
              <td class="normal">Select a User:</td>
            </tr>
          </thead>
            <tbody>
              <tr>
                <td>
                    <select v-model="selectedUserModel">
                        <option v-for="(user,id) in userListInGame" :key="id" :value="user">{{ user.username }}</option>
                    </select>
                </td>
              </tr>
              <tr>
                <td v-if="selectedUserModel.id === $store.state.user.id && $store.state.userListInGame.length !== 0">
                  Your Team:
                </td>
              </tr>
            </tbody>
          </table>
          <table>
						<thead>
							<tr class="title-row">
								<td class="title-position">GoalKeeper</td>
                <td class="title-number">{{ GoalKeeper.length }}/2</td>
							</tr>
						</thead>
						<tbody>
              <tr v-for="(pick,id) in pickTeam" :key="id">
                  <td class="player" v-if="pick.player.position.id === 1">{{ pick.player.name }}</td>
                  <td class="club" v-if="pick.player.position.id === 1">{{ pick.player.club.name }}</td>
              <tr/>
						</tbody>
					</table>
          <table>
						<thead>
							<tr class="title-row">
								<td class="title-position">Defender</td>
                <td class="title-number">{{ Defender.length }}/6</td>
							</tr>
						</thead>
						<tbody>
            <tr v-for="(pick,id) in pickTeam" :key="id">
                <td class="player" v-if="pick.player.position.id === 2 || pick.player.position.id === 3">{{ pick.player.name }}</td>
                <td class="club" v-if="pick.player.position.id === 2 || pick.player.position.id === 3">{{ pick.player.club.name }}</td>
            <tr/>
						</tbody>
					</table>
          <table>
						<thead>
							<tr class="title-row">
								<td class="title-position">Midfielder</td>
                <td class="title-number">{{ Midfielder.length }}/6</td>
							</tr>
						</thead>
						<tbody>
              <tr v-for="(pick,id) in pickTeam" :key="id">
                  <td class="player" v-if="pick.player.position.id === 4 || pick.player.position.id === 5">{{ pick.player.name }}</td>
                  <td class="club" v-if="pick.player.position.id === 4 || pick.player.position.id === 5">{{ pick.player.club.name }}</td>
              <tr/>
						</tbody>
					</table>
          <table class="marginB1">
						<thead>
							<tr class="title-row">
								<td class="title-position">Forward</td>
                <td class="title-number">{{ Forward.length }}/4</td>
							</tr>
						</thead>
						<tbody>
              <tr v-for="(pick,id) in pickTeam" :key="id">
                  <td class="player" v-if="pick.player.position.id === 6">{{ pick.player.name }}</td>
                  <td class="club" v-if="pick.player.position.id === 6">{{ pick.player.club.name }}</td>
              <tr/>
						</tbody>
					</table>
			</div>
  </div>
</template>

<script>

//import axios from 'axios';

export default {
  name: 'DraftPick',
  mounted: function (){
     this.$store.commit('UpdatePickTeam', []);
     //this.$store.commit('UpdateSelectedUser', this.$store.state.user);
  },
  /*updated: function (){
    this.selectedUserModel = this.$store.state.selectedUser;
  },*/
  data() {
    return {
      selectedUserModel: {/*id:this.$store.state.user.id*/}
    }
  },
  computed : {
    selectedUser: {
      get() {
        return this.$store.state.selectedUser
      },
      set(value) {
        this.$store.commit('UpdateSelectedUser', value)
      }
    },
    pickTeam: {
      get() {
        return this.$store.state.pickTeam
      }
    },
    userListInGame: {
      get() {
        return this.$store.state.userListInGame
      }
    },
    GoalKeeper : function() {
      return this.$store.state.pickTeam.filter(value => value.player.position.id === 1)
    },
    Defender : function() {
      return this.$store.state.pickTeam.filter(value => value.player.position.id === 2 || value.player.position.id === 3)
    },
    Midfielder : function() {
      return this.$store.state.pickTeam.filter(value => value.player.position.id === 4 || value.player.position.id === 5)
    },
    Forward : function() {
      return this.$store.state.pickTeam.filter(value => value.player.position.id === 6)
    }
  },
  watch : {
    selectedUserModel : function () {
      this.$store.commit('UpdateSelectedUser',this.selectedUserModel);
      this.$store.dispatch('getPickedTeamByUser',this.$store.state.selectedUser);
    },
    userListInGame : function () {
      if(this.$store.state.userListInGame.length !== 0){ // if a game or another game has been selected 
          this.selectedUserModel.id = this.$store.state.user.id;
      }
    }
  }
}
</script>

<style scoped lang="scss">

  .draftpick-panel {
    /*position:absolute;
    right:10px;
    width:43%;
    top: 40px;*/
    height: 560px;/*90vh;*/
    background-color: #1d2636;
    border-radius: 16px;
    font-size: 13px;
    margin-right: 5px;
  }
  .title-position {
    width: 70%;
    text-align: left;
    padding-left: 25%;
  }
  .title-number, .club {
    text-align: left;
    width: 30%;
  }
  .player {
    text-align: left;
    padding-left: 4%;
  }
  .normal {
    font-size: 1rem;
  }
  .title-row {
    background-color: #336a68;
    font-weight: bold;
    font-size: 1rem;
  }
  .marginB1 {
    margin-bottom: 15px;
  }
  .marginB2 {
    margin-bottom: 5px;
  }
  select {
    margin-bottom: 1px;
  }

</style>
