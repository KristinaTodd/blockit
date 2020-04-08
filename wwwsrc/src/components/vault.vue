<template>
  <div class="card" @click="setActiveVault">
    <div class="card-body">
      <span class="card-title name text-center">{{this.VaultData.name}}</span>
      <br />
      <span class="text-center">{{this.vaultData.description}}</span>
    </div>
  </div>
</template>

<script>

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
</style>