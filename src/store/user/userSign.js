import * as wilddog from 'wilddog'
export default {
  actions: {
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
          })
          .catch((error) => {
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
      commit('setUser', {id: payload.uid, registeredMeetups: [], wdkeys: {}})
    },
    logout ({commit}) {
      wilddog.auth().signOut()
      commit('setUser', null)
    }
  }
}
