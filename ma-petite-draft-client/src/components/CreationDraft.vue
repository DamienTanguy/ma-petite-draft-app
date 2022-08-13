<template>
    <div class="creation_game">
        <h4>Creation Draft</h4>
        <div class="container-button" v-if="!creationGameForm">
			<button class="create-form-button" v-on:click="toogleCreationGameForm()">Create a new Draft</button>
            <!--<button class="create-form-button" v-on:click="getOpponentList()">Create a new Draft</button>-->
		</div>
        <div class="creation-game-form" v-if="creationGameForm">
            <div>
                <div :class="{ 'form-group--error': $v.newGameName.$error, 'form-group--loading': $v.newGameName.$pending }">
                    <label for="newGameName">Draft Name:</label>
                    <input class="marginL1" v-model.trim="$v.newGameName.$model"/>
                    <span class="error" v-if="!$v.newGameName.required"> Name is required.</span>
                </div>
            </div>
            <div>
                <label for="league">League:</label>
                <select class="marginL2" v-model="league">
                    <option v-for="(league,id) in LeagueList" :key="id" :value="league">{{ league.name }}</option>
                </select>                
            </div>
            <div>
                <div>Creator: <span class="marginL3">{{ $store.state.user.username }}</span></div>
                <div class="opponent-container">
                    <span v-if="$store.state.selectedOpponentList.length === 0">0 Opponent:</span>
                    <span v-else-if="$store.state.selectedOpponentList.length === 1">1 Opponent:</span>
                    <span v-else>{{ $store.state.selectedOpponentList.length }} Opponents:</span>
                    <v-select class="v-select marginL4" multiple label="username" @input="updateSelectedOpponentList" :options="$store.state.opponentList"/>
                </div>
            </div>
            <div class="container-button" v-if="newGameName && ($store.state.selectedOpponentList.length % 2 !== 0) && ($store.state.selectedOpponentList.length !== 0) && ($store.state.selectedOpponentList.length < 10)"><button class="create-new-button" v-on:click="createGame()">Create Draft</button>
            </div>
            <div class="icon"> 
                <!--<b-icon icon="arrow-up-circle" v-on:click="hideCreationGameForm();"></b-icon>-->
                <b-icon icon="arrow-up-circle" v-on:click="toogleCreationGameForm();"></b-icon>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
//import Multiselect from 'vue-multiselect';
import { required } from 'vuelidate/lib/validators';
//https://vue-select.org/guide/options.html#option-labels
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
    name:'CreationDraft',
    components:{ //equivalent to Vue.component('v-select', vSelect)
        vSelect
    },
    mounted: function(){
        axios.get(`api/league_list`).then(response => {
            this.LeagueList = response.data;
            this.league = response.data[0];
        }).catch(error => console.log(error));
        this.$store.dispatch('getOpponentList');
    },
    destroyed: function(){
        this.$store.commit('UpdateSelectedOpponentList',[]);
    },
    data() {
        return {
            league: {},
            creationGameForm : false,
            errors:[],
            newGameName:'',
            message: ''
        }
    },
    validations: {
        newGameName: {
            required
        },
        opponentList: {
            required
        }
    },
    computed: {
        opponentList: {
            get() {
                return this.$store.state.opponentList
            }
        }
    },
    methods : {
        updateSelectedOpponentList: function(val) {
            this.$store.commit('UpdateSelectedOpponentList',val);
        },
        /*getOpponentList:function() {
            this.creationGameForm = true;
        },
        getOpponentList:function() {
            this.creationGameForm = true;
            this.$store.dispatch('getOpponentList');
        },
        hideCreationGameForm:function() {
            this.creationGameForm = false;
            this.newGameName = '';
            this.$store.commit('UpdateSelectedOpponentList',[]);
        },*/
        toogleCreationGameForm: function(){
            this.creationGameForm = !this.creationGameForm;
            this.newGameName = '';
            this.$store.commit('UpdateSelectedOpponentList',[]);
        },
        createGame:function() {
            if(this.newGameName 
                && (this.$store.state.selectedOpponentList.length % 2 !== 0)
                && (this.$store.state.selectedOpponentList.length !== 0)
                && (this.$store.state.selectedOpponentList.length < 10)){

                let request_body = {
                    game_name : this.newGameName,
                    opponent_list : this.$store.state.selectedOpponentList,
                    user : this.$store.state.user
                }
                
                axios.post(`api/new_game`,request_body).then(response => {
                    
                    this.message = 'Your Draft has been Created';
                    this.$bvModal.msgBoxOk(this.message).then(message => {
                        console.log(message);
                        this.$store.commit('UpdateUserListInGame', []);
                        this.$store.commit('UpdateSelectedGame', {id: response.data[0].game_id});
                        //redirection to the draft view after creating the game
                        this.$router.push({path: '/draft'});
                    });

                }).catch(error => console.log(error));

            }else{
                console.log('erreur to display');
            }
        }
    }
}

</script>

<style scoped lang="scss">

	.creation_game {
		/*width: 98%;
		position: relative;
		top: 10px;
		left: 10px;*/
		border-radius: 16px;
		background-color: #1d2636;
		margin-top: 10px;
	}
	.creation-game-form {
      display: block;
      border: 1px solid #11ece5;
      border-radius: 16px;
      padding-left: 3%;
      padding-top: 1%;
      padding-bottom: 1%;
	}
	.container-button {
		display: flex;
		justify-content: center;
		align-items: center;
	}
    .marginL1 {
        margin-left: 26px;
    }
    .marginL2 {
        margin-left: 63px;
    }
    .marginL3 {
        margin-left: 57px;
    }
    .marginL4 {
        margin-left: 27px;
    }
	.create-form-button {
		margin-bottom: 15px;
	}
	.create-new-button {
		margin-top: 5px;
		margin-bottom: 5px;
	}
    .opponent-container {
        display: flex;
    }
    .back-button {
        display: block;
        margin:auto;
        width: 1em; 
        height: 1em;
        cursor: pointer;
    }   
	.v-select {
		width: 90%;
		border-radius: 16px;
		background-color: #070d17;
	}
    .v-select-opponent {
        position: relative;
        right: 14px;
    }
	.error {
        color: red;
    }
    .icon {
        text-align: center;
    }

    @media screen and (max-width: 520px){
    
        .marginL1 {
            margin-left: 5px;
        }
        .marginL2 {
            margin-left: 45px;
        }
        .marginL3 {
            margin-left: 34px;
        }
        .marginL4 {
            margin-left: 14px;
        }
        input {
            width: 30%;
        }
        .v-select {
            width: 65%;
        }

    }

    @media screen and (max-width: 370px){

        .error {
            display: block;
        }
    }

</style>