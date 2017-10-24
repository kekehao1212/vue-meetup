
import * as wilddog from 'wilddog'

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.wdkeys[id] = payload.wdkeys
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => {
        return meetup.id === payload
      }), 1)
      Reflect.deleteProperty(state.user.wdkeys, payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    changeUserFavoriteMeetup ({commit}, payload) {
      wilddog.sync()
    },
    registerUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      wilddog.sync().ref('/users/' + user.id).child('/registrations/').push(payload)
        .then((data) => {
          commit('setLoading', false)
          commit('registerUserForMeetup', {id: payload, wdkeys: data.key()})
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    unregisterUserFromMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.wdkeys) {
        return
      }
      const wdkeys = user.wdkeys[payload]
      wilddog.sync().ref('/users/' + user.id + '/registrations/' + wdkeys).remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
          commit('setError', error)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      if (payload.emailSignUp) {
        wilddog.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then((user) => {
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              wdkeys: {}
            }
            commit('setUser', newUser)
            commit('setLoading', false)
          }).catch((error) => {
            console.log(error)
            commit('setLoading', false)
            commit('setError', error)
          })
      } else {
        wilddog.auth().createUserWithPhoneAndPassword(payload.phoneNumber, payload.password)
          .then((user) => {
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              wdkeys: {}
            }
            commit('setUser', newUser)
            commit('setLoading', false)
          }).catch((error) => {
            console.log(error)
            commit('setLoading', false)
            commit('setError', error)
          })
      }
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      if (payload.emailSignIn) {
        wilddog.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then((user) => {
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              wdkeys: {}
            }
            commit('setUser', newUser)
            commit('setLoading', false)
          }).catch((error) => {
            console.log(error)
            commit('setLoading', false)
            commit('setError', error)
          })
      } else {
        wilddog.auth().signInWithPhoneAndPassword(payload.phoneNumber, payload.password)
          .then((user) => {
            const newUser = {
              id: user.uid,
              registerUserForMeetup: [],
              wdkeys: {}
            }
            commit('setUser', newUser)
            commit('setLoading', false)
          }).catch((error) => {
            console.log(error)
            commit('setLoading', false)
            commit('setError', error)
          })
      }
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [], wdkeys: {} })
    },
    fetchUserData ({commit, getters}) {
      console.log('fetch' + '/users/' + getters.user.id)
      commit('setLoading', true)
      wilddog.sync().ref('/users/' + getters.user.id + '/registrations/').once('value')
        .then(data => {
          const values = data.val()
          let registeredMeetups = []
          let wdkeys = {}
          for (let key in values) {
            registeredMeetups.push(values[key])
            wdkeys[values[key]] = key
          }
          const updateUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            wdkeys: wdkeys
          }
          commit('setUser', updateUser)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    logout ({commit}) {
      wilddog.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
