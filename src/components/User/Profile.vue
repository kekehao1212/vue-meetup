<template>
  <v-container>
    <v-layout xs-12 justify-center>
      <v-flex sm8 md8>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">My Registrations</div>
            <v-card >
              <v-card-title>
                hello
                </v-card-title>
              <v-card-media :src=""></v-card-media>
              <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">My Favors</div>
            <v-card>
              <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    data () {
    },
    computed: {
      favors () {
        return this.$store.users.favors
      },
      registrations () {
        return this.$store.users.registrations
      }
    },
    method: {
      favor (id) {
        return this.$store.getters.loadedMeetup(this.id)
      },
      registration (id) {
        return this.$store.getters.loadedMeetup(this.id)
      }
    }
  }
</script>

<style scoped>

</style>
