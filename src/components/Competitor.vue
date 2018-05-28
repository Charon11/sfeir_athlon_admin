<template>
  <section>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{teamLeader.firstname}} {{teamLeader.lastname}}</div>
          <div class="md-subhead">Classement : {{teamLeader.classement}}</div>
        </md-card-header>

        <md-card-content>
          Points : {{teamLeader.points}}
        </md-card-content>

        <md-card-actions>
          <md-button @click="showDialog = true">Edit</md-button>
          <md-button @click="showSnackbar = true">
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Team Leader</md-dialog-title>
      <competitor-form :teamLeader="teamLeader"></competitor-form>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">
          <md-icon>clear</md-icon>
        </md-button>
        <md-button class="md-primary" @click="saveTeamLeader">
          <md-icon>update</md-icon>
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar"
                 md-persistent>
      <span>Are you sure you want to delete {{teamLeader.firstname}} {{teamLeader.lastname}}!</span>
      <md-button class="md-primary" @click="showSnackbar = false">No</md-button>
      <md-button class="md-primary" @click="deleteTeamLeader">Yes</md-button>
    </md-snackbar>
  </section>
</template>

<script>
  import db from '../firebase/firestoreInit'
  import CompetitorForm from './Competitor-Form.vue'

  export default {
    components: {CompetitorForm},
    name: 'competitor',
    props: ['teamLeader', 'updateMethod'],
    data () {
      return {
        showDialog: false,
        showSnackbar: false,
        position: 'center',
        duration: 4000,
        isInfinity: false
      }
    },
    methods: {
      saveTeamLeader () {
        db.collection('classement').doc(this.teamLeader.identifier).set(
          {
            'lastname': this.teamLeader.lastname,
            'firstname': this.teamLeader.firstname,
            'points': this.teamLeader.points,
            'classement': this.teamLeader.classement,
            'photo': this.teamLeader.photo,
            'trigramme': this.teamLeader.trigramme
          }).then(() => {
          this.showDialog = false
          this.updateMethod()
        })
      },
      deleteTeamLeader () {
        db.collection('classement').doc(this.teamLeader.identifier).delete()
          .then(() => {
            this.showSnackbar = false
            console.log(this.$parent)
            this.updateMethod()
          })
      }
    }
  }
</script>

<style lang="scss" scoped>

  section {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

</style>
