import actions from '@/store/actions'
import mutations from '@/store/mutations'
import state from '@/store/state'
import store from '@/store'
import axios from 'axios'
import io from 'socket.io-client'

//Mocking of Axios
let url = ''
let body = {}
jest.mock("axios", () => ({
  post: jest.fn((_url, _body) => { 
    return new Promise((resolve) => {
      url = _url
      body = _body
      resolve(true)
    })
  })
}))


//Mocking of Socket io
jest.mock("socket.io-client", () => {
    const socket = {
      emit: jest.fn(() => { 
        return new Promise((resolve) => {
          resolve(true)
        })
      })
    }
  return jest.fn(() => socket);
})

afterEach(() => {
    // cleaning up the mess left behind the previous test
    jest.clearAllMocks();
});

//https://medium.com/techfides/a-beginner-friendly-guide-to-unit-testing-the-vue-js-application-28fc049d0c78
//https://www.robinwieruch.de/axios-jest
//https://lmiller1990.github.io/vue-testing-handbook/vuex-actions.html#testing-actions
describe('getGameList', () => {
  test('Success: should return the game list of the user and update gameList in the store', async () => {
    const context= {
      state: {
        user: {
          id:1
        }
      },
      commit: jest.fn()
    }
    const response = {
      data: [ 
        { id:1, name:"game_name1" },
        { id:2, name:"game_name2" }
      ]
    };

    axios.post.mockResolvedValue(response) //OR axios.post.mockImplementationOnce(() => Promise.resolve(response));
    await actions.getGameList(context)
    expect(axios.post).toHaveBeenCalledWith("api/game_list_of_user",{
      "user_id":context.state.user.id
    });
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(context.commit).toHaveBeenCalledWith("UpdateGameList", response.data)

  });

  test('Error: an error occurred', () => {
    const errorMessage = 'Error getGameList:';
    axios.post.mockResolvedValue(() =>
      Promise.reject(new Error(errorMessage))
    );
  });

});

//Test To finish
describe('addPick', () => {
  test('Success: should add a player and update information (player available, user in the game, team picked by users) in the store', async () => {
    const context = {
      state: {
        selectedGame: {
          id:119
        },
        pickedPlayer: {
          id:1
        },
        user: {
          id:1
        },
        userListInGame: [
        {
          id:1,
          username: "Damien",
          user_games:[
            {
              game_id:119,
              game_order:1,
              turn_to_pick: true,
              user_id:1,
              way_id:1
            }
          ]
        },{
          id:19,
          username: "Damien2",
          user_games:[
            {
              game_id:119,
              game_order:2,
              turn_to_pick: false,
              user_id:19,
              way_id:1
            }
          ]
        }
        ]
      },
      commit: jest.fn()
    }
    const response = {
      data: "the draft is not finished"
    };
    //const dispatch = jest.fn();


    axios.post.mockResolvedValue(response) //OR axios.post.mockImplementationOnce(() => Promise.resolve(response));
    await actions.addPick(context)
    expect(axios.post).toHaveBeenCalledWith("api/add_picked_player",{
      "game_id" : context.state.selectedGame.id,
      "player_id" : context.state.pickedPlayer.id,
      "user_id":context.state.user.id
    });
    expect(axios.post).toHaveBeenCalledTimes(1)
    //expect(context.commit).toHaveBeenCalledWith("UpdateUserListInGame", context.state.userListInGame)

    let mockSocket = io('http://localhost:3000');
    let message = "message to send";

    expect(io).toHaveBeenCalledWith(`http://localhost:3000`)
    expect(io).toHaveBeenCalledTimes(1)
    await mockSocket.emit("player_added",message)
    expect(mockSocket.emit).toHaveBeenCalledTimes(1)
    expect(mockSocket.emit).toHaveBeenCalledWith("player_added",message)

    //expect(context.commit).toHaveBeenCalledWith("UpdateUserListInGame", context.state.userListInGame)

  });

  test('Error: an error occurred', () => {
    const errorMessage = 'Error addPick:';
    axios.post.mockResolvedValue(() =>
      Promise.reject(new Error(errorMessage))
    );
  });

});

describe('getDraftList', () => {
  test('Success: should return the list of the player available for the user and update draftList in the store', async () => {
    const context= {
      state: {
        selectedGame: {
          id:119
        },
        user: {
          id:1
        }
      },
      commit: jest.fn()
    }
    const response = {
      data: [ 
        { id:1, name: "Mbappe Kylian",goal: 18,price: 50,rate: 6.5,start_line_up: 61,club: {id: 15, name: "Paris"},position: {id: 6, name: "Attaquant"} },
        { id:4, name: "Di Maria Angel",goal: 8,price: 39,rate: 6.3,start_line_up: 82,club: {id: 15, name: "Paris"},position: {id: 5, name: "Milieu Offensif"} },
        { id:7, name: "Payet Dimitri",goal: 9,price: 33,rate: 6.3,start_line_up: 79,club: {id: 8, name: "Marseille"},position: {id: 5, name: "Milieu Offensif"} }
      ]
    };

    axios.post.mockResolvedValue(response) //OR axios.post.mockImplementationOnce(() => Promise.resolve(response));
    await actions.getDraftList(context)
    expect(axios.post).toHaveBeenCalledWith("api/player_list_left_for_draft",{
      "user_id":context.state.user.id,
      "game_id":context.state.selectedGame.id
    });
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(context.commit).toHaveBeenCalledWith("UpdateDraftList", response.data)

  });

  test('Error: an error occurred', () => {
    const errorMessage = 'Error getDraftList:';
    axios.post.mockResolvedValue(() =>
      Promise.reject(new Error(errorMessage))
    );
  });

});

