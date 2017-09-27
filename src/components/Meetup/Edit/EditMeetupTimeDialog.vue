<template>
  <v-dialog v-model="editDialog" width="350px" persistent>
    <v-btn  accent slot="activator">
      Edit Time
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>
              Edit Meetup Time
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%;" actions format="24hr">
              <template scope="{save, cancel}">
                <v-btn class="blue--text darken-1" flat @click.native="onSaveCancel">
                  Close
                </v-btn>
                <v-btn class="blue--text" flat @click.native="onSaveChanged">
                  Save
                </v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        editDialog: false,
        editableTime: null
      }
    },
    methods: {
      onSaveCancel () {
        this.editableTime = new Date(this.meetup.date).toTimeString()
        this.editDialog = false
      },
      onSaveChanged () {
        const newDate = new Date(this.meetup.date)
        const hour = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hour)
        newDate.setMinutes(minutes)
        console.log()
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    created () {
      this.editableTime = new Date(this.meetup.date).toTimeString()
      console.log(this.editableTime)
    }
  }
</script>

<style scoped>

</style>
