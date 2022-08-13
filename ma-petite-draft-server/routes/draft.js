var models  = require('../models');
const log4js = require("log4js");
const logger = log4js.getLogger("MPD");

exports.get_game_list_of_user = function(req, res) {
  models.game.findAll({
    attributes: ['id','name'],
    include: [
    {
      model: models.user_game,
      attributes: ['game_id','user_id','turn_to_pick'],
      where :{
        user_id : req.body.user_id
      }
    },{
      model: models.game_state,
      attributes: ['id','name']
    }
    ],
    order:[
      [models.sequelize.fn('lower', {model: models.sequelize.col('game.name')}),'ASC'] //not taken into account if it's upper or lower case
    ]
  }).then(function(game_list) {
    res.status(200).send(game_list);
  }).catch(function(err) {
    logger.error(err);
    console.log(err);
    res.status(400).end();
  });
};

exports.get_user_in_game = function(req, res) {
  models.user.findAll({
    attributes: ['id','username'],
    include: [
    {
      model: models.user_game,
      attributes: ['game_id','user_id','game_order','turn_to_pick','way_id'],
      where :{
        game_id : req.body.game_id
      }
    }
    ],
    order:[
      [models.user_game,'game_order','ASC']
    ]
  }).then(function(user_list) {
    res.status(200).send(user_list);
  }).catch(function(err) {
    logger.error(err);
    console.log(err);
    res.status(400).end();
  });
};

exports.get_picked_player_in_game_by_a_user = function(req, res) {
  models.picked_player_in_game.findAll({
    //attributes: ['game_id','user_id','player_id'],
    where: {
      user_id: req.body.user_id,
      game_id: req.body.game_id
    },
    include:[
		{
      model: models.player,
      attributes: ['id', 'name'],
      include:[
  		{
        model: models.club,
        attributes: ['id', 'name']
      },{
        model: models.position,
        attributes: ['id', 'name']
      }
  		]
    }/*,{
      model: models.user,
      attributes: ['id', 'username']
    },{
      model: models.game,
      attributes: ['id', 'name']
    }*/
		]
  }).then(function(picked_player_list) {
    res.status(200).send(picked_player_list);
  }).catch(function(err) {
    logger.error(err);
    console.log(err);
    res.status(400).end();
  });
};

exports.get_player_list_left_for_draft = function(req, res) {
	let user_id = req.body.user_id;
  let player_list = models.player.findAll({
    attributes: ['id','name','position_id','club_id','rate','goal','price','start_line_up'],
		order: [['price','DESC']],
		include:[
		{
      model: models.club,
      attributes: ['id', 'name']
    },{
      model: models.position,
      attributes: ['id', 'name']
    }
		]
  });
  let player_picked = models.picked_player_in_game.findAll({
    attributes: ['player_id','game_id','user_id'],
    where: {
      game_id: req.body.game_id
    },
    include:[
    {
      model: models.player,
      attributes: ['id','name','position_id']
    }
    ]
  });

  Promise.all([player_list,player_picked]).then(function(player_list) {
		
    let player_picked_by_user = player_list[1].filter(player_picked => player_picked.user_id == user_id);
    let goalkeeper_nb=0;
    let defender_nb=0;
    let midfielder_nb=0;
    let forward_nb=0;
    //Calculation of the player in the team to check if the number of player for a position is reached
    player_picked_by_user.forEach(function(player_picked){
      if(player_picked.player.position_id === 1){
        goalkeeper_nb++;
      }else if(player_picked.player.position_id === 2 || player_picked.player.position_id === 3){
        defender_nb++;
      }else if(player_picked.player.position_id === 4 || player_picked.player.position_id === 5){
        midfielder_nb++;
      }else{
        forward_nb++;
      }
    });
    //remove all the player picked by all the users from the draft
    let player_left_to_draft = player_list[0].filter(({id}) => !player_list[1].find(player_picked => player_picked.player_id == id));
    //remove all the player for a specific position if the limitation is reached
    if(goalkeeper_nb === 2){
      player_left_to_draft = player_left_to_draft.filter(player => player.position_id !== 1);
    } 
    if(defender_nb === 6){
      player_left_to_draft = player_left_to_draft.filter(player => player.position_id !== 2 && player.position_id !== 3);
    } 
    if(midfielder_nb === 6){
      player_left_to_draft = player_left_to_draft.filter(player => player.position_id !== 4 && player.position_id !== 5);
    } 
    if(forward_nb === 4){
      player_left_to_draft = player_left_to_draft.filter(player => player.position_id !== 6);
    } 
    res.status(200).send(player_left_to_draft);
  }).catch(function(err) {
    logger.error(err);
    console.log(err);
    res.status(400).end();
  });
};

