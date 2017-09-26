<template>
  <v-dialog v-model="dialog" width="350px" persistent>
    <v-btn fab  accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
     <v-container>
       <v-layout row wrap>
         <v-flex xs12>
          <v-card-title>
            Edit Meetup
          </v-card-title>
         </v-flex>
       </v-layout>
       <v-divider></v-divider>
       <v-layout row wrap>
         <v-flex xs12>
           <v-card-text>
             <v-text-field
               label="Title"
               name="title"
               id="title"
               v-model="editTitle"
               required>
               >
             </v-text-field>
             <v-text-field
               label="Description"
               name="description"
               id="description"
               v-model="editDescription"
               multiLine
               required>
             </v-text-field>
           </v-card-text>
         </v-flex>
       </v-layout>
       <v-divider></v-divider>
       <v-layout>
         <v-flex xs12>
           <v-card-actions>
             <v-btn flat class="blue--text" @click="dialog = false">Close</v-btn>
             <v-btn flat class="blue--text" @click="onSaveChanged">Save</v-btn>
           </v-card-actions>
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
        editTitle: this.meetup.title,
        editDescription: this.meetup.description,
        dialog: false
      }
    },
    methods: {
      onSaveChanged () {
        if (this.editTitle.trim() === '' || this.editDescription.trim() === '') {
          return
        } else {
          this.dialog = false
          this.$store.dispatch('updateMeetupData', {
            id: this.meetup.id,
            title: this.editTitle,
            description: this.editDescription,
            date: this.meetup.date
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
