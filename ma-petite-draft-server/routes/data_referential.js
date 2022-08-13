var models  = require('../models');
const log4js = require("log4js");
const logger = log4js.getLogger("MPD");

exports.get_nb_draft = function(req, res) {
  models.game.findAll({
    attributes: [[models.sequelize.fn('count',models.sequelize.col('id')),'nb_draft']]
  }).then(function(response) {
   res.status(200).send(response[0]);
  }).catch(function(err) {
    logger.error(err);
    console.log(err);
    res.status(400).end();
  });
  //Error: res.send depreciated
  /*models.game.findAndCountAll().then(function(nb_draft) {
    console.log(nb_draft.count);
    res.status(200).send(nb_draft.count);
  }).catch(function(err) {
    console.log(err);
    res.status(400).end();
  });*/
};

exports.get_nb_user = function(req, res) {
  models.user.findAll({
    attributes: [[models.sequelize.fn('count',models.sequelize.col('id')),'nb_user']]
  }).then(function(response) {
    res.status(200).send(response[0]);
  }).catch(function(err) {
    logger.error(err);
    console.log(err);
    res.status(400).end();
  });
};

exports.get_player_list = function(req, res) {
	models.player.findAll({
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
  }).then(function(player_list) {
    res.status(200).send(player_list);
  }).catch(function(err) {
    logger.error(err);
    console.log(err);
    res.status(400).end();
  });
};

exports.get_position_list = function(req, res) {
	models.position.findAll({
    attributes: ['id','name'],
		order: [['id','ASC']]
  }).then(function(position_list) {
    let all_position = { id: '0', name: 'All'};
    position_list.splice(0,0,all_position);
    res.status(200).send(position_list);
  }).catch(function(err) {
    logger.error(err);
    console.log(err);
    res.status(400).end();
  });
};

exports.get_club_list = function(req, res) {
	models.club.findAll({
    attributes: ['id','name'],
		order: [['id','ASC']]
  }).then(function(club_list) {
    let all_club = { id: '0', name: 'All'};
    club_list.splice(0,0,all_club);
    res.status(200).send(club_list);
  }).catch(function(err) {
    logger.error(err);
    console.log(err);
    res.status(400).end();
  });
};

exports.get_league_list = function(req, res) {
  models.league.findAll({
    attributes: ['id','name'],
    order: [['id','ASC']]
  }).then(function(league_list) {
    res.status(200).send(league_list);
  }).catch(function(err) {
    logger.error(err);
    console.log(err);
    res.status(400).end();
  });
};
