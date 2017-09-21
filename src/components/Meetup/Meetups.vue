<template>
  <v-container>
    <v-layout row v-for="meetup in meetups" :key="meetup.id">
      <v-flex d-flex xs12 sm10 md8 offset-md2 offset-sm1>
        <v-card class="cyan mb-4" >
          <v-container fluid>
            <v-layout>
              <v-flex md3 xs5 sm4>
                <v-card-media
                  :src="meetup.imageUrl"
                  height="130px"
                  >
                </v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title>
                  <div>
                    <h5 class="white--text mb-0" >{{meetup.title}}</h5>
                    <div>{{meetup.date | date}}</div>
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
      }
    }
  }
</script>

<style scoped>

</style>
