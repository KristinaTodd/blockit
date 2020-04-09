<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="name">{{this.vault.name}}</h3>
      </div>
      <div class="col-12 text-center pt-2"><span>{{this.vault.description}}</span></div>
      <div class="col-12 text-center">
        <button class="btn btn-danger" @click="deleteBlock">Delete This Block</button>
      </div>
    </div>
    <div class="row">
      <div class="cards-column ">
        <VaultKeep v-for="(vaultKeepObj, index) in vaultkeeps" :key="vaultKeepObj.id" :vaultKeepData="vaultKeepObj"
          :vaultKeepIndex="index" />
      </div>
    </div>
  </div>
</template>

<script>
  import router from "../router"
  import VaultKeep from "../components/vaultKeep"

  export default {
    name: "VaultDetails",
    async mounted() {
      if (await this.$auth.isAuthenticated) {
        return this.$store.dispatch("getKeepsByVaultId", this.vault.id)
      }
    },
    computed: {
      vault() {
        return this.$store.state.activeVault
      },
      vaultkeeps() {
        return this.$store.state.myVaultKeeps
      }
    },
    methods: {
      deleteBlock() {
        this.$store.dispatch("deleteVault", this.vault)
        router.push({ name: "dashboard" });
      }
    },
    components: {
      VaultKeep
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