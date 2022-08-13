import { createLocalVue, shallowMount } from '@vue/test-utils'
import store from '@/store'
import axios from 'axios'
import CreationDraft from '@/components/CreationDraft.vue'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select';
import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.use(vSelect)
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

/*Mocking of Axios*/
let url = ''
let body = {}
jest.mock("axios", () => ({
  post: jest.fn((_url, _body) => { 
    return new Promise((resolve) => {
      url = _url
      body = _body
      resolve(true)
    })
  }),
  get: jest.fn((_url) => { 
    return new Promise((resolve) => {
      url = _url
      resolve(true)
    })
  })
}))

afterEach(() => {
    // cleaning up the mess left behind the previous test
    jest.clearAllMocks();
});

describe('CreationDraft.vue', () => {
  const context= {
    state: {
      user: {
        id:1
      }
    }
  }
  const response = {
    data: [ 
      {
        id: 1,
        name: "French League 1"
      }
    ]
  };
  const wrapper = shallowMount(CreationDraft, {     
      localVue,
      store,
      data(){
        return {
          league: {
            /*id: 1,
            name: "French League 1"*/
          },
          creationGameForm : false,
          errors:[],
          newGameName:'',
          message: ''
        }
      },
      computed: {
        opponentList() {
          return [
            {
              id:2,
              username:"Opponent2"
            },{
              id:3,
              username:"Opponent3"
            },{
              id:4,
              username:"Opponent4"
            }
          ]
        }
      }
  });

  test('component is mounted and axios request are called when passed', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()[0]).toContain('creation_game')
    expect(axios.get).toHaveBeenCalledWith("api/league_list");
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledTimes(1)
  })

  test('the component display only the component title and the button to create a new game', () => {
    expect(wrapper.classes()[0]).toContain('creation_game')
    expect(wrapper.find("div:first-child > h4").text()).toBe("Creation Draft")
    expect(wrapper.find("div:first-child > div").classes()[0]).toBe('container-button')
    expect(wrapper.find("div:first-child > div > button").text()).toBe("Create a new Draft")
  })

  test('test of the click event to call the form of a game by the method toogleCreationGameForm',  async () => {
    //WE ARE TOTALLY REPLACING THE METHOD, ACCESSIBLE ON THE VM OF THE WRAPPER
    //COMPONENT RETURNED BY THE MOUNT FUNCTION
    wrapper.vm.toogleCreationGameForm = jest.fn()
    await wrapper.find(".create-form-button").trigger("click")
    expect(wrapper.vm.toogleCreationGameForm).toBeCalled()
  })

  test('the component display the form to create a game after the click',  async () => {
      wrapper.setData({ creationGameForm: true })
      //https://lmiller1990.github.io/vue-testing-handbook/simulating-user-input.html#creating-the-component
      await wrapper.vm.$nextTick() // "Wait for the DOM to update before continuing the test"
      expect(wrapper.find('.container-button').exists()).toBe(false)
      expect(wrapper.find('.creation-game-form').exists()).toBe(true)
      //expect(wrapper.find('.create-new-button').exists()).toBe(true)
  })

})