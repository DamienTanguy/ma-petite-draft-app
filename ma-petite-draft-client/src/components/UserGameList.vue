<template>
    <div class="user_game_list" id="game_panel">
    	<!--List of Game-->
		<div v-if="gameListDisplay">
	        <h4>Your Draft</h4>
	        <table class="table-game-list">
	            <thead>
	            	<tr>
	                    <th>Name</th>
	                    <th>Status</th>
	                    <th>Details</th>
	                </tr>
	            </thead>
	            <tbody>
	                <tr v-for="(game, id) in gameList" :key="id">
	                    <td>{{ game.name }}</td>
	                    <td>{{ game.game_state.name }}</td>
	                    <td>
	                    	<button class="details-button" :id="game.id" v-on:click="DisplayGameDetails(game.id);"><!--<router-link :to="`/game_details/${game.id}`"></router-link>-->Details</button>
	                    </td>
	                </tr>
	            </tbody>
	        </table>
	    </div>
	    <!--If a Game Details is called-->
		<div v-else>
			<div id="back-to-list-button" v-on:click="DisplayGameList();"><b-icon icon="arrow-left-circle"></b-icon></div>
			<div class="title-box">
				<p>{{ gameDetails.name }} ({{ gameDetails.game_state.name }})</p>
				<p>League: {{ gameDetails.league.name }}</p>
				<p>{{ gameDetails.user_games.length }} players </p>
				<p v-if="gameDetails.game_state.id === 1" >Turn to pick a player: {{ gameDetails.username_turn_to_pick }}</p>
			</div>
			<div v-for="(user_games, id) in gameDetails.user_games" :key="id">
				<div class="user_label_table">{{ user_games.user.username }} <span v-if="user_games.user.picked_player_in_games.length === 0">(No player selected)</span></div>
				<table v-if="user_games.user.picked_player_in_games.length !== 0">
		            <thead>
			           	<tr> <!--add if no player-->
		                    <th>Name</th>
		                    <th>Position</th>
		                    <th>Club</th>
		                    <th>Note</th>
		                    <th>Buts</th>
		                    <th>Price</th>
		                    <th>Titu</th>
		                </tr>
		            </thead>
		            <tbody>
		                <tr v-for="(player_picked, id) in user_games.user.picked_player_in_games" :key="id">
		                    <td>{{ player_picked.player.name }}</td>
		                    <td>{{ player_picked.player.position.name }}</td>
		                    <td>{{ player_picked.player.club.name }}</td>
		                    <td>{{ player_picked.player.rate }}</td>
		                    <td>{{ player_picked.player.goal }}</td>
		                    <td>{{ player_picked.player.price }}</td>
		                    <td>{{ player_picked.player.start_line_up }}</td>
		                </tr>
		            </tbody>
		        </table>
			</div>
	    </div>
	</div>
</template>

<script>

import axios from 'axios';

export default {
    name:'UserGameList',
    mounted: function(){
        this.$store.dispatch('getGameList');
    },
    data(){
		return {
			gameListDisplay:true,
			gameDetails: {}
		}
    },
    computed: {
        gameList: {
            get() {
                return this.$store.state.gameList
            }
        }
    },
    methods: {
		DisplayGameDetails: function(game_id){			
		    let request_body = {
                id : game_id
            }
			axios.post(`api/game_details`,request_body).then(response => {
                    //doesn't work for ME --> https://stackoverflow.com/questions/51517324/scrollto-method-doesnt-work-in-edge
                    //document.getElementById('game_panel').scrollTo(0, 0);
                    document.getElementById('game_panel').scrollTop = 0;
                    this.gameDetails = response.data;
                    this.gameListDisplay = false;

                }).catch(error => console.log(error));

		},
		DisplayGameList: function(){
			this.gameListDisplay = true;
		}
    }
}

</script>

<style scoped lang="scss">

	.user_game_list {
		border-radius: 16px;
		background-color: #1d2636;
		margin-top: 10px;
		height: 460px;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.title-box {
		width: 500px;
        background-color: #242c3b;
        margin: auto;
        margin-bottom: 20px;
        padding: 10px;
        text-align: center;
        border-radius: 16px;
        border: 1px solid #1aa4a7;
	}
	
	table{
		width: 90%;
		overflow: visible;
		margin-bottom: 20px;
		margin-left: 5%;
		margin-right: 5%;
		border-collapse: separate;
  		border-spacing: 0;
	}
	
	table td:nth-child(1) {
		width: 30%;
	} 
	
	table td:nth-child(2) {
		width: 26%;
	}

	/*
	.table-game-list thead, .table-game-details tbody tr:nth-child(1) {
		border: 1px solid #11ece5;
	}*/

	/*TITLE*/
	thead tr:first-child th:first-child {
		border-top: 1px solid #11ece5;
		border-bottom: 1px solid #11ece5;
		border-left: 1px solid #11ece5;
		border-top-left-radius: 16px;
	}
	thead tr:first-child th:last-child {
		border-top: 1px solid #11ece5;
		border-bottom: 1px solid #11ece5;
		border-right: 1px solid #11ece5;
		border-top-right-radius: 16px;
	}
	thead tr:first-child th {
		border-top: 1px solid #11ece5;
		border-bottom: 1px solid #11ece5;
	}
	/*BODY CONTENT*/
	tbody tr:last-child td:first-child {
		border-bottom-left-radius: 16px;
	}
	tbody tr:last-child td:last-child {
		border-bottom-right-radius: 16px;
	}
	tbody tr td:first-child {
		border-left: 1px solid #11ece5;
	}
	tbody tr td {
		border-bottom: 1px solid #1b4a55;
	}

	tbody tr td:last-child {
		border-right: 1px solid #11ece5;
	}

	tbody tr:last-child td{
		border-bottom: 1px solid #11ece5;
	}

	.back-button {
		position: relative;
    	width: 1em; 
    	height: 1em;
    	top: 26px;
    	cursor: pointer;
	}

	.user_label_table {
		text-align: center;
		font-size: 20px;
   		font-weight: 500;
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

	    .user_game_list {
	      scrollbar-color: #11ece5 #1c2f3e;
	      scrollbar-width: thin;
	    }

	}

	@media screen and (max-width: 520px){

        .title-box {
            width: 80%;
        }
    }

    @media screen and (max-width: 460px){

    	table {
	      table-layout:fixed;
	    }
	    table th:nth-child(4), table td:nth-child(4),
    	table th:nth-child(5), table td:nth-child(5),
    	table th:nth-child(7), table td:nth-child(7) {
	      display: none;
	    }
	    thead tr:first-child th:nth-child(6) {
	    	border-right: 1px solid #11ece5;
    		border-top-right-radius: 16px;
	    }
	    tbody tr td:nth-child(6) {
			border-right: 1px solid #11ece5;
		}
		tbody tr:last-child td:nth-child(6) {
			border-right: 1px solid #11ece5;
			border-bottom-right-radius: 16px;
		}
		table th:nth-child(6) {
			width: 16%;
		}
		table td {
			text-overflow:ellipsis;
			overflow: hidden;
		}
    }

</style>