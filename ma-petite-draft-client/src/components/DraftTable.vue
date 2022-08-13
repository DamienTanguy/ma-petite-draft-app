<template>
  <div class="draft-panel">
    <SearchBox @position-to-emit="SetPosition" @club-to-emit="SetClub"/>
    <!--<div> Data came from the search box: Pos: {{ selectedPosition }}, Club: {{ selectedClub }}, Wish: {{ selectedWish }}</div>-->
    <input type="text" placeholder="Search a player" v-model="filter" />
    <div class="draft-container">
          <table class="draft-table">
						<thead>
							<tr>
                <th></th>
                <th @click="sort('name');">Name 
                  <b-icon v-if="currentSort === 'name' && currentSortDir === 'asc'" icon="caret-down-fill"></b-icon>
                  <b-icon v-else-if="currentSort === 'name' && currentSortDir === 'desc'" icon="caret-up-fill"></b-icon>
                </th>
								<th @click="sort('position_id');">Position
                  <b-icon v-if="currentSort === 'position_id' && currentSortDir === 'asc'" icon="caret-down-fill"></b-icon>
                  <b-icon v-else-if="currentSort === 'position_id' && currentSortDir === 'desc'" icon="caret-up-fill"></b-icon>
                </th>
								<th @click="sort('club_id');">Club
                  <b-icon v-if="currentSort === 'club_id' && currentSortDir === 'asc'" icon="caret-down-fill"></b-icon>
                  <b-icon v-else-if="currentSort === 'club_id' && currentSortDir === 'desc'" icon="caret-up-fill"></b-icon>
                </th>
								<th @click="sort('rate');">Note
                  <b-icon v-if="currentSort === 'rate' && currentSortDir === 'asc'" icon="caret-down-fill"></b-icon>
                  <b-icon v-else-if="currentSort === 'rate' && currentSortDir === 'desc'" icon="caret-up-fill"></b-icon>
                </th>
								<th @click="sort('goal');">Buts
                  <b-icon v-if="currentSort === 'goal' && currentSortDir === 'asc'" icon="caret-down-fill"></b-icon>
                  <b-icon v-else-if="currentSort === 'goal' && currentSortDir === 'desc'" icon="caret-up-fill"></b-icon>
                </th>
								<th @click="sort('price');">Cote 
                  <b-icon v-if="currentSort === 'price' && currentSortDir === 'asc'" icon="caret-down-fill"></b-icon>
                  <b-icon v-else-if="currentSort === 'price' && currentSortDir === 'desc'" icon="caret-up-fill"></b-icon>
                </th>
								<th @click="sort('start_line_up');">Titu
                  <b-icon v-if="currentSort === 'start_line_up' && currentSortDir === 'asc'" icon="caret-down-fill"></b-icon>
                  <b-icon v-else-if="currentSort === 'start_line_up' && currentSortDir === 'desc'" icon="caret-up-fill"></b-icon>
                </th>
							</tr>
						</thead>
						<tbody>
							<tr v-show="filteredDraftList.length !== 0" v-for="(pick, id) in filteredDraftList" :key="id">
                <td><input type="radio" :id="pick.id" :value="pick" v-model="pickedPlayer"></td>
                <td>{{ pick.name }}</td>
								<td>{{ pick.position.name }}</td>
								<td>{{ pick.club.name }}</td>
								<td>{{ pick.rate }}</td>
								<td>{{ pick.goal }}</td>
								<td>{{ pick.price }}</td>
								<td>{{ pick.start_line_up }}</td>
							</tr>
              <tr v-show="filteredDraftList.length === 0"> <!--v-else/v--else-if doesn't work-->
                <td colspan="8">There is no player</td>
              </tr>
						</tbody>
					</table>
		</div>
    <button class="validation-button" v-if="turnToPickFlag" v-on:click="addPlayerModal();addPick();">Pick this player</button>
  </div>
</template>

<script>

