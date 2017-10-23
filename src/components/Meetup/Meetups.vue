<template>
  <v-container >
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
    <v-container v-else grid-list-md fluid>
      <v-layout justify-center class="hidden-xs-only mb-5">
        <v-flex xs12 md12 sm12>
          <v-card>
            <v-card-media
              class="white--text"
              height="500px"
              :src="headMeetup.imageUrl">
            <v-layout fill-height justify-space-between d-flex>
              <v-flex xs12 md4 sm6 class="ma-4">
                <span class="headline">{{headMeetup.title}}</span>
              </v-flex>
              <v-flex xs12 md4 sm6 d-flex align-end class="ma-4">
                  <span  class="headline">{{headMeetup.location}}<br><span class="headline">{{headMeetup.date | date}}</span></span>
                <v-btn
                  absolute
                  fab
                  dark
                  class="red darken-1"
                  around
                  right
                  :to="'/meetup/' + headMeetup.id">
                  <v-icon dark>list</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout  wrap>
        <v-flex xs12 sm6 md4 v-for="meetup in meetups" :key="meetup.id">
          <v-card class="m-4">
            <v-container>
              <v-layout justify-center row wrap>
                <v-flex md12 xs12 sm12>
                  <v-card-media
                    :src="meetup.imageUrl"
                    height="200px"
                  >
                  </v-card-media>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-card-title>
                    <div>
                      <h5 class="mb-0" style="font-weight: 500">{{meetup.title}}</h5>
                      <div class="mb-1"><span>Loaction:</span><span class="red--text darken-4">  {{meetup.location}}</span></div>
                      <div><span>Date:</span><span class="red--text darken-4">  {{meetup.date | date}}</span></div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      flat
                      :to="'/meetup/' + meetup.id">
                      <v-icon light left>arrow_forward</v-icon>
                      Look the  Meetup
                    </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      meetups () {
        return this.$store.getters.loadedMeetups
      },
      loading () {
        return this.$store.getters.loading
      },
      headMeetup () {
        return this.meetups[this.meetups.length - 1]
      }
    }
  }
</script>

<style scoped>

</style>
