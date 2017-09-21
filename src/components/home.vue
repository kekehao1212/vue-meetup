<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12  sm6 md3 offset-md3 class="text-sm-right text-xs-center text-md-right">
        <v-btn
          large
          class="primary"
          router
          :to="meetupPath">
          explore meetups
        </v-btn>
      </v-flex>
      <v-flex xs12 md3 sm6 class="text-sm-left text-xs-center text-md-left">
        <v-btn
          large
          class="primary"
          :to="createMeetupPath">
          organize meetups
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md10 offset-md1>
        <template>
          <v-carousel style="cursor : pointer">
            <v-carousel-item
              v-for="meetup in meetups"
              :key="meetup.title"
              :src="meetup.imageUrl"
              @click="onLoadMeetup(meetup.id)">
              <div class="title">
                {{meetup.title}}
              </div>
            </v-carousel-item>
          </v-carousel>
        </template>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    computed: {
      meetups () {
        return this.$store.getters.loadedMeetups
      }
    },
    data () {
      return {
        meetupPath: '/Meetups',
        createMeetupPath: '/Meetup/new'
      }
    },
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetup/' + id)
      }
    }
  }
</script>

<style scoped>
.title{
  position:absolute;
  bottom:60px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>
