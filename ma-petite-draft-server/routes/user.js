var models  = require('../models');
const log4js = require("log4js");
const logger = log4js.getLogger("MPD");

//https://x-team.com/blog/storing-secure-passwords-with-postgresql/
exports.add_new_user = function(req, res) {
	models.user.findAll({
	    attributes: ['id','username'],
	    where :{
	    	username : req.body.username
	    }
	}).then(function(response) {
		if(response.length === 0){
			//username available
			models.user.create({
				username: req.body.username,
				//mail: req.body.email,
				password: models.sequelize.fn('crypt', req.body.password, models.sequelize.fn('gen_salt', 'bf'))
			}).then(function(response) {
				res.status(200).send(response);
			}).catch(function(err) {
				logger.error(err);
				console.log(err);
				res.status(400).end(err);
			});
		}else{
			res.status(200).send('username already taken');
		}
	}).catch(function(err) {
		logger.error(err);
		console.log(err);
		res.status(400).end();
	});
};

exports.get_connexion = function(req, res) {
	models.user.findAll({
	    attributes: ['id','username','password'],
	    where :{
	    	username : req.body.username,
	    	password : models.sequelize.fn('crypt', req.body.password, models.sequelize.col('password'))
	    }
	}).then(function(response) {
		res.status(200).send(response);
	}).catch(function(err) {
		logger.error(err);
		console.log(err);
		res.status(400).end();
	});
};