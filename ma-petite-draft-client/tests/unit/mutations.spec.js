import mutations from '@/store/mutations'
import store from '@/store'

describe('UpdateActiveUser', () => {
  test('should save the user account to the store', () => {
    const state = { user:{} }
    const payload = { id: 1, username: 'username1' }
    const result = {
      user:{ id: 1, username: 'username1' }
    }

    mutations.UpdateActiveUser(state, payload);

    expect(state.user.id).toEqual(result.user.id);
    expect(state.user.username).toEqual(result.user.username);
  });
});

describe('UpdateSelectedGame', () => {
  test('should update the game selected to the store', () => {
    const state = { selectedGame:{} }
    const payload = { id: 1 }
    const result = { selectedGame:{ id: 1 } }

    mutations.UpdateSelectedGame(state, payload);

    expect(state.selectedGame.id).toEqual(result.selectedGame.id);
  });
});

//https://www.codegrepper.com/code-examples/javascript/jest+test+array+of+objects
describe('UpdateGameList', () => {
  test('should update the list of the game of the user', () => {
    const state = { gameList:[] }
    const payload = [
      { id:1, name:"game_name1" },
      { id:2, name:"game_name2" }
    ]
    const result = [
      { id:1, name:"game_name1" },
      { id:2, name:"game_name2" }
    ]

    mutations.UpdateGameList(state, payload);

    expect(state.gameList).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          { id: result[0].id, name:result[0].name }
          //{ id: 1, name:"game_name1" }
        ),
        expect.objectContaining(
          { id: result[1].id, name:result[1].name }
          //{ id: 2, name:"game_name2" }
        )
      ])
    );

  });
});

describe('UpdatePickedPlayer', () => {
  test('should update the player picked by the user to the store', () => {
    const state = { pickedPlayer:{} }
    const payload = { 
        club: { id:15,name:"Paris" },
        club_id: 15,
        goal: 12,
        id:3,
        name:"Icardi Mauro",
        position: { id:6,name:"Attaquant" },
        position_id: 6,
        price: 41,
        rate: 5.8,
        start_line_up: 50
    }
    const result = { 
      pickedPlayer: { 
        club: { id:15,name:"Paris" },
        club_id: 15,
        goal: 12,
        id:3,
        name:"Icardi Mauro",
        position: { id:6,name:"Attaquant" },
        position_id: 6,
        price: 41,
        rate: 5.8,
        start_line_up: 50 
      }
    }

    mutations.UpdatePickedPlayer(state, payload);

    expect(state.pickedPlayer).toEqual(result.pickedPlayer);
  });
});

describe('UpdateDraftList', () => {
  test('After selection of a game, it should update the player still available for the draft to the store', () => {
    const state = { draftList:[] }
    const payload = [
      {
        club: {id: 15, name: "Paris"},
        club_id: 15,
        goal: 18,
        id: 1,
        name: "Mbappe Kylian",
        position: {id: 6, name: "Attaquant"},
        position_id: 6,
        price: 50,
        rate: 6.5,
        start_line_up: 61
      },{
        club: {id: 10, name: "Monaco"},
        club_id: 10,
        goal: 18,
        id: 2,
        name: "Ben Yedder Wissam",
        position: {id: 6, name: "Attaquant"},
        position_id: 6,
        price: 43,
        rate: 5.9,
        start_line_up: 89
      },{ 
        club: { id:15,name:"Paris" },
        club_id: 15,
        goal: 12,
        id:3,
        name:"Icardi Mauro",
        position: { id:6,name:"Attaquant" },
        position_id: 6,
        price: 41,
        rate: 5.8,
        start_line_up: 50
      }
    ]
    const result = { 
      draftList:[
        {
          club: {id: 15, name: "Paris"},
          club_id: 15,
          goal: 18,
          id: 1,
          name: "Mbappe Kylian",
          position: {id: 6, name: "Attaquant"},
          position_id: 6,
          price: 50,
          rate: 6.5,
          start_line_up: 61
        },{
          club: {id: 10, name: "Monaco"},
          club_id: 10,
          goal: 18,
          id: 2,
          name: "Ben Yedder Wissam",
          position: {id: 6, name: "Attaquant"},
          position_id: 6,
          price: 43,
          rate: 5.9,
          start_line_up: 89
        },{ 
          club: { id:15,name:"Paris" },
          club_id: 15,
          goal: 12,
          id:3,
          name:"Icardi Mauro",
          position: { id:6,name:"Attaquant" },
          position_id: 6,
          price: 41,
          rate: 5.8,
          start_line_up: 50
        }
      ] 
    }

    mutations.UpdateDraftList(state, payload);

    expect(state.draftList).toEqual(result.draftList);
    expect(state.draftList.length).toEqual(result.draftList.length);
  });
});

describe('UpdateUserListInGame', () => {
  test('After selection of a game, it should update the user list of the draft to the store', () => {
    const state = { 
      userListInGame:[
        { id: 1, username: "Damien" },
        { id: 12, username: "U12" },
        { id: 11, username: "U11" },
        { id: 13, username: "U13" }
      ] 
    }
    const payload = [
      { id: 1, username: "Damien" },
      { id: 5, username: "User_5" }
    ] 
    const result = { 
      userListInGame: [
        { id: 1, username: "Damien" },
        { id: 5, username: "User_5" }
      ]
    }

    mutations.UpdateUserListInGame(state, payload);

    expect(state.userListInGame).toEqual(result.userListInGame);
  });
});

