<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title">Sfeir'Athlon Admin</span>
      </md-app-toolbar>
      <md-app-content>
        <competitor v-for="tl in teamLeaders" :teamLeader="tl"></competitor>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  import db from '../firebase/firebaseInit'
  import Competitor from './Competitor.vue'
  export default {

    components: {Competitor},
    name: 'main',
    data () {
      return {
        teamLeaders: []
      }
    },

    created () {
      this.getTeamLeaders()
    },
    methods: {
      getTeamLeaders () {
        db.collection('classement').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let tl = {
              'lastname': doc.data().lastname,
              'firstname': doc.data().firstname,
              'points': doc.data().points,
              'classement': doc.data().classement
            }
            this.teamLeaders.push(tl)
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  body {
    background: #ececec;
  }
  .md-app {
    max-height: 100vh;
    border: 1px solid rgba(#000, .12);
  }

</style>
