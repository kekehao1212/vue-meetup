<template>
  <v-container>
    <v-layout xs-12 justify-center>
      <v-flex sm8 md8>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header"><v-icon>mdi-tag-face</v-icon>My Registrations</div>
            <v-card v-for="item in registeredMeetups" :key="item.toString()">
              <v-card-title class="red--text lighten-1  app_title">
                {{item.title}}
                </v-card-title>
              <v-card-media
                :src="item.imageUrl"
                height="200px"></v-card-media>
              <v-card-text class="grey lighten-3">
                  <v-layout column>
                    <v-flex>
                      <span class="grey--text darken-4">Time: </span>{{item.date | date}}
                    </v-flex>
                    <v-flex>
                      <span class="grey--text darken-4">Location: </span>: {{item.location}}
                    </v-flex>
                    <v-flex>
                      <span class="grey--text darken-4">description: </span>: {{item.description}}
                    </v-flex>
                  </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header" ><v-icon>mdi-tag-heart</v-icon>My Favors</div>
            <v-card v-for="item in favors" :key="item.toString()">
              <v-card-title class="red--text lighten-1  app_title">
                {{item.title}}
              </v-card-title>
              <v-card-media
                :src="item.imageUrl"
                height="300px"></v-card-media>
              <v-card-text class="grey lighten-3">
                <v-layout column>
                  <v-flex>
                    <span class="grey--text darken-4">Time: </span>{{item.date | date}}
                  </v-flex>
                  <v-flex>
                    <span class="grey--text darken-4">Location: </span>: {{item.location}}
                  </v-flex>
                  <v-flex>
                    <span class="grey--text darken-4">description: </span>: {{item.description}}
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header"><v-icon>mdi-led-on</v-icon>My CreatedMeetups</div>
            <v-card v-for="item in createdMeetups" :key="item.toString()">
              <v-card-title class="red--text lighten-1  app_title">
                {{item.title}}
              </v-card-title>
              <v-card-media
                :src="item.imageUrl"
                height="200px"></v-card-media>
              <v-card-text class="grey lighten-3">
                <v-layout column>
                  <v-flex>
                    <span class="grey--text darken-4">Time: </span>{{item.date | date}}
                  </v-flex>
                  <v-flex>
                    <span class="grey--text darken-4">Location: </span>: {{item.location}}
                  </v-flex>
                  <v-flex>
                    <span class="grey--text darken-4">description: </span>: {{item.description}}
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    created () {
      this.$store.dispatch('makeFavors')
      this.$store.dispatch('makeRegistrations')
      this.$store.dispatch('makeCreatedMeetups')
    },
    data () {
      return {}
    },
    computed: {
      favors () {
        return this.$store.getters.favors
      },
      registeredMeetups () {
        return this.$store.getters.registeredMeetups
      },
      createdMeetups () {
        return this.$store.getters.createdMeetups
      }
    },
    method: {
    }
  }
</script>

<style scoped>
.app_title{
  font-size:20px;
  text-align: center;
  justify-content: center;
}
</style>
