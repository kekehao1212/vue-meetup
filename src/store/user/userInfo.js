import * as wilddog from 'wilddog'
import router from '../../router'

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
    createUserMeetup ({commit, getters}, payload) {
      let updateUser = getters.user
      console.log(payload)
      wilddog.sync().ref('/users/' + getters.user.id).child('/createdMeetups').push(payload)
        .then((data) => {
          updateUser.createdMeetups.unshift(payload)
          commit('setUser', updateUser)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeUserFavors ({commit, getters}, payload) {
      if (getters.user == null) {
        router.push('/Signin')
        return
      }
      let favors = getters.user.favors
      let updateUser = getters.user
      if (payload.isFavorite) {
        favors.unshift(payload.meetupId)
        wilddog.sync().ref('/users/' + getters.user.id + '/favors').push(payload.meetupId)
          .then((data) => {
            updateUser.favors = favors
            commit('setUser', updateUser)
          })
          .catch((error) => {
            commit('setError', error)
            console.log('error')
          })
      } else {
        favors.splice(favors.findIndex((item) => {
          return item === payload.meetupId
        }), 1)
        wilddog.sync().ref('/users/' + getters.user.id + '/favors').remove(payload.meetupId)
          .then((data) => {
            updateUser.favors = favors
            commit('setUser', updateUser)
          })
          .catch((error) => {
            commit('setError', error)
            console.log('error')
          })
      }
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
    fetchUserData ({commit, getters, dispatch}) {
      function getArray (obj) {
        let arr = []
        for (let key in obj) {
          arr.push(obj[key])
        }
        return arr
      }
      commit('setLoading', true)
      wilddog.sync().ref('/users/' + getters.user.id).once('value')
        .then(data => {
          const registerValues = data.val()['registrations']
          const favorsValues = data.val()['favors']
          const createdValues = data.val()['createdMeetups']
          let favors = getArray(favorsValues)
          let createdMeetups = getArray(createdValues)
          let wdkeys = {}
          let registeredMeetups = []
          for (let key in registerValues) {
            registeredMeetups.push(registerValues[key])
            wdkeys[registerValues[key]] = key
          }
          const updateUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            wdkeys: wdkeys,
            favors: favors,
            createdMeetups: createdMeetups
          }
          console.log(updateUser)
          commit('setUser', updateUser)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
