<template>
  <v-dialog v-model="editRegister" width="350px" persistent>
    <v-btn  accent slot="activator" class="red darken-3" dark>
      {{userIsRegistered ? 'UnRegister' : 'Register' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">UnRegister from Meetup?</v-card-title>
            <v-card-title v-else>Register for Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change you decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="red--text darken-1" @click="editRegister = false">Cancel</v-btn>
              <v-btn flat class="green--text darken-1" @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetupId'],
    data () {
      return {
        editRegister: false
      }
    },
    computed: {
      userIsRegistered () {
        return (this.$store.getters.user.registeredMeetups.findIndex((meetupId, index) => {
          return meetupId === this.meetupId
        }) >= 0)
      }
    },
    methods: {
      onAgree () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
        } else {
          this.$store.dispatch('registerUserForMeetup', this.meetupId)
        }
      }
    }
  }
</script>

<style scoped>

</style>
