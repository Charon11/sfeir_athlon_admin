<template>
  <div>
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title" @click="getTeamLeaders">Sfeir'Athlon Admin</span>
      </md-app-toolbar>
      <md-app-content>
        <competitor v-for="tl in teamLeaders" :updateMethod="getTeamLeaders" :teamLeader="tl"></competitor>
      </md-app-content>
    </md-app>
    <md-button class="md-fab md-primary" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Team Leader</md-dialog-title>
      <competitor-form :teamLeader="tl"></competitor-form>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">
          <md-icon>clear</md-icon></md-button>
        <md-button class="md-primary" @click="saveTeamLeader">
          <md-icon>save</md-icon></md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import db from '../firebase/firebaseInit'
  import Competitor from './Competitor.vue'
  import CompetitorForm from './Competitor-Form.vue'

  export default {

    components: {Competitor, CompetitorForm},
    name: 'home',
    data () {
      return {
        teamLeaders: [],
        showDialog: false,
        tl: {
          'identifier': ''
        }
      }
    },

    created () {
      this.getTeamLeaders()
    },
    methods: {
      getTeamLeaders () {
        this.teamLeaders = []
        db.collection('classement').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let tl = {
              'identifier': doc.id,
              'lastname': doc.data().lastname,
              'firstname': doc.data().firstname,
              'points': doc.data().points,
              'photo': doc.data().photo,
              'trigramme': doc.data().trigramme,
              'classement': doc.data().classement
            }
            this.teamLeaders.push(tl)
          })
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

  .md-app-content {
    max-height: 100vh;
  }

  .md-app {
    max-height: 100vh;
    border: 1px solid rgba(#000, .12);
  }

  .md-fab {
    position: fixed;
    bottom: 15px;
    right: 15px;
  }
</style>
