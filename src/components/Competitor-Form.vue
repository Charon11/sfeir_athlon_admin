<template>

  <div>
    <md-field>
      <label>Lastname</label>
      <md-input v-model="teamLeader.lastname"></md-input>
    </md-field>
    <md-field>
      <label>Firstname</label>
      <md-input v-model="teamLeader.firstname"></md-input>
    </md-field>
    <md-field>
      <label>Classement</label>
      <md-input v-model="teamLeader.classement" type="number"></md-input>
    </md-field>
    <md-field>
      <label>Points</label>
      <md-input v-model="teamLeader.points" type="number"></md-input>
    </md-field>
    <md-field>
      <label>Trigramme</label>
      <md-input v-model="teamLeader.trigramme"></md-input>
    </md-field>
    <md-field>
      <label>Photo Url</label>
      <md-input v-model="teamLeader.photo"></md-input>
    </md-field>
  </div>

</template>

<script lang="js">
  export default {
    name: 'competitor-form',
    props: ['teamLeader']
  }
</script>

<style lang="scss">
  .md-field {
    margin: 10px;
    width: 90%;
  }

</style>
