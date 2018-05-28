<template>

  <section class="event">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div class="headline" style="width: 100%">
              <a :href="url">{{event.name}}</a>
            </div>
            <div style="width: 100%">{{event.date | date}}</div>
          </v-card-title>

          <v-card-text>
            <v-expansion-panel>
              <v-expansion-panel-content>
                <div slot="header">Classement</div>
                <v-list>
                  <v-list-tile v-for="rank in event.classement">
                    <v-list-tile-content>
                      <event-rank :eventRank="rank"></event-rank>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>

          <v-card-actions>
            <v-btn flat @click="showDialog = true">
              <v-icon>create</v-icon>
            </v-btn>
            <v-btn flat @click="showSnackbar = true">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="showDialog">

      <event-form :eventId="event.identifier" :team-leaders="teamLeaders" :updateEvent="updateEvent"></event-form>

    </v-dialog>

    <v-snackbar
      bottom
      :timeout="duration"
      v-model="showSnackbar">
      <span>Are you sure you want to delete {{event.name}} ?!</span>
      <v-btn flat class="md-primary" @click="showSnackbar = false">No</v-btn>
      <v-btn flat class="md-primary" @click="deleteEvent">Yes</v-btn>
    </v-snackbar>

  </section>

</template>

<script lang="js">
  import db from '../firebase/firestoreInit'
  import EventRank from './Event-Rank'
  import EventForm from './Event-Form'

  export default {
    name: 'event',
    components: {EventForm, EventRank},
    props: ['event', 'teamLeaders', 'updateMethod'],
    mounted () {

    },
    data () {
      return {
        showDialog: false,
        showSnackbar: false,
        position: 'center',
        duration: 4000,
        isInfinity: false
      }
    },
    created () {
    },

    methods: {
      deleteEvent () {
        db.collection('events').doc(this.event.identifier).delete()
          .then(() => {
            this.showSnackbar = false
            this.updateMethod()
          })
      },

      updateEvent () {
        this.showDialog = false
        this.updateMethod()
      }
    },
    computed: {
      url () {
        return this.event ? this.event.url : ''
      }
    }
  }
</script>

<style scoped lang="scss">


  section {
    width: 95%;
    max-width: 380px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
