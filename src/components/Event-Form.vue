<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">
        Event
      </div>

    </v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              label="Name"
              v-model="event.name"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              label="Url Workplace"
              v-model="event.url"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 lg6>
            <v-menu
              ref="menu1"
              :close-on-content-click="false"
              v-model="menu1"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="dateFormatted"
                label="Date"
                hint="DD/MM/YYYY format"
                persistent-hint
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)"
              ></v-text-field>
              <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-expansion-panel>
              <v-expansion-panel-content>
                <div slot="header">
                  Classement
                </div>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-btn flat icon color="green" @click="addRank">
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile v-for="rank in event.classement">
                    <v-list-tile-content>
                      <event-rank-form :eventRank="rank" :team-leaders="teamLeaders"></event-rank-form>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn flat icon color="red" @click="removeRank(rank)">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-btn flat @click="cancel">
        Cancel
      </v-btn>
      <v-btn flat class="md-primary" @click="saveEvent">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
  import db from '../firebase/firestoreInit'
  import EventRank from './Event-Rank'
  import EventForm from './Event-Form'
  import EventRankForm from './Event-Rank-Form'

  export default {
    name: 'event-form',
    components: {EventRankForm, EventForm, EventRank},
    props: ['eventId', 'teamLeaders', 'updateEvent'],
    mounted () {
    },
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
        menu1: false
      }
    },
    methods: {

      cancel () {
        this.updateEvent()
      },

      addRank () {
        this.event.classement.push({})
      },

      removeRank (rank) {
        const index = this.event.classement.indexOf(rank)
        this.event.classement.splice(index, 1)
      },

      saveEvent () {
        console.log(this.event)
        const event = {
          'name': this.event.name,
          'url': this.event.url,
          'date': this.event.date,
          'classement': this.event.classement.map(c => {
            return {
              'rank': parseInt(c.rank),
              'points': parseInt(c.points),
              'tl': c.tl
            }
          })
        }
        if (this.event.identifier) {
          db.collection('events').doc(this.event.identifier).set(
            event
          ).then(() => {
            this.emptyEvent()
            this.updateEvent()
          })
        } else {
          db.collection('events').doc().set(
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

      emptyEvent () {
        this.date = null
        this.dateFormatted = null
        this.event = {
          'identifier': '',
          'url': '',
          'name': '',
          'date': null,
          'eventDate': null,
          'classement': []
        }
      }
    },
    computed: {},

    created () {
      if (this.eventId) {
        db.collection('events').doc(this.eventId).onSnapshot(doc => {
          if (doc.exists) {
            this.event = {
              'identifier': doc.id,
              'url': doc.data().url,
              'name': doc.data().name,
              'date': doc.data().date,
              'eventDate': new Date(doc.data().date.seconds * 1000),
              'classement': doc.data().classement.map(c => {
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

<style scoped lang="scss">

  .section {
    width: 400px;
  }
</style>
