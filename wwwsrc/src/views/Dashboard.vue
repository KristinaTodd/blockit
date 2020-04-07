<template>
  <div class="dashboard">
    <h1>WELCOME TO THE DASHBOARD</h1>
    public {{ publicKeeps }} user {{ userKeeps }}

    <h3>Add A New Tile</h3>
    <form @submit.prevent="addKeep">
      <div class="row m-2">
        <div class="col">
          <input type="text" class="form-control" placeholder="Name">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Description">
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="Image URL">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Dashboard",
    mounted() {

    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      addKeep() {
        let data = this.newKeep
        this.$store.dispatch("addKeep", data);
      }
    },
    data() {
      return {
        newKeep: {
          userId: this.$store.state.user.userId
        }
      }
    }
  };
</script>

<style></style>