describe('getUserListInGame', () => {
  test('Success: should return the list of the user in the game and update userListInGame in the store', async () => {
    const context= {
      state: {
        selectedGame: {
          id:119
        }
      },
      commit: jest.fn()
    }
    const response = {
      data: [ 
        {
          id:1,
          username: "Damien",
          user_games:[
            {
              game_id:119,
              game_order:1,
              turn_to_pick: true,
              user_id:1,
              way_id:1
            }
          ]
        },{
          id:19,
          username: "Damien2",
          user_games:[
            {
              game_id:119,
              game_order:2,
              turn_to_pick: false,
              user_id:19,
              way_id:1
            }
          ]
        }
      ]
    };

    axios.post.mockResolvedValue(response) //OR axios.post.mockImplementationOnce(() => Promise.resolve(response));
    await actions.getUserListInGame(context)
    expect(axios.post).toHaveBeenCalledWith("api/user_in_game",{
      "game_id":context.state.selectedGame.id
    });
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(context.commit).toHaveBeenCalledWith("UpdateUserListInGame", response.data)

  });

  test('Error: an error occurred', () => {
    const errorMessage = 'Error getUserListInGame:';
    axios.post.mockResolvedValue(() =>
      Promise.reject(new Error(errorMessage))
    );
  });

});

describe('getPickedTeamByUser', () => {
  test('Success: should return the player picked by the user selected and update pickTeam in the store', async () => {
    const context= {
      state: {
        user: {
          id:1
        },
        selectedUser: {
          id:2
        },
        selectedGame: {
          id:119
        }
      },
      commit: jest.fn()
    }
    const response = {
      data: [ 
        { 
          player: { id:1, name: "Mbappe Kylian",club: {id: 15, name: "Paris"},position: {id: 6, name: "Attaquant"} } 
        },{
          player: { id:4, name: "Di Maria Angel",club: {id: 15, name: "Paris"},position: {id: 5, name: "Milieu Offensif"} }
        },{
          player: { id:7, name: "Payet Dimitri",club: {id: 8, name: "Marseille"},position: {id: 5, name: "Milieu Offensif"} }
        }
      ]
    };

    axios.post.mockResolvedValue(response) //OR axios.post.mockImplementationOnce(() => Promise.resolve(response));
    await actions.getPickedTeamByUser(context)
    expect(axios.post).toHaveBeenCalledWith("api/picked_player_in_game_by_a_user",{
      "game_id" : context.state.selectedGame.id,
      "user_id": context.state.selectedUser.id
    });
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(context.commit).toHaveBeenCalledWith("UpdatePickTeam", response.data)
  });

  test('Success: should return the player picked by the user and update pickTeam in the store', async () => {
    const context= {
      state: {
        user: {
          id:1
        },
        selectedUser: {},
        selectedGame: {
          id:119
        }
      },
      commit: jest.fn()
    }
    const response = {
      data: [ 
        { 
          player: { id:1, name: "Mbappe Kylian",club: {id: 15, name: "Paris"},position: {id: 6, name: "Attaquant"} } 
        },{
          player: { id:4, name: "Di Maria Angel",club: {id: 15, name: "Paris"},position: {id: 5, name: "Milieu Offensif"} }
        },{
          player: { id:7, name: "Payet Dimitri",club: {id: 8, name: "Marseille"},position: {id: 5, name: "Milieu Offensif"} }
        }
      ]
    };

    axios.post.mockResolvedValue(response) //OR axios.post.mockImplementationOnce(() => Promise.resolve(response));
    await actions.getPickedTeamByUser(context)
    expect(axios.post).toHaveBeenCalledWith("api/picked_player_in_game_by_a_user",{
      "game_id" : context.state.selectedGame.id,
      "user_id": context.state.user.id
    });
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(context.commit).toHaveBeenCalledWith("UpdatePickTeam", response.data)
  });

  test('Error: an error occurred', () => {
    const errorMessage = 'Error getPickedTeamByUser:';
    axios.post.mockResolvedValue(() =>
      Promise.reject(new Error(errorMessage))
    );
  });

});

describe('getOpponentList', () => {
  test('Success: should return the opponent list available to create a new game and update opponentList in the store', async () => {
    const context= {
      state: {
        user: {
          id:1
        }
      },
      commit: jest.fn()
    }
    const response = {
      data: [ 
        { id:1, username: "Opponent1" },
        { id:2, username: "Opponent2" },
        { id:3, username: "Opponent3" },
        { id:4, username: "Opponent4" }
      ]
    };

    axios.post.mockResolvedValue(response) //OR axios.post.mockImplementationOnce(() => Promise.resolve(response));
    await actions.getOpponentList(context)
    expect(axios.post).toHaveBeenCalledWith("api/opponent_list_new_game",{
      "user_id":context.state.user.id
    });
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(context.commit).toHaveBeenCalledWith("UpdateOpponentList", response.data)

  });

  test('Error: an error occurred', () => {
    const errorMessage = 'Error getOpponentList:';
    axios.post.mockResolvedValue(() =>
      Promise.reject(new Error(errorMessage))
    );
  });

});