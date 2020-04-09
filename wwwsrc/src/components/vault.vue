<template>
  <div class="card onclick-attr" @click="setActiveVault">
    <div class="card-body text-center">
      <span class="card-title name text-center">{{this.vaultData.name}}</span>
      <br />
      <span class="text-center">{{this.vaultData.description}}</span>
    </div>
  </div>
</template>

<script>
  import router from "../router"

  export default {
    name: "Vault",
    props: ["vaultData", "vaultIndex"],
    computed: {
      vaults() {
        let data = this.$store.state.myVaults;
        return data
      }
    },
    methods: {
      setActiveVault() {
        this.$store.dispatch("setActiveVault", this.vaultData);
        router.push({ name: "BlockDetails", params: { vaultId: this.vaultData.id } });
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