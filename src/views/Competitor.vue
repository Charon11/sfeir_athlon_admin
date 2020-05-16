<template>
  <section>
    <v-card width="300">
        <v-card-title>
          <span class="v-title">{{ fullName }}</span>
        </v-card-title>
        <v-card-actions class="competitor-actions">
          <v-btn v-if="teamLeader.firstname !== undefined" depressed color="gray" @click="showSnackbar = true">
            <span style="color: darkgray;">Delete</span>
            </v-btn>
          <v-btn depressed color="#f00b51" class="md-primary" @click="showDialog = true">
             <span style="color: white;">Edit</span>
            </v-btn>
        </v-card-actions>
    </v-card>

    <v-dialog v-model="showDialog" >
      <v-card style="competitor-form">
        <v-card-title>Team Leader</v-card-title>

        <v-card-text>
          <competitor-form :teamLeader="teamLeader"></competitor-form>
        </v-card-text>

        <v-card-actions class="competitor-actions">
          <v-btn depressed color="gray" @click="showDialog = false">
            <span class="action-delete">Cancel</span>
          </v-btn>
          <v-btn depressed color="#f00b51" class="md-primary" @click="saveTeamLeader">
            <span class="action-edit">Save</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar top :timeout="isInfinity ? Infinity : duration" v-model="showSnackbar">
      <span>Are you sure you want to delete {{teamLeader.firstname}} {{teamLeader.lastname}}!</span>
      <v-btn class="md-primary" @click="showSnackbar = false">No</v-btn>
      <v-btn class="md-primary" @click="deleteTeamLeader">Yes</v-btn>
    </v-snackbar>
  </section>
</template>

<script>
import db from '../firebase/firestoreInit'
import CompetitorForm from './Competitor-Form.vue'

export default {
  components: { CompetitorForm },
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
  computed: {
    fullName () {
      if (this.teamLeader.firstname !== undefined) {
        return this.teamLeader.firstname + ' ' + this.teamLeader.lastname
      } else {
        return 'New teamLeader'
      }
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
          this.updateMethod()
        })
    }
  }
}
</script>
<style scoped>
section {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.competitor-actions {
  justify-content:flex-end;
}
.action-delete {
  color: darkgray;
}
.action-edit {
  color: white;
}
.competitor-form {
  width: 300px;
}
</style>
