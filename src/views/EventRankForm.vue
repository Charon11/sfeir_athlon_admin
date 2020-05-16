<template>
  <section class="event-rank-form">
    <v-layout row wrap class="layout-rank-form">
      <v-flex xs3>
        <v-text-field
          name="rank-input"
          label="Rank"
          single-line
          mask="#"
          v-model="eventRank.rank"
          color="#f00b51"
          reverse
        ></v-text-field>
      </v-flex>
      <v-flex xs7>
        <v-select
          :items="tls"
          :filter="customFilter"
          v-bind:value="tl"
          no-data-text="tls"
          v-on:change="teamLeaderChange"
          autocomplete
          chips
          color="#f00b51"
        ></v-select>
      </v-flex>
    </v-layout>
  </section>
</template>
<script>
import db from '../firebase/firestoreInit'

export default {
  name: 'event-rank-form',
  props: ['eventRank', 'teamLeaders'],
  data () {
    return {
      customFilter (item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(item.id)
        const query = hasValue(queryText)
        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      }
    }
  },
  methods: {
    teamLeaderChange (value) {
      this.eventRank.team = db.collection('team-leaders').doc(value)
    }
  },
  computed: {
    tls () {
      return this.teamLeaders.map(tl => tl.identifier)
    },

    tl () {
      return this.eventRank.team ? this.eventRank.team.id : ''
    }
  }
}
</script>

<style scoped>
.event-rank-form {
  padding: 0px;
}
.layout-rank-form {
  justify-content: space-around;
  align-items: flex-end;
}
</style>
