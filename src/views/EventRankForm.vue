<template>
  <section class="event-rank-form">
    <v-layout row wrap class="layout-rank-form">
      <v-flex xs2>
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
      <v-flex xs6>
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
      <v-flex xs2>
        <v-text-field
          name="points-input"
          label="Points"
          single-line
          mask="##"
          v-model="eventRank.points"
          reverse
          color="#f00b51"
        ></v-text-field>
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
      this.eventRank.tl = db.collection('team-leaders').doc(value)
    }
  },
  computed: {
    tls () {
      return this.teamLeaders.map(tl => tl.identifier)
    },

    tl () {
      return this.eventRank.tl ? this.eventRank.tl.id : ''
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
