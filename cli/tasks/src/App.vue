<template>
  <div id="app">
    <header class="fixed-top">
      <div class="jumbotron jumbotron-fluid">
        <h1>Node Tasks</h1>
      </div>
      <b-alert class="col-lg-4 offset-lg-4 col-sm-10 offset-sm-1"
            variant="danger"
            dismissible
            :show=showError
            @dismissed="showError=false">
            {{errors}}
    </b-alert>
    <b-alert class="col-lg-4 offset-lg-4 col-sm-10 offset-sm-1"
            variant="success" 
            dismissible :show=showSuccess 
            @dismissed="showSuccess=false">
            {{success}}
    </b-alert>
    </header>
    
    <div id="task-list" class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
      <div class="input-group mb-3">
        <input type="text" class="form-control" id="new-task" placeholder="Add New Task & Press Enter" aria-label="New Task Name" v-on:keyup.enter="taskAdd" v-model="taskName">
      </div> 
      <ul class="list-group">
        <li class="list-group-item" v-for='task in tasks' :id="task.id" :key="task.id">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Task Name" aria-label="Task Name" v-model="task.name" v-on:change="taskUpdate">
            <div class="input-group-append">
              <button class="btn btn-success status" id='false' v-on:click="taskComplete" v-if="task.completed">Completed</button>
              <button class="btn btn-primary status" id='true' v-on:click="taskComplete" v-else>Mark Complete</button>
              <button class="btn btn-danger" v-on:click="taskDelete">X</button>
            </div>
          </div> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import taskMethods from "./tasks";

export default {
  name: "app",
  data() {
    return {
      taskName: "",
      tasks: [],
      errors: [],
      success: "",
      showError: false,
      showSuccess: false
    };
  },
  // Get tasks on load
  async created() {
    try {
      const response = await axios.get(`http://localhost:3000/tasks`);
      this.tasks = response.data.reverse();
    } catch (e) {
      this.errors = e;
      this.showError = true;
    }
  },
  mixins: [taskMethods]
};
</script>
<style lang="scss">
@import "./style.scss";
</style>