<template>
  <div>
    <v-app>
      <v-toolbar color="indigo" fixed app>
        <v-toolbar-title @click="getEvents">Sfeir'Athlon Admin</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
        >
            <event v-for="event in events" 
              :key="event.identifier"
              :team-leaders="teamLeaders" :event="event"
              :update-method="refreshEvents"></event>
        </v-container>
      </v-content>

      <v-btn
        id="addbtn"
        fixed
        fab
        bottom
        right
        color="pink"
        @click="showDialog = true"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-app>

    <v-dialog v-model="showDialog">
        <event-form :eventId="''" :team-leaders="teamLeaders" :update-event="refreshEvents"></event-form>
    </v-dialog>

  </div>
</template>

<script>
  import db from '../firebase/firestoreInit'
  import Competitor from './Competitor.vue'
  import CompetitorForm from './Competitor-Form.vue'
  import Event from './Event'
  import EventForm from './Event-Form'

  export default {

    components: {EventForm, Event, Competitor, CompetitorForm},
    name: 'home',
    data () {
      return {
        teamLeaders: [],
        events: [],
        showDialog: false,
        tl: {
          'identifier': ''
        },
        event: {
          'identifier': null
        }
      }
    },

    created () {
      this.getTeamLeaders()
      this.getEvents()
    },
    methods: {

      refreshEvents () {
        this.showDialog = false
        this.getEvents()
      },

      getTeamLeaders () {
        db.collection('team-leaders').get().then((querySnapshot) => {
          this.teamLeaders = []
          querySnapshot.forEach((doc) => {
            let tl = {
              'identifier': doc.id,
              'lastname': doc.data().lastname,
              'firstname': doc.data().firstname,
              'photo': doc.data().photo
            }
            this.teamLeaders.push(tl)
          })
        })
      },
      /**
       * Get all the events produce by sfeir.
       */
      getEvents () {
        this.events = []
        db.collection('events').get().then((querySnapshot) => {
          this.events = []
          querySnapshot.forEach((doc) => {
            this.events.push({
              'identifier': doc.id,
              'url': doc.data().url,
              'name': doc.data().name,
              'register': doc.data().register,
              'date': doc.data().date,
              'eventDate': new Date(doc.data().date.seconds * 1000),
              'classement': doc.data().classement.map(c => {
                c.teamleader = {}
                return c
              }).sort((a, b) => a.rank - b.rank)
            })
          })
          this.events = this.events.sort((a, b) => b.date.seconds - a.date.seconds)
        })
      },

      saveTeamLeader () {
        db.collection('classement').doc().set(
          {
            'lastname': this.tl.lastname,
            'firstname': this.tl.firstname,
            'points': this.tl.points,
            'classement': this.tl.classement,
            'photo': this.tl.photo,
            'trigramme': this.tl.trigramme
          }).then(() => {
          this.tl = {
            'identifier': ''
          }
          this.showDialog = false
          this.getTeamLeaders()
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  #addbtn {
    bottom: 30px;
  }
</style>
