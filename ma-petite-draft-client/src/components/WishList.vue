<template>
  <div class="wish-list">
    <div class="table100 ver6 m-b-110">
        <table>
          <thead>
            <tr class="row100">
              <td>Your Wish List:</td>
            </tr>
            <tr class="row100 head">
              <th class="column100 column1" data-column="column1">Name</th>
              <th class="column100 column1" data-column="column1">Club</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(wish,id) in wishList" :key="id" class="row100">
              <td class="column100 column1" data-column="column1"> {{ wish.playerName }}</td>
              <td class="column100 column1" data-column="column1"> {{ wish.club }}</td>
              <td class="column100 column1" data-column="column1">
                  <button class="delete-button" :id="wish.id" :value="wish.name" v-on:click="deleteWish(wish)">X</button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'WishList',
    /*props : {
    }
    }*/
    data() {
      return {
        wishList : [
          {id: 1, playerName:'Navas', club:'Psg', poste:'Goal'},
          {id: 2, playerName:'Lopes', club:'Lyon', poste:'Goal'},
          {id: 3, playerName:'Mbappe', club:'Psg', poste:'Attaquant'},
          {id: 4, playerName:'Icardi', club:'Psg', poste:'Attaquant'  },
          {id: 5, playerName:'Perrin', club:'Saint-Etienne', poste:'Defenseur'}
        ]
      }
    },
    methods : {
      deleteWish: function(wish){
        console.log(wish.playerName)
      }
    }
  }

</script>

<style scoped lang="scss">

  .wish-list {
    position: relative;
    left: 750px;
    top: -550px;
    width:30%;
  }

  .limiter {
    width: 100%;
    margin: 0 auto;
  }

  .container-table100 {
    width: 100%;
    min-height: 100vh;
    background: #d1d1d1;

    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 33px 30px;
  }

  .wrap-table100 {
    width: 1300px;
  }

  table {
    width: 100%;
    background-color: #fff;
  }

  th, td {
    font-weight: unset;
    padding-right: 10px;
  }

  .column100 {
    width: 130px;
  }

  .column100.column1 {
    width: 265px;
  }

  .row100.head th {
    padding-top: 15px;
    padding-bottom: 10px;
  }

  .row100 td {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .table100.ver6 {
    border-radius: 16px;
    overflow: hidden;
    background: #7918f2;
    background: -webkit-linear-gradient(-68deg, #ac32e4 , #4801ff);
    background: -o-linear-gradient(-68deg, #ac32e4 , #4801ff);
    background: -moz-linear-gradient(-68deg, #ac32e4 , #4801ff);
    background: linear-gradient(-68deg, #ac32e4 , #4801ff);
  }

  .table100.ver6 table {
    background-color: transparent;
  }

  .table100.ver6 td {
    font-family: Montserrat-Regular;
    font-size: 14px;
    color: #fff;
    line-height: 1.4;
  }

  .table100.ver6 th {
    font-family: Montserrat-Medium;
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;

    background-color: rgba(255,255,255,0.32);
  }

  .table100.ver6 .row100:hover td {
    background-color: rgba(255,255,255,0.1);
  }

  .table100.ver6 .hov-column-ver6 {
    background-color: rgba(255,255,255,0.1);
  }
  .table100.ver6 .row100 td:hover {
    background-color: rgba(255,255,255,0.2);
  }

</style>