exports.add_picked_player = function(req, res) {
	let game_id = req.body.game_id;
  let user_id = req.body.user_id;
  //Recording of the player 
  models.picked_player_in_game.create({
    player_id:req.body.player_id,
		updatedby: 'Damien',
		game_id:req.body.game_id,
		user_id:req.body.user_id
  }).then(function() {
          //Selection of the game to change the flag turn_to_pick
          models.user_game.findAll({
            attributes: ['game_id','user_id','game_order','turn_to_pick','way_id'],
            where: {
              game_id: game_id
            }
          }).then(function(the_game) {
                    
                    //to know the number of user in the game and to check if the draft is finished or not (18 players * nb_user)
                    let nb_user = the_game.length;

                    //Modification of user --> turn_to_pick to false
                    //Modification of the next user to pick --> turn_to_pick to true
                    
                    //information about the user:
                    let user_information = the_game.filter(the_game => the_game.turn_to_pick === true);

                    let next_user_game_order;
                    let next_user_information, next_user_id;
                    let query = '';

                    //Check if the user is the last of the draft and the way is 1
                    //Check if the user is the first of the draft and the way is 2

                    //Selection of the next user to play and update of the way of the draft
                    if(user_information[0].dataValues.way_id === 1){ // right way
                      if(user_information[0].dataValues.game_order === the_game.length){ //if it's the last user of the draft
                        //Invert the way of the draft
                        query += 'UPDATE user_games SET way_id = 2 WHERE ' + 'game_id =' + game_id +';';
                        
                        if(the_game.length === 2){ //special case --> if 2 players, the turn to pick is the other players
                            next_user_game_order = parseInt(user_information[0].dataValues.game_order)-1;
                        }else{
                            next_user_game_order = parseInt(user_information[0].dataValues.game_order);
                        }

                      }else{
                        //Next user of the draft
                        next_user_game_order = parseInt(user_information[0].dataValues.game_order) + 1;
                      }

                    }else{ //left way
                      if(user_information[0].dataValues.game_order === 1){ //if it's the first user of the draft
                        //Invert the way of the draft
                        query += 'UPDATE user_games SET way_id = 1 WHERE ' + 'game_id =' + game_id +';';
                        
                        if(the_game.length === 2){ //special case --> if 2 players, the turn to pick is the other players
                            next_user_game_order = parseInt(user_information[0].dataValues.game_order)+1;
                        }else{
                            next_user_game_order = parseInt(user_information[0].dataValues.game_order);
                        }

                      }else{
                        //Next user of the draft
                        next_user_game_order = parseInt(user_information[0].dataValues.game_order) - 1;
                      }
                    }

                    //information about the next user to play
                    next_user_information = the_game.filter(the_game => the_game.game_order === next_user_game_order);
                    next_user_id = next_user_information[0].dataValues.user_id;
                    query += 'UPDATE user_games SET turn_to_pick= false WHERE user_id='+ user_id + ' AND game_id =' + game_id +';';
                    query += 'UPDATE user_games SET turn_to_pick= true WHERE user_id='+ next_user_id + ' AND game_id =' + game_id +';';


                    models.sequelize.query(query).then(function() {
                      
                        //check if the draft is finished
                        models.picked_player_in_game.findAll({
                          attributes: ['game_id','user_id','player_id'],
                          where: {
                            game_id: game_id
                          }
                        }).then(function(player_picked_response) {
                            if(player_picked_response.length === (nb_user * 18)){
                                  
                                  models.game.update({
                                    game_state_id:2
                                  },
                                  {
                                    where:{
                                      id:game_id
                                    }
                                  }).then(function() {
                                      res.status(200).send('the draft is finished');
                                  }).catch(function(err) {
                                    logger.error(err);
                                    console.log(err);
                                    res.status(400).end();
                                  });

                            }else{
                                res.status(200).send('the draft is not finished');
                            }

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