import SearchBox from '@/components/SearchBox.vue';
//import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'DraftTable',
  components: {
    SearchBox
  },
  mounted: function (){
     this.$store.dispatch('getGameList');
     this.$store.commit('UpdateGameList', []);
     //this.getPlayerList();
     //this.$bvModal.msgBoxOk(this.message);
  },
  destroyed: function (){
    this.$store.commit('UpdatePickedPlayer', {});
    this.$store.commit('UpdateDraftList', []);
  },
  data(){
    return {
      //Parameter from the search box - child component
      selectedPosition: '',
      selectedClub: '',
      //selectedWish: '',
      //message box
      message: '',
      //help tool for the user
      filter:'',
      currentSort: 'price',
      currentSortDir: 'asc'
    }
  },
  computed: {
    draftList: {
      get() {
        return this.$store.state.draftList
      }
    },
    pickedPlayer: {
      /*https://chunkbytes.com/2019/02/v-model-with-vuex/*/
      //Vuex is a single flow and v-model is a two-way binding in vue.
      get() {
        return this.$store.state.pickedPlayer
      },
      set(value) {
        this.$store.commit('UpdatePickedPlayer', value)
      }
    },
    turnToPickFlag: {
      get(){
        let user_information = this.$store.state.userListInGame.filter(value => value.id === this.$store.state.user.id);
        if(user_information.length !==0){
          if(user_information[0].user_games[0].turn_to_pick === true){
            return true;
          }else{
            return false;
          }
        }else{
          return false;
        }
      }
    },
    filteredDraftList: {
      get() {
        let filteredDraftList = this.draftList;
        if(this.draftList.length !== 0){
          filteredDraftList = this.draftList.filter((pick) => {
            //https://hibbard.eu/filterable-table-vuejs/
            const player_name = pick.name.toString().toLowerCase();
            const searchTerm = this.filter.toLowerCase();
            return (
              player_name.includes(searchTerm) &&
              pick.position.name.includes(this.selectedPosition) &&
              pick.club.name.includes(this.selectedClub)
            )
          })
        }
        return filteredDraftList;
      }
    }
  },
  watch: {
    filteredDraftList: function() {
        //to test this condition
        if(this.$store.state.pickTeam.length === 18){//&& this.DraftList.length === 0 && this.$store.state.selectedGame.id
          this.message = 'You have selected all your players';
          this.$bvModal.msgBoxOk(this.message);
        }
        let filteredDraftList = this.draftList;
          if(this.selectedPosition !== 'All' || this.selectedClub !== 'All'){
            if(this.selectedPosition === 'All'){
              this.selectedPosition = '';
            }
            if(this.selectedClub === 'All'){
              this.selectedClub = '';
            }
            filteredDraftList = this.draftList.filter((pick) => {
              return (
                pick.position.name.includes(this.selectedPosition) &&
                pick.club.name.includes(this.selectedClub)
              )
            })
          }
        return filteredDraftList;
    }
  },
  methods : {
    ...mapActions(['addPick']),
    sort(sortKey){
      //if s == current sort, reverse
      if(sortKey === this.currentSort){
        //this.currentSortDir = this.currentSortDir === 'asc'?'desc':'asc';
        if(this.currentSortDir === 'desc'){
          this.currentSortDir = 'asc';
        }else{
          this.currentSortDir = 'desc';
        }
      }else {
        this.currentSortDir = 'desc';
      }
      this.currentSort = sortKey;
      let payload = { 
        'sortKey': this.currentSort,
        'sortDir': this.currentSortDir
      }
      this.$store.commit('SortDraftList', payload);
    },
    //Payload to update the data property
    SetPosition(payload){
      if(payload.position.name){
        this.selectedPosition = payload.position.name;
      }
    },
    SetClub(payload){
      if(payload.club.name){
        this.selectedClub = payload.club.name;
      }
    },
    addPlayerModal(){
      this.message = this.$store.state.pickedPlayer.name; 
      this.message += '('+ this.$store.state.pickedPlayer.position.name + ' - ' + this.$store.state.pickedPlayer.club.name +')'
      this.message += ' has been added';
      this.$bvModal.msgBoxOk(this.message);
    }
  }
}
</script>

<style scoped lang="scss">

  .draft-panel {
    display: flex;
    flex-direction: column;
    border: none;
    /*position: relative;
    top: 10px;
    left: 10px;
    width:54%;*/
  }

  .draft-table thead{
    border-bottom: 1px solid #11ece5;
  }

  .draft-table th, .draft-table td{
    border-right: 1px solid #11ece52e;
  }

  .draft-container {
    /*position: relative;
    top: 23px;*/
    height: 320px;
    border-radius: 16px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #1d2636;
    margin-top: 20px;
  }
  input {
    margin: -37px 20px 0px;
  }

  table tbody tr:hover td {
    background-color: rgba(255,255,255,0.1);
  }

  .validation-button {
    margin-top: 5px;
  }

  /*scroll bar design*/
   /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #11ece5; 
    border-radius: 10px;
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #11ece5; 
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #336a68; 
  }

  /* FIREFOX FIX OF UGLY SCROLL BAR */
  /*no custom available for ME*/
  @supports (-moz-appearance:none) {

    .draft-container {
      scrollbar-color: #11ece5 #1c2f3e;
      scrollbar-width: thin;
    }

  }

  /*mobile*/
  @media screen and (max-width: 700px){
    
    .draft-panel {
      margin-top: 10px;
      border: 1px solid #11ece5;
      border-radius: 16px;
    }

  }

  @media screen and (max-width: 520px){
    
    table {
      table-layout:fixed;
    }
    table th:nth-child(5), table td:nth-child(5),
    table th:nth-child(6), table td:nth-child(6),
    table th:nth-child(8), table td:nth-child(8) {
      display: none;
    }
    table th:nth-child(2), table td:nth-child(2),
    table th:nth-child(3), table td:nth-child(3),
    table th:nth-child(4), table td:nth-child(4) {
      width: 30%;
    }
    table th:nth-child(7), table td:nth-child(7) {
      width: 7%;
    }
    input[type=radio] {
        border: 0px;
        height: 8px;
    }
  }

  @media screen and (max-width: 420px){
    
    table th:nth-child(7), table td:nth-child(7) {
      display: none;
    }
    table th:nth-child(2), table td:nth-child(2),
    table th:nth-child(3), table td:nth-child(3) {
      width: 40%;
    }
    table th:nth-child(4), table td:nth-child(4) {
      width: 17%;
    }

  }

</style>
