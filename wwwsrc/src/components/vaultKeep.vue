<template>
  <div class="card">
    <img :src="this.vaultKeepData.img" class="card-img-top img-fluid onclick-attr" @click="setActiveKeep" />
    <div class="card-body">
      <span class="card-title name text-center">{{this.vaultKeepData.name}}</span>
      <br />
      <button @click="deleteVaultKeep" class="btn btn-danger" v-if="$route.name === 'BlockDetails'">Remove From
        Block</button>
    </div>
  </div>
</template>

<script>
  import router from "../router"

  export default {
    name: "VaultKeep",
    props: ["vaultKeepData", "vaultKeepIndex"],
    computed: {
      vaultKeeps() {
        let data = this.$store.state.myVaultKeeps;
        return data
      }
    },
    methods: {
      setActiveKeep() {
        this.keepData.views = this.keepData.views + 1;
        this.$store.dispatch("updateCount", this.keepData);
        router.push({ name: "TileDetails", params: { keepId: this.keepData.id } });
      },
      deleteVaultKeep() {
        this.$store.dispatch("deleteVaultKeep", this.vaultKeepData)
      }
    }

  }

</script>

<style>
  .card {
    margin: .2rem;
    width: 13rem;
  }

  .name {
    font-family: 'Bungee', cursive;
  }

  .onclick-attr {
    cursor: pointer;
  }
</style>