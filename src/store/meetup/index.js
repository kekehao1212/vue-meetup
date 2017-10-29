
import * as wilddog from 'wilddog'

export default {
  state: {
    loadedMeetups: [],
    favors: [],
    registeredMeetups: [],
    createdMeetups: []
  },
  mutations: {
    loadMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find((meetup) => {
        return payload.id === meetup.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    },
    favors (state, payload) {
      state.favors = payload
    },
    registeredMeetups (state, payload) {
      state.registeredMeetups = payload
    },
    createdMeetups (state, payload) {
      state.createdMeetups = payload
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
    favors (state) {
      return state.favors
    },
    registeredMeetups (state) {
      return state.registeredMeetups
    },
    createdMeetups (state) {
      return state.createdMeetups
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
              creatorId: obj[key].creatorId
            })
          }
          commit('loadMeetups', meetups)
          commit('setLoading', false)
        }).catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      wilddog.sync().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateMeetup', payload)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createMeetup ({commit, getters, dispatch}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let createdMeetupId
      wilddog.sync().ref('meetups').push(meetup)
        .then((data) => {
          const key = data.key()
          commit('createMeetup', {
            ...meetup,
            id: key
          })
          createdMeetupId = key
          dispatch('createUserMeetup', createdMeetupId)
        }).catch((error) => {
          console.log(error)
        })
    },
    makeFavors ({commit, getters}) {
      let favors = []
      let favorsIndex = getters.user.favors
      for (let index of favorsIndex) {
        favors.push(getters.loadedMeetup(index))
      }
      commit('favors', favors)
    },
    makeRegistrations ({commit, getters}) {
      let registeredMeetups = []
      let registeredMeetupsIndex = getters.user.registeredMeetups
      for (let index of registeredMeetupsIndex) {
        registeredMeetups.push(getters.loadedMeetup(index))
      }
      commit('registeredMeetups', registeredMeetups)
    },
    makeCreatedMeetups ({commit, getters}) {
      let createdMeetups = []
      let createdMeetupsIndex = getters.user.createdMeetups
      for (let index of createdMeetupsIndex) {
        createdMeetups.push(getters.loadedMeetup(index))
      }
      commit('createdMeetups', createdMeetups)
    }
  }
}
