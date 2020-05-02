<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        label="Lastname"
        v-model="teamLeader.lastname"
        color="#f00b51">
      </v-text-field>
      <v-text-field
        label="Firstname"
        v-model="teamLeader.firstname"
        color="#f00b51">
      </v-text-field>
      <v-text-field
        label="Classement"
        v-model="teamLeader.classement"
        color="#f00b51"
        type="number">
      </v-text-field>
      <v-text-field
        label="Points"
        v-model="teamLeader.points"
        color="#f00b51"
        type="number">
      </v-text-field>
      <v-text-field
        label="Trigramme"
        v-model="teamLeader.trigramme"
        color="#f00b51">
      </v-text-field>
      <v-text-field
        label="Photo Url"
        v-model="teamLeader.photo"
        color="#f00b51">
      </v-text-field>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'competitor-form',
  props: ['teamLeader']
}
</script>
<style scoped>
.md-field {
  margin: 10px;
  width: 90%;
}
</style>
