<template>
  <div class="home background">
    <h1>Welcome Home</h1>
  </div>
</template>

<script>
  export default {
    name: "home",
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
      }
    }
  };
</script>

<style>
  .background {
    background-color: lightgrey;
  }
</style>