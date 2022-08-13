var models  = require('../models');
const log4js = require("log4js");
const logger = log4js.getLogger("MPD");

exports.get_opponent_list_for_new_game = function(req, res) {
	let op = models.Sequelize.Op;
	models.user.findAll({
	    attributes: ['id','username'],
	    where: {
	    	id: {
	    		[op.ne]: req.body.user_id//.user_id //all user if not user_id
	    	}
	    },
	   	order: [['username','ASC']],
	}).then(function(response) {
		res.status(200).send(response);
	}).catch(function(err) {
		logger.error(err);
		console.log(err);
		res.status(400).end();
	});
};

exports.create_new_game = function(req, res) {
	models.game.create({
		updatedby: req.body.user.username,
		code: '',
		name: req.body.game_name,
		league_id: 1,
		game_state_id: 1
	}).then(function(response) {
		
		let user_list = req.body.opponent_list.slice();
		let random;
		let game_user_object = {}; //object with the attribute to push in the table game_user
		let game_user = [];
		user_list.push(req.body.user);

		//select a value randomly from the array to pick
		for(let i = 0; i < req.body.opponent_list.length+1; i++){ //+1 because of the user added
			game_user_object = {};
			if(user_list.length === 1){ //for the last element
				random = 0;
			}else{
				random = Math.floor(Math.random() * user_list.length);
			}
			//push this value into a new array with an game_order,turn_to_pick,way_id attribute
			game_user_object.way_id = 1;
			game_user_object.user_id = user_list[random].id;
			game_user_object.game_order = i+1;
			game_user_object.game_id = response.id;
			game_user_object.updatedby = req.body.user.username;
			if(i === 0){
				game_user_object.turn_to_pick = true;
			}else{
				game_user_object.turn_to_pick = false;
			}
			
			game_user.push(game_user_object);
			//pop this value from the array to pick
			user_list.splice(random, 1);
		}
		models.user_game.bulkCreate(game_user).then(function(game_created) {
			res.status(200).send(game_created);
		}).catch(function(err) {
			logger.error(err);
			console.log(err);
			res.status(400).end();
		});

	}).catch(function(err) {
		logger.error(err);
		console.log(err);
		res.status(400).end();
	});
};

exports.get_game_details = function(req, res) {
	models.game.findAll({
	    attributes: ['id','name'],
	    where: {
	    	id: req.body.id
	    }, 
	    include: [
	    {
	      	model: models.game_state,
	      	attributes: ['id','name']
	    },{
	      	model: models.league,
	      	attributes: ['name']
	    },{
	     	model: models.user_game,
	      	attributes: ['game_id','user_id','turn_to_pick'],
	      	include: [
			{
				model: models.user,
				attributes: ['id','username'],
				include: [
				{
					model: models.picked_player_in_game,
					attributes: ['game_id','user_id','player_id'],
					where: {
						game_id: req.body.id
					}, 
					required: false, //because an user has not picked a player yet
					include: [
					{
						model: models.player,
						attributes: ['id','name','rate','goal','price','start_line_up','position_id'],
						required: false,
						include: [
						{
							model: models.position,
							attributes: ['id','name'],
							required: false
						},{
							model: models.club,
							attributes: ['id','name'],
							required: false,
						}
						]
					}
					]
				}
				]
	        }
	        ]
	    }
	    ],
	    order:[
	      [models.user_game, models.user, models.picked_player_in_game, {model: models.player},'position_id','ASC']
	    ]
	}).then(function(response) {
		//check the username to turn to pick if the game is not finished
    	if(response[0].game_state.id === 1){
    		let user_game_turn_to_pick = response[0].user_games.filter(user_games => user_games.turn_to_pick == true);		
			response[0].dataValues.username_turn_to_pick = user_game_turn_to_pick[0].user.username;
    	}

		res.status(200).send(response[0]);
	}).catch(function(err) {
		logger.error(err);
		console.log(err);
		res.status(400).end();
	});
};