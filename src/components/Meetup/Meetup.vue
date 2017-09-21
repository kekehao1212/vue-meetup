<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-card-title>
            <h6 class="red--text darken-3">{{ meetup.title }}</h6>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="400px"
          >
          </v-card-media>
          <v-card-text>
            <h6 class="info--text">{{meetup.date | date}} - {{meetup.location}}</h6>
            {{meetup.description}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="red darken-3" dark>Register</v-btn>
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
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>

</style>
