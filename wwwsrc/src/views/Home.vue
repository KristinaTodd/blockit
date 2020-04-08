<template>
  <div class="container-fluid">
    <div class="background">
      <div class="row">
        <div class="cards-column ">
          <Keep v-for="(keepObj, index) in keeps" :key="keepObj.id" :keepData="keepObj" :keepIndex="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Keep from "../components/keep.vue";

  export default {
    name: "home",
    mounted() {
      return this.$store.dispatch("getKeeps");
    },
    computed: {
      keeps() {
        return this.$store.state.publicKeeps;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
      }
    },
    components: {
      Keep
    }
  };
</script>

<style>
  .background {
    background-color: lightgrey;
  }

  .cards-column {
    column-count: 4;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>