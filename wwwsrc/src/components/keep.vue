<template>
  <div class="card">
    <img :src="this.keepData.img" class="card-img-top img-fluid" />
    <div class="card-body">
      <h5 class="card-title">{{this.keepData.name}}</h5>
      <p class="card-text">{{this.keepData.description}}</p>
    </div>
  </div>

</template>

<script>

  export default {
    name: "Keep",
    props: ["keepData", "keepIndex"],
    computed: {
      keeps() {
        let data = this.$store.state.publicKeeps;
        return data
      }
    }

  }

</script>

<style>
  .card {
    width: 15rem;

  }
</style>