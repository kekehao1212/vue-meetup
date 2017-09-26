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
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    loadMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      wilddog.sync().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              imageUrl: obj[key].imageUrl,
              description: obj[key].description,
              date: obj[key].date,
              creatorId: obj[key].id
            })
          }
          commit('loadMeetups', meetups)
          commit('setLoading', false)
        }).catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      wilddog.sync().ref('meetups').push(meetup)
        .then((data) => {
          const key = data.key().slice(1, data.key().length)
          commit('createMeetup', {
            ...meetup,
            id: key
          })
        }).catch((error) => {
          console.log(error)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      wilddog.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
            registerMeetup: []
          }
          commit('setUser', newUser)
          commit('setLoading', false)
        }).catch((error) => {
          console.log(error)
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      wilddog.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
            registerMeetup: []
          }
          commit('setUser', newUser)
          commit('setLoading', false)
        }).catch((error) => {
          console.log(error)
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    clearError ({commit}) {
      commit('clearError')
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', { id: payload.uid, registerMeetup: [] })
    },
    logout ({commit}) {
      wilddog.auth().signOut()
      commit('setUser', null)
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
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }
})
