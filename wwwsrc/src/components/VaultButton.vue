<template>
  <div class="col-12">
    <button class="btn btn-danger" @click="setTempVault">
      {{this.vaultData.name}}
    </button>
  </div>
</template>

<script>

  export default {
    name: "VaultButton",
    props: ["vaultData", "vaultIndex"],
    computed: {
      vaults() {
        let data = this.$store.state.myVaults;
        return data
      }
    },
    methods: {
      setTempVault() {
        this.$store.dispatch("setTempVault", this.vaultData);
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