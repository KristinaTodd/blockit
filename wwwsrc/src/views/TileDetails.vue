<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="name">{{this.keep.name}}</h3>
      </div>
      <div class="col-12 text-center"><img :src="this.keep.img" class="image"></div>
      <div class="col-12 text-center pt-2"><span>{{this.keep.description}}</span></div>
      <div class="col-12 text-center" v-if="this.$auth.isAuthenticated">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newVaultKeep">
          Add Tile to Block
        </button>

        <!-- Modal -->
        <div class="modal fade" id="newVaultKeep" tabindex="-1" role="dialog" aria-labelledby="newVaultKeepLabel"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="newVaultKeepLabel">Which Block do you want to add this Tile to?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <VaultButton v-for="(vaultObj, index) in vaults" :key="vaultObj.id" :vaultData="vaultObj"
                    :vaultIndex="index" />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                  @click="createVaultKeep">Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VaultButton from "../components/VaultButton"
  export default {
    name: "TileDetails",
    async mounted() {
      if (await this.$auth.isAuthenticated) {
        return this.$store.dispatch("getMyStuff")
      }
    },
    computed: {
      keep() {
        return this.$store.state.activeKeep
      },
      vaults() {
        return this.$store.state.myVaults
      }
    },
    data() {
      return {
        newVaultKeep: {
          userId: "",
          vaultId: "",
          keepId: ""
        }
      }
    },
    methods: {
      createVaultKeep() {
        this.keep.keeps = this.keep.keeps + 1
        this.$store.dispatch("updateCount", this.keep);

        this.newVaultKeep.vaultId = this.$store.state.tempVault.id;
        this.newVaultKeep.keepId = this.keep.id;
        this.$store.dispatch("createVaultKeep", this.newVaultKeep)
      }
    },
    components: {
      VaultButton
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