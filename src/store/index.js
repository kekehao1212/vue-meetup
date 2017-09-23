import Vue from 'vue'
import Vuex from 'vuex'
import * as wilddog from 'wilddog'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'http://www.hotel-discount.com/wp-content/uploads/New_york_times_square-terabass.jpg',
        title: 'one hello hello hello hello',
        id: 'jfldskajflk1',
        date: new Date(),
        description: 'Awesome',
        location: 'New York'
      },
      {
        imageUrl: 'http://static3.businessinsider.com/image/587502c0f10a9ac1348b74b7-1190-625/7-billion-dollar-mega-projects-that-will-transform-new-york-city-by-2035.jpg',
        title: 'two',
        id: 'adfdg',
        date: new Date(),
        description: 'Awesome',
        location: 'Paris'
      },
      {
        imageUrl: 'https://cdn.getyourguide.com/niwziy2l9cvz/5ufV8PnNLOosmaaO2Soq6U/276e23f2fd5fdf51113178ec8a93d12b/NewYork-911_memorial_and_museum-1500x850.JPG',
        title: 'three',
        id: 'pohkgphk2434',
        date: new Date(),
        description: 'Awesome',
        location: 'London'
      }],
    user: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
      console.log(state.loadedMeetups)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'gjiofjlksdjf;'
      }
      commit('createMeetup', meetup)
    },
    signUserUp ({commit}, payload) {
      wilddog.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
            registerMeetup: []
          }
          commit('setUser', newUser)
        }).catch((error) => {
          console.log(error)
        })
    },
    signUserIn ({commit}, payload) {
      wilddog.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
            registerMeetup: []
          }
          commit('setUser', newUser)
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    featuredMeetups (state, getters) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      }).slice(0, 5)
    },
    user (state) {
      return state.user
    }
  }
})
