<template lang="html">

  <section class="event-rank">
    {{eventRank.rank}}. {{eventRank.teamleader.firstname}} {{eventRank.teamleader.lastname}} - {{eventRank.points}} points
  </section>

</template>

<script lang="js">
  export default {
    name: 'event-rank',
    props: ['eventRank'],
    mounted () {

    },
    data () {
      return {

      }
    },

    created () {
      this.eventRank.tl.get().then(x => {
        if (x.data()) {
          this.eventRank.teamleader = {
            'firstname': x.data().firstname,
            'lastname': x.data().lastname
          }
        }
      })
    },

    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .event-rank {
    font-size: 12px;
  }
</style>