describe('UpdatePickTeam', () => {
  test('After selection of a game, it should update the team displayed of 1 user (active user by default if no user selected manually) of the game to the store', () => {
    const state = { pickTeam:[] }
    const payload = [
        {
          game: {id: 1, name: "Game Test"},
          game_id: 1,
          player: {id: 1, name: "Mbappe Kylian", club: {id: 15, name: "Paris"}, position: {id: 6, name: "Attaquant"}},
          player_id: 1,
          user: {id: 1, username: "Damien"},
          user_id: 1
        },{
          game: {id: 1, name: "Game Test"},
          game_id: 1,
          player: {id: 16, name: "Rulli Geronimo", club: {id: 11, name: "Montpellier"}, position: {id: 1, name: "Gardien"}},
          player_id: 16,
          user: {id: 1, username: "Damien"},
          user_id: 1
        },{
          game: {id: 1, name: "Game Test"},
          game_id: 1,
          player: {id: 17, name: "Benitez Walter", club: {id: 13, name: "Nice"}, position: {id: 1, name: "Gardien"}},
          player_id: 17,
          user: {id: 1, username: "Damien"},
          user_id: 1
        }
      ] 
    const result = { 
      pickTeam: [
        {
          game: {id: 1, name: "Game Test"},
          game_id: 1,
          player: {id: 1, name: "Mbappe Kylian", club: {id: 15, name: "Paris"}, position: {id: 6, name: "Attaquant"} },
          player_id: 1,
          user: {id: 1, username: "Damien"},
          user_id: 1
        },{
          game: {id: 1, name: "Game Test"},
          game_id: 1,
          player: {id: 16, name: "Rulli Geronimo", club: {id: 11, name: "Montpellier"}, position: {id: 1, name: "Gardien"}},
          player_id: 16,
          user: {id: 1, username: "Damien"},
          user_id: 1
        },{
          game: {id: 1, name: "Game Test"},
          game_id: 1,
          player: {id: 17, name: "Benitez Walter", club: {id: 13, name: "Nice"}, position: {id: 1, name: "Gardien"}},
          player_id: 17,
          user: {id: 1, username: "Damien"},
          user_id: 1
        }
      ]
    }

    mutations.UpdatePickTeam(state, payload);

    expect(state.pickTeam).toEqual(result.pickTeam);
    expect(result.pickTeam[0].game_id).toEqual(result.pickTeam[1].game_id);
    expect(result.pickTeam[0].game_id).toEqual(result.pickTeam[2].game_id);
    expect(result.pickTeam[0].user_id).toEqual(result.pickTeam[1].user_id);
    expect(result.pickTeam[0].user_id).toEqual(result.pickTeam[2].user_id);

  });
});

describe('UpdateSelectedUser', () => {
  test('should update the user selected to the store', () => {
    const state = { selectedUser: { id: 1, username: "Damien" } }
    const payload = { id: 5, username: "User_5" }
    const result = { selectedUser:{ id: 5, username: "User_5" } }

    mutations.UpdateSelectedUser(state, payload);

    expect(state.selectedUser).toEqual(result.selectedUser);
  });
});

describe('UpdateOpponentList', () => {
  test('after the choice to create a new game, it should update the list of user available (all user excepted the user account) to create a new game to the store', () => {
    const state = { 
      opponentList: [],
      user: {
        id: 1,
        username: "Damien"
      }
    }
    const payload = [
      { id: 12, username: "U12" },
      { id: 13, username: "U13" },
      { id: 14, username: "U14" },
      { id: 15, username: "U15" },
      { id: 16, username: "dada" }
    ]
    const result = { 
      opponentList:[
        { id: 12, username: "U12" },
        { id: 13, username: "U13" },
        { id: 14, username: "U14" },
        { id: 15, username: "U15" },
        { id: 16, username: "dada" }
      ],
      user: {
        id: 1,
        username: "Damien"
      } 
    }

    mutations.UpdateOpponentList(state, payload);

    expect(state.opponentList).toEqual(result.opponentList);
    expect(result.opponentList).not.toEqual(
          expect.arrayContaining([
            expect.objectContaining(result.user)
          ])
    );
  });
});

describe('UpdateSelectedOpponentList', () => {
  test('for every modification of the user, it should update the list of opponent selected to the store', () => {
    const state = { 
      selectedOpponentList: [
          { id: 12, username: "U12" }
      ] 
    }
    const payload = [
        { id: 12, username: "U12" },
        { id: 13, username: "U13" }
    ]
    const result = { 
      selectedOpponentList:[
          { id: 12, username: "U12" },
          { id: 13, username: "U13" }
      ] 
    }

    mutations.UpdateSelectedOpponentList(state, payload);

    expect(state.selectedOpponentList).toEqual(result.selectedOpponentList);
  });
});