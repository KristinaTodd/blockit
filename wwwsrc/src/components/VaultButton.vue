<template>
  <div class="col-12">
    <button class="btn btn-danger" @click="setTempVault" :id="'#buttonActive' + this.vaultData.id">
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
        $('#buttonActive' + this.vaultData.id).addClass("activeButton");
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

  .activeButton {
    background-color: green;
    border: green;
  }

  .activeButton:active {
    background-color: green;
    border: green;
  }
</style>