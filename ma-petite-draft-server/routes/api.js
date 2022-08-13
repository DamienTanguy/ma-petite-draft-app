var express = require('express');
var router = express.Router();

//////////////////////////////////////
//            API                  //
/////////////////////////////////////

//referential
router.route('/nb_draft').get(require('./data_referential.js').get_nb_draft);
router.route('/nb_user').get(require('./data_referential.js').get_nb_user);
router.route('/player_list').get(require('./data_referential.js').get_player_list);
router.route('/position_list').get(require('./data_referential.js').get_position_list);
router.route('/club_list').get(require('./data_referential.js').get_club_list);
router.route('/league_list').get(require('./data_referential.js').get_league_list);

//draft
router.route('/game_list_of_user').post(require('./draft.js').get_game_list_of_user);
router.route('/user_in_game').post(require('./draft.js').get_user_in_game);

router.route('/picked_player_in_game_by_a_user').post(require('./draft.js').get_picked_player_in_game_by_a_user);
router.route('/player_list_left_for_draft').post(require('./draft.js').get_player_list_left_for_draft);
router.route('/add_picked_player').post(require('./draft.js').add_picked_player);

//user
router.route('/new_user').post(require('./user.js').add_new_user);
router.route('/connexion').post(require('./user.js').get_connexion);

//game
router.route('/opponent_list_new_game').post(require('./game.js').get_opponent_list_for_new_game);
router.route('/new_game').post(require('./game.js').create_new_game);
router.route('/game_details').post(require('./game.js').get_game_details);

//router.route

module.exports = router;
