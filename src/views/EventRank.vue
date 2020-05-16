<template>
  <div class="event-rank">
    {{eventRank.rank}}. {{eventRank.teamleader.firstname}} {{eventRank.teamleader.lastname}}
    <v-avatar v-show="eventRank.teamleader != '' ||  eventRank.teamleader != null || eventRank.teamleader != undefined">
      <img
        :src="eventRank.teamleader.photo"
        :alt="eventRank.teamleader.firstname"
      >
    </v-avatar>
  </div>
</template>
<script>
export default {
  name: 'event-rank',
  props: ['eventRank'],
  created () {
    this.eventRank.team.get().then(x => {
      if (x.data()) {
        this.eventRank.teamleader = {
          'firstname': x.data().firstname,
          'lastname': x.data().lastname,
          'photo': x.data().photo
        }
      }
    })
  }
}
</script>
<style scoped>
  .event-rank {
    font-size: 14px;
  }
</style>
