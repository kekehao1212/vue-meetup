<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm7 offset-sm3 md6 offset-md3>
        <h4 class="grey--text darken-3">Create a new Meetup</h4>
      </v-flex>
    </v-layout>
    <form @submit.prevent="onCreateMeetup">
      <v-layout row>
        <v-flex xs12 sm6 md5 offset-sm3>
          <v-text-field
            label="Title"
            name="title"
            id="title"
            v-model="title"
            required>
          >
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm6 md5 offset-sm3>
          <v-text-field
            label="Location"
            name="location"
            id="location"
            v-model="location"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm6 md5 offset-sm3>
          <v-text-field
            label="ImageUrl"
            name="imageUrl"
            id="imageUrl"
            v-model="imageUrl"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm6 md5 offset-sm3>
          <img :src="imageUrl" alt="" height="150px">
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm6 md5 offset-sm3>
          <v-text-field
            label="Description"
            name="description"
            id="description"
            v-model="description"
            multiLine
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md5 offset-sm3>
          <v-dialog
            persistent
            lazy
          >
            <v-text-field
              slot="activator"
              label="Chose meetup date"
              v-model="date"
              prepend-icon="date_range"
              readonly></v-text-field>
            <v-date-picker v-model="date" autosave>
            </v-date-picker>
          </v-dialog>
        </v-flex>
        <v-flex xs12 offset-sm3>
          <v-dialog
            persistent
            lazy
          >
            <v-text-field
              slot="activator"
              label="Picker in dialog"
              v-model="time"
              prepend-icon="access_time"
              readonly
            ></v-text-field>
            <v-time-picker v-model="time" autosave format="24hr">
            </v-time-picker>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm5 md5 offset-sm3>
          <v-btn class="primary"
                 :disabled="!formIsVaild"
                  type="submit">
            Create Meetup
          </v-btn>
        </v-flex>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        imageUrl: '',
        location: '',
        description: '',
        date: null,
        time: null
      }
    },
    computed: {
      formIsVaild () {
        return this.title !== '' &&
            this.imageUrl !== '' &&
            this.location !== '' &&
            this.description !== ''
      },
      submitDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          const hour = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hour)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      onCreateMeetup () {
        if (!this.formIsVaild) {
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: this.submitDateTime
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      }
    }
  }
</script>

<style scoped>

</style>
