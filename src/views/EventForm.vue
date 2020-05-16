<template>
  <v-card>
    <v-card-title primary-title class="headline">
        Event
    </v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              color="#f00b51"
              label="Name"
              v-model="event.name"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              color="#f00b51"
              label="Url Workplace"
              v-model="event.url"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              color="#f00b51"
              label="Url register"
              v-model="event.register"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 lg12>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  color="#f00b51"
                  v-model="dateFormatted"
                  label="Date"
                  hint="DD/MM/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date"
                :first-day-of-week="1"
                locale="fr-FR"
                @input="menu1 = false"
                color="#f00b51"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <div slot="header" color="#f00b51">Classement</div>
            <v-expand-transition>
            <v-list dense>
              <v-list-item-group>
                <v-list-item-action>
                  <v-btn icon color="green" @click="addRank">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item v-for="(rank, index) in event.classement" :key="index">
                <v-list-item-content>
                  <event-rank-form :eventRank="rank" :team-leaders="teamLeaders"></event-rank-form>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon color="red" @click="removeRank(rank)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              </v-list-item-group>
            </v-list>
            </v-expand-transition>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card-text>

    <v-card-actions class="event-actions">
      <v-btn depressed color="gray" @click="cancel">
        <span class="event-action-cancel">Cancel</span>
      </v-btn>
      <v-btn depressed color="#f00b51" class="md-primary" @click="saveEvent">
        <span class="event-action-save">Save</span>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import db from '../firebase/firestoreInit'
import EventRankForm from './EventRankForm'

export default {
  name: 'event-form',
  components: { EventRankForm },
  props: ['eventId', 'teamLeaders', 'updateEvent'],
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
      if (this.dateFormatted) {
        const [day, month, year] = this.dateFormatted.split('/')
        this.event.date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      }
    }
  },
  data () {
    return {
      event: {},
      date: null,
      dateFormatted: null,
      menu1: false,
      overlay: false
    }
  },
  methods: {
    cancel () {
      this.updateEvent()
    },
    saveEvent () {
      const event = {
        'name': this.event.name,
        'url': this.event.url,
        'register': this.event.register,
        'date': this.event.date,
        'individualClassement': this.event.classement.map(c => {
          console.log(c)
          return {
            'rank': parseInt(c.rank),
            'sfeirien': parseInt(c.team.id),
            'team': c.team
          }
        })
      }
      if (this.event.identifier) {
        db.collection('events-2019').doc(this.event.identifier).set(
          event
        ).then(() => {
          this.emptyEvent()
          this.updateEvent()
        })
      } else {
        db.collection('events-2019').doc().set(
          event
        ).then(() => {
          this.emptyEvent()
          this.updateEvent()
        })
      }
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    addRank () {
      this.event.classement.push({})
    },
    removeRank (rank) {
      const index = this.event.classement.indexOf(rank)
      this.event.classement.splice(index, 1)
    },
    emptyEvent () {
      this.date = null
      this.dateFormatted = null
      this.event = {
        'identifier': '',
        'url': '',
        'name': '',
        'register': '',
        'date': null,
        'eventDate': null,
        'classement': []
      }
    }
  },
  created () {
    if (this.eventId) {
      db.collection('events-2019').doc(this.eventId).onSnapshot(doc => {
        if (doc.exists) {
          this.event = {
            'identifier': doc.id,
            'url': doc.data().url,
            'name': doc.data().name,
            'date': doc.data().date,
            'register': doc.data().register,
            'eventDate': new Date(doc.data().date.seconds * 1000),
            'classement': doc.data().individualClassement.map(c => {
              c.teamleader = {}
              return c
            }).sort((a, b) => a.rank - b.rank)
          }
          const date = new Date(this.event.eventDate.getTime())
          this.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        } else {
          this.emptyEvent()
        }
      })
    } else {
      this.emptyEvent()
    }
  }
}
</script>

<style scoped>
.section {
  width: 400px;
}
.event-actions {
  justify-content:flex-end;
}
.event-action-cancel {
  color: darkgray;
}
.event-action-save {
  color: white;
}
</style>
