<template>
  <div class="container-fluid">
    <div class="background">
      <div class="cards-column">
        <div v-for="(keepObj, index) in keeps" :key="keepObj.id" :keepData="keepObj" :keepIndex="index" />
      </div>
    </div>
  </div>
</template>

<script>
  import Keep from "../components/keep.vue";

  export default {
    name: "home",
    mounted() {
      this.$store.dispatch("getKeeps");
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
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
</style>