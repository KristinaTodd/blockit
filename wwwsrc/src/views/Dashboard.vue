<template>
  <div class="dashboard">
    <h1>WELCOME TO YOUR DASHBOARD</h1>

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
        <button type="submit" class="btn btn-success">Create Board</button>
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

    },
    methods: {
      addKeep() {
        let data = this.newKeep
        this.$store.dispatch("createKeeps", data);
      }
    },
    data() {
      return {
        newKeep: {
          userId: "",
          name: "",
          description: "",
          img: ""
        }
      }
    }
  };
</script>

<style></style>