<template lang="html">

<md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{teamLeader.firstname}} {{teamLeader.lastname}}</div>
          <div class="md-subhead">Classement : {{teamLeader.classement}}</div>
        </md-card-header>

        <md-card-content>
          Points : {{teamLeader.points}}
        </md-card-content>

        <md-card-actions>
          <md-button>Edit</md-button>
          <md-button>Delete</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>


</template>

<script>
  export default {
    name: 'competitor',
    props: ['teamLeader'],
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped>
  .md-card {
    width: 80%;
    margin: 10px;
    display: inline-block;
    vertical-align: top;
  }
</style>
