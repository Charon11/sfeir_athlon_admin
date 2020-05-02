<template>
  <section class="event">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="event-card">
          <v-card-title primary-title class="title-card">
            <div class="headline container-title">
              <a class="link-title" :href="url">{{event.name}}</a>
            </div>
          </v-card-title>
          <v-card-subtitle class="subtitle-card">
            <div class="container-subtitle">{{event.date | date}}</div>
          </v-card-subtitle>

          <v-card-actions class="actions-card">
            <v-btn text rounded>
              <v-icon @click="showDialog = true" style="color: #4c4b5e;">mdi-pencil</v-icon>
            </v-btn>
            <v-btn text rounded>
              <v-icon @click="showSnackbar = true" style="color: #4c4b5e;">mdi-delete</v-icon>
            </v-btn>
            <v-btn
              text
              @click="showRanking = !showRanking"
              class="action-show-rank"
            >Classement</v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="showRanking">
              <v-divider></v-divider>

              <v-card-text>
                <v-list dense>
                  <v-list-item-group>
                    <v-list-item v-for="rank in event.classement" :key="rank.tl.id">
                      <v-list-item-content>
                        <event-rank :eventRank="rank"></event-rank>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="showDialog" persistent>
      <event-form
        :eventId="event.identifier"
        :team-leaders="teamLeaders"
        :updateEvent="updateEvent"
      ></event-form>
    </v-dialog>

    <v-snackbar top :timeout="duration" v-model="showSnackbar">
      <span>Are you sure you want to delete {{event.name}} ?!</span>
      <v-btn text small class="md-primary">No</v-btn>
      <v-btn text small class="md-primary">Yes</v-btn>
    </v-snackbar>
  </section>
</template>

<script>
// import db from '../firebase/firestoreInit'
import EventForm from './EventForm'
import EventRank from './EventRank'

export default {
  name: 'event',
  props: ['event', 'teamLeaders', 'updateMethod'],
  components: { EventForm, EventRank },
  data () {
    return {
      showRanking: false,
      showDialog: false,
      showSnackbar: false,
      duration: 4000
    }
  },
  methods: {
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

<style scoped>
section {
  width: 95%;
  max-width: 380px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  color: #4c4b5e;
}
.event-card {
  background-color:white;
}
.title-card {
  background-color:#4c4b5e;
}
.container-title {
  width: 100%;display: flex;
  justify-content: center;
  height: 50px;
  align-items: flex-end;
}
.link-title {
  color: #FFFFFF;
  text-decoration:none;
  font-weight:bold;
  font-family:Montserrat,sans-serif;
}
.subtitle-card {
  background-color:#4c4b5e;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0px 2px #b7afaf;
}
.container-subtitle {
  width: 100%;
  color: #FFFFFF;
  font-family:Montserrat,sans-serif;
}
.actions-card {
  color: #4c4b5e;
  flex-wrap: wrap;
  justify-content: center;
}
.action-show-rank {
  width: 100%;
  font-family:Montserrat,sans-serif;
  font-weight:100;
}
</style>
