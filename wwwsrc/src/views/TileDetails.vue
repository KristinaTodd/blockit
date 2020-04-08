<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="name">{{this.keep.name}}</h3>
      </div>
      <div class="col-12 text-center"><img :src="this.keep.img" class="image"></div>
      <div class="col-12 text-center pt-2"><span>{{this.keep.description}}</span></div>
      <div class="col-12 text-center">
        <button class="btn btn-danger">Add to a Block</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TileDetails",
    mounted() {

    },
    computed: {
      keep() {
        return this.$store.state.activeKeep
      }
    }
  }

</script>

<style>
  .image {
    width: 30rem;
    height: 25rem;
  }

  .name {
    font-family: 'Bungee', cursive;
  }
</style>