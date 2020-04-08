<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-12 text-center">
        <h1>WELCOME TO YOUR DASHBOARD</h1>
      </div>
      <div class="col-12 text-center">
        <h3>Add A New Tile</h3>
        <form @submit.prevent="addKeep">
          <div class="row m-2">
            <div class="col">
              <input type="text" class="form-control" v-model="newKeep.name" placeholder="Name" required>
            </div>
            <div class="col">
              <input type="text" class="form-control" v-model="newKeep.description" placeholder="Description" required>
            </div>
            <div class="col">
              <input type="text" class="form-control" v-model="newKeep.Img" placeholder="Image URL" required>
            </div>
            <button type="submit" class="btn btn-success">Create Tile</button>
          </div>
        </form>
      </div>
      <div class="col-12 text-center">
        <h3>Add A New Block</h3>
        <form @submit.prevent="addVault">
          <div class="row m-2">
            <div class="col">
              <input type="text" class="form-control" v-model="newVault.name" placeholder="Name" required>
            </div>
            <div class="col">
              <input type="text" class="form-control" v-model="newVault.description" placeholder="Description" required>
            </div>
            <button type="submit" class="btn btn-success">Create Block</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <h3>Here Are Your Blocks</h3>
      </div>
      <div class="cards-column ">
        <Vault v-for="(vaultObj, index) in vaults" :key="vaultObj.id" :vaultData="vaultObj" :vaultIndex="index" />
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <h3>Here Are Your Tiles</h3>
      </div>
      <div class="cards-column ">
        <Keep v-for="(keepObj, index) in keeps" :key="keepObj.id" :keepData="keepObj" :keepIndex="index" />
      </div>
    </div>
  </div>
</template>

<script>
  import Vault from "../components/vault";
  import Keep from "../components/keep"
  export default {
    name: "Dashboard",
    async mounted() {
      if (await this.$auth.isAuthenticated) {
        return this.$store.dispatch("getMyStuff")
      }
    },
    computed: {
      vaults() {
        return this.$store.state.myVaults
      },
      keeps() {
        return this.$store.state.myKeeps
      }
    },
    methods: {
      addKeep() {
        let data = this.newKeep
        this.$store.dispatch("createKeeps", data);
      },
      addVault() {
        let data = this.newVault
        this.$store.dispatch("createVault", data)
      }
    },
    data() {
      return {
        newKeep: {
          userId: "",
          name: "",
          description: "",
          img: ""
        },
        newVault: {
          userId: "",
          name: "",
          description: ""
        }
      }
    },
    components: {
      Keep,
      Vault
    }
  };
</script>

<style>
  .cards-column {
    column-count: 4;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>