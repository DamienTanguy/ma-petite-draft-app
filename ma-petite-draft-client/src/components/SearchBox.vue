<template>
  <div class="search-box">
      <div>
          <table>
              <thead>
                  <tr>
                      <td>Position</td>
                      <td>Club</td>
                      <!--<td class="column100 column1" data-column="column1">
                          <input type="checkbox" id="highlight_player_wishlist">Hightlight players in the wish list
                      </td>-->
                  </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>
                      <select v-model="selectedPostion" @click="emitPositionEvent">
                          <option v-for="(position,id) in positionList" :key="id" :value="position">{{ position.name }}</option>
                      </select>
                    </td>
                    <td>
                      <select v-model="selectedClub" @click="emitClubEvent">
                          <option v-for="(club,id) in clubList" :key="id" :value="club">{{ club.name }}</option>
                      </select>
                    </td>
                    <!--<td>
                      <select v-model="selectedWish">
                          <option v-for="(wish,id) in WishList" :key="id" :value="wish">{{ wish.name }}</option>
                      </select>
                    </td>-->
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchBox',
  /*props: ['selectedPostion','selectedClub','selectedWish'], --> not props because the data belongs to the components, props is used when we passed down to a child componenent*/
  mounted: function(){
    this.getPositionList();
    this.getClubList();
  },
  data(){
    return {
      selectedPostion: {},
      positionList: [],
      selectedClub: {},
      clubList: [],
      //selectedWish: {},
      /*WishList: [
        {id:1, name:'J1'},
        {id:2, name:'J36'},
        {id:3, name:'J23'},
        {id:4, name:'J2'},
        {id:5, name:'J6'}
      ]*/
    }
  },
  watch : {
    selectedGame : function() {
      this.selectedPostion = {};
      this.selectedClub = {};
      console.log('selected game changed');
    }
  },
  methods : {
    getPositionList(){
      axios.get(`api/position_list`).then(response => {
        this.positionList = response.data
      }).catch(error => console.log(error));
    },
    getClubList(){
      axios.get(`api/club_list`).then(response => {
        this.clubList = response.data;
      }).catch(error => console.log(error));
    },
    emitPositionEvent () {
      this.$emit('position-to-emit',{position: this.selectedPostion})
    },
    emitClubEvent () {
      this.$emit('club-to-emit',{club: this.selectedClub})
    }
  }
}
</script>

<style scoped lang="scss">

  .search-box {
    /*position: relative;
    bottom: 50px;*/
    width:100%;
    border-radius: 16px;
    background-color: #1d2636;
    margin-top: 10px;
    height: 100px;
  }
  select {
    margin-bottom: 1px;
  }
  /*mobile*/
  @media screen and (max-width: 650px){
    select {
      width: 90%;
    }
  }

</style>
