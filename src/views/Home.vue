<template>
  <div class="main">
    <v-app-bar color="#f00b51" fixed>
      <v-toolbar-title class="toolbar-sfeir-athlon" @click="getEvents"> Sfeir'Athlon Admin</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="showTl = true">
        <v-icon color="white">mdi-account-group</v-icon>
      </v-btn>

    </v-app-bar>
    <v-content class="content">
      <v-container class="container-event" fluid grid-list-lg>
        <event v-for="event in events"
              :key="event.identifier"
              :team-leaders="teamLeaders"
              :event="event"
              :update-method="refreshEvents"></event>
      </v-container>
    </v-content>

    <v-btn id="addTl"
          fixed
          fab
          bottom
          right
          color="#f00b51"
          @click="showCompetitor = true">
      <v-icon color="#FFFFFF">mdi-account-multiple-plus</v-icon>
    </v-btn>

    <v-dialog v-model="showCompetitor" width="310">
      <competitor v-if="showCompetitor" :team-leader="{}" :update-event="refreshEvents"></competitor>
    </v-dialog>

    <v-btn id="addbtn"
          fixed
          fab
          bottom
          right
          color="#f00b51"
          @click="showEvent = true">
      <v-icon color="#FFFFFF">mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="showEvent" persistent>
      <event-form v-if="showEvent" :eventId="''" :team-leaders="teamLeaders" :update-event="refreshEvents"></event-form>
    </v-dialog>

    <v-dialog v-model="showTl" fullscreen transition="dialog-bottom-transition">
      <teams :update-method="refreshEvents"></teams>
    </v-dialog>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="86"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import db from '../firebase/firestoreInit'
import Event from './Event'
import EventForm from './EventForm'
import Competitor from './Competitor'
import Teams from './Teams'

export default {
  components: { Event, EventForm, Competitor, Teams },
  name: 'home',
  data () {
    return {
      overlay: false,
      teamLeaders: [],
      events: [],
      showEvent: false,
      showCompetitor: false,
      showTl: false,
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
      this.showEvent = false
      this.showTl = false
      this.showCompetitor = false
      this.getEvents()
    },
    /**
     * Get all the team leader of sfeir.
     */
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
      this.overlay = true
      this.events = []
      db.collection('events-2019').get().then((querySnapshot) => {
        this.events = []
        querySnapshot.forEach((doc) => {
          this.events.push({
            'identifier': doc.id,
            'url': doc.data().url,
            'name': doc.data().name,
            'register': doc.data().register,
            'date': doc.data().date,
            'eventDate': new Date(doc.data().date.seconds * 1000),
            'classement': doc.data().individualClassement.map(c => {
              c.teamleader = {}
              return c
            }).sort((a, b) => a.rank - b.rank)
          })
        })
        this.events = this.events.sort((a, b) => b.date.seconds - a.date.seconds)
        this.overlay = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  color:grey;
}
.toolbar-sfeir-athlon {
  color:#FFFFFF;
  font-weight:100;
  font-family:Montserrat,sans-serif;
}
.content {
  color: #4c4b5e
}
.container-event {
  background-color:white;
  padding-top: 80px;
}
#addbtn {
  bottom: 30px;
}
#addTl {
  bottom: 110px;
}
</style>
