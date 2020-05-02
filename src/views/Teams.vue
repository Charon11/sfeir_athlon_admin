<template>
  <v-card>
    <v-toolbar dark color="#f00b51">
      <v-toolbar-title>Team Leader</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon @click="updateMethod()" dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-list dense>
      <v-list-item-group>
        <v-list-item v-for="tl in teamLeaders" :key="tl.identifier">
          <v-list-item-content @click="chooseTeamLeader(tl)">
            {{ tl.firstname }} - {{ tl.lastname }}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-dialog v-model="showCompetitor">
      <competitor v-if="showCompetitor" :team-leader="teamLeader"></competitor>
    </v-dialog>
  </v-card>
</template>

<script>
import db from '../firebase/firestoreInit'
import Competitor from './Competitor'

export default {
  name: 'teams',
  props: ['updateMethod'],
  components: { Competitor },
  data () {
    return {
      teamLeaders: [],
      teamLeader: {},
      showCompetitor: false
    }
  },
  methods: {
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
        this.teamLeaders.sort(this.compare)
      })
    },
    chooseTeamLeader (tl) {
      this.showCompetitor = true
      this.teamLeader = tl
    },
    compare (a, b) {
      let comparison = 0
      if (a !== undefined && b !== undefined) {
        const firstnameA = a.firstname.toUpperCase()
        const firstnameB = b.firstname.toUpperCase()
        if (firstnameA > firstnameB) {
          comparison = 1
        } else if (firstnameA < firstnameB) {
          comparison = -1
        }
      }
      return comparison
    }
  },
  created () {
    this.getTeamLeaders()
  }
}
</script>
