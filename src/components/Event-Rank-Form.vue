<template lang="html">

  <section class="event-rank-form">
    <v-layout row wrap>
      <v-flex xs2>
        <v-text-field
          name="rank-input"
          label="Rank"
          single-line
          mask="#"
          v-model="eventRank.rank"
        ></v-text-field>
      </v-flex>
      <v-flex xs8>
        <v-select
          :items="tls"
          :filter="customFilter"
          v-bind:value="tl"
          no-data-text="tls"
          v-on:change="teamLeaderChange"
          autocomplete
        ></v-select>
      </v-flex>
      <v-flex xs2>
        <v-text-field
          name="points-input"
          label="Points"
          single-line
          mask="##"
          v-model="eventRank.points"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </section>

</template>

<script lang="js">
  import db from '../firebase/firestoreInit'
  export default {
    name: 'event-rank-form',
    props: ['eventRank', 'teamLeaders'],
    mounted () {

    },
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

    },
    created () {
    }
}
</script>

<style scoped lang="scss">
  .event-rank-form {

  }
</style>
