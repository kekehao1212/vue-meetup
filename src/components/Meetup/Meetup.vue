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
            <h6 class="info--text">{{meetup.date | date}} - {{meetup.location}}</h6>
            <div v-if="userIsCreator">
              <edit-meetup-date :meetup="meetup"></edit-meetup-date>
              <edit-meetup-time :meetup="meetup"></edit-meetup-time>
            </div>
            <div>{{meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <register-meetup :meetupId="meetup.id" v-if="!userIsCreator && userIsAuthenticated"></register-meetup>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    props: ['id'],
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
      }
    }
  }
</script>

<style scoped>

</style>
