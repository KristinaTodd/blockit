<template>
  <div class="col-3 justify-content-center d-flex">
    <div class="card text-center">
      <img :src="this.keepData.img" class="card-img-top img-fluid onclick-attr" @click="setActiveKeep" />
      <div class="card-body">
        <span class="card-title name ">{{this.keepData.name}}</span>
        <br />
        <span class="description">Views: {{this.keepData.views}} | Blocks: {{this.keepData.keeps}}</span>
        <br />
        <button @click="deleteKeep" class="btn btn-danger" v-if="$route.name === 'dashboard'">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
  import router from "../router"

  export default {
    name: "Keep",
    props: ["keepData", "keepIndex"],
    computed: {
      keeps() {
        let data = this.$store.state.publicKeeps;
        return data
      }
    },
    methods: {
      setActiveKeep() {
        this.keepData.views = this.keepData.views + 1;
        this.$store.dispatch("updateCount", this.keepData);
        router.push({ name: "TileDetails", params: { keepId: this.keepData.id } });
      },
      deleteKeep() {
        this.$store.dispatch("deleteKeep", this.keepData)
      }
    }
  }

</script>

<style>
  .card {
    margin: .2rem;
    height: fit-content;
  }

  .card-img-top {
    width: 13rem;
  }

  .name {
    font-family: 'Bungee', cursive;
  }

  .onclick-attr {
    cursor: pointer;
  }

  .description {
    font-family: 'Antic', sans-serif;
  }
</style>