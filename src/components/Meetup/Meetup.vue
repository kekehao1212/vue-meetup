<template>
  <v-container>
    <v-layout row v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          v-bind:size="100"
          class="red--text mt-5"
          :width="4"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex>
        <v-card>
          <v-card-title>
            <h6 class="red--text darken-3">{{ meetup.title }}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-meetup-detail :meetup="meetup"></edit-meetup-detail>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="400px"
          >
          </v-card-media>
          <v-card-text>
            <div class="card-text">
              <h6 class="info--text" fullWidth>{{meetup.date | date}} - {{meetup.location}}</h6>
              <v-spacer></v-spacer>
              <div v-if="userIsCreator" class="templ">
                <edit-meetup-date :meetup="meetup"></edit-meetup-date>
                <edit-meetup-time :meetup="meetup"></edit-meetup-time>
              </div>
            </div>
            <div class="description">{{meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <register-meetup :meetupId="meetup.id" v-if="!userIsCreator && userIsAuthenticated"></register-meetup>
          </v-card-actions>
          <template>
            <v-layout>
              <v-flex>
                <v-btn flat icon @click="changeFavorite">
                  <v-icon :class="isFavorite">favorite</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    props: ['id'],
    data () {
      return {
        userFavorited: false
      }
    },
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== undefined && this.$store.getters.user !== null
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        } else {
          return this.$store.getters.user.id === this.meetup.creatorId
        }
      },
      loading () {
        return this.$store.getters.loading
      },
      isFavorite () {
        return this.userFavorited ? 'red--text' : 'grey--text'
      }
    },
    methods: {
      changeFavorite () {
        this.userFavorited = !this.userFavorited
        this.$store.dispatch('changeUserFavors', {
          meetupId: this.id,
          isFavorite: this.userFavorited
        })
      }
    },
    created () {
      if (!this.$store.getters.user || !this.$store.getters.user.hasOwnProperty('favors')) {
        return
      }
      let favors = this.$store.getters.user.favors
      if (favors.find((item) => {
        return item === this.id
      })) {
        this.userFavorited = true
      } else {
        this.userFavorited = false
      }
    }
  }
</script>

<style scoped>
  @import '../../mdi/css/materialdesignicons.min.css';

  .favorie_btn {
    display: flex;
    flex-direction: column;
  }

  .description {
    text-indent: 5px;
    font-size: 16px;
  }

  .card-text {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .templ {
    display: flex;
  }
</style>
