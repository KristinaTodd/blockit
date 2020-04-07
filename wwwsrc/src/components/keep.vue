<template>
  <div class="card">
    <img :src="keepData.img" class="card-img-top img-fluid" />
    <div class="card-body">
      <h5 class="card-title">{{keeps.name}}</h5>
      <p class="card-text">{{keeps.description}}</p>
    </div>
  </div>

</template>

<script>

  export default {
    name: "Keep",
    computed: {
      keeps() {
        let data = this.$store.state.publicKeeps;
        return data;
      }
    }
  }

</script>

<style>

</style>