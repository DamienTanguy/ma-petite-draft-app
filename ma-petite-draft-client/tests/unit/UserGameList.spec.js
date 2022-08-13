import { createLocalVue, shallowMount } from '@vue/test-utils'
import store from '@/store'
import UserGameList from '@/components/UserGameList.vue'
import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

describe('UserGameList.vue', () => {
  
  const wrapper = shallowMount(UserGameList, {     
      localVue,
      store,
      data(){
        return {
          gameListDisplay:true,
          gameDetails: {
            game_state: {id: 1, name: "On-Going"},
            league: {name: "French League 1"},
            name: "name_1",
            username_turn_to_pick: "Damien",
            user_games: [
              {
                turn_to_pick: true,
                user: {
                  id: 1,
                  username: "Damien",
                  picked_player_in_games: [
                    {
                      player:{
                        club: {id: 15, name: "Paris"},
                        goal: 8,
                        id: 4,
                        name: "Di Maria Angel",
                        position: {id: 5, name: "Milieu Offensif"},
                        position_id: 5,
                        price: 39,
                        rate: 6.3,
                        start_line_up: 82
                      }
                    },{
                      player:{
                        club: {id: 15, name: "Paris"},
                        goal: 13,
                        id: 5,
                        name: "Neymar",
                        position: {id: 6, name: "Attaquant"},
                        position_id: 6,
                        price: 37,
                        rate: 6.9,
                        start_line_up: 54
                      }
                    }
                  ]
                }

              },{
                turn_to_pick: false,
                user: {
                  id: 12,
                  username: "U12",
                  picked_player_in_games: [
                    {
                      player:{
                        club: {id: 8, name: "Marseille"},
                        goal: 9,
                        id: 7,
                        name: "Payet Dimitri",
                        position: {id: 5, name: "Milieu Offensif"},
                        position_id: 5,
                        price: 33,
                        rate: 6.3,
                        start_line_up: 79
                      }
                    },{
                      player:{
                        club: {id: 15, name: "Paris"},
                        goal: 12,
                        id: 3,
                        name: "Icardi Mauro",
                        position: {id: 6, name: "Attaquant"},
                        position_id: 6,
                        price: 41,
                        rate: 5.8,
                        start_line_up: 50
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      },
      //https://stackoverflow.com/questions/50437699/setting-up-vue-computed-properties-for-unit-tests-with-vue-test-utils
      computed: {
        gameList() {
          return [
            {
              id:1,
              name:"name_1",
              game_state:{name:"0n-Going"}
            },{
              id:2,
              name:"name_2",
              game_state:{name:"Finish"}
            }
          ]
        }
      }
  });

  test('component is mounted when passed', () => {
    //The mount function will return Vue instance wrapper of the component passed in.
    //Unlike mount function, shallowMount function will just load the component itself ignoring the child component(s).
    //If you want to write unit tests for a component, then shallowMount function is the right choice.
    //const wrapper = shallowMount(UserGameList, { store });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()[0]).toContain('user_game_list')
  })

  test('the component display the list of game', () => {
    expect(wrapper.find("div:first-child > h4").text()).toBe("Your Draft")
    expect(wrapper.find('.table-game-list').exists()).toBe(true)
    expect(wrapper.find('.title-box').exists()).toBe(false)
    expect(wrapper.find("div:first-child > table").classes()[0]).toBe('table-game-list')
    expect(wrapper.findAll('button')).toHaveLength(2) //depreciate soon --> to use findAllComponents instead 
  })

  test('test of the click event to call the details of a game by the method DisplayGameDetails',  async () => {
    //https://alexjover.com/blog/test-properties-and-custom-events-in-vue-js-components-with-jest/
    //USING A SPY THE ORIGINAL METHOD WILL BE CALLED
    /*const spy = spyOn(wrapper.vm, "DisplayGameDetails");
    await wrapper.find(".details-button").trigger("click");
    expect(wrapper.vm.DisplayGameDetails).toBeCalled();*/

    //WE ARE TOTALLY REPLACING THE METHOD, ACCESSIBLE ON THE VM OF THE WRAPPER
    //COMPONENT RETURNED BY THE MOUNT FUNCTION
    wrapper.vm.DisplayGameDetails = jest.fn()
    await wrapper.find(".details-button").trigger("click")
    expect(wrapper.vm.DisplayGameDetails).toBeCalled()

    //SetMethods is deprecated and will be removed in the next major version
    /*const DisplayGameDetailsMock = jest.fn();
    wrapper.setMethods({ DisplayGameDetails: DisplayGameDetailsMock });
    await wrapper.find('.details-button').trigger('click');
    expect(DisplayGameDetailsMock).toBeCalled();*/
  })

  test('the component display the details of a game after the click',  async () => {
      wrapper.setData({ gameListDisplay: false })
      //https://lmiller1990.github.io/vue-testing-handbook/simulating-user-input.html#creating-the-component
      await wrapper.vm.$nextTick() // "Wait for the DOM to update before continuing the test"

      expect(wrapper.find('.table-game-list').exists()).toBe(false)
      expect(wrapper.find('.title-box').exists()).toBe(true)
      expect(wrapper.find('.user_label_table').exists()).toBe(true)
      expect(wrapper.find(".title-box > p").text()).toContain("name_1 (On-Going)")
  })

  test('test of the click event to return to the game list by the method DisplayGameList',  async () => {
    //WE ARE TOTALLY REPLACING THE METHOD, ACCESSIBLE ON THE VM OF THE WRAPPER
    //COMPONENT RETURNED BY THE MOUNT FUNCTION
    wrapper.vm.DisplayGameList = jest.fn()
    await wrapper.find("#back-to-list-button").trigger("click")
    expect(wrapper.vm.DisplayGameList).toBeCalled()
  })

})