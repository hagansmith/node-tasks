<template>
  <div id="app">
    <header class="fixed-top">
      <div class="jumbotron jumbotron-fluid">
        <h1>Node Tasks</h1>
      </div>
    </header>
    <div id="task-list" class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
    <!-- <table class="table">
      <thead>
        <tr>
          <th> Name </th>
          <th> Completed </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='task in tasks'>
          <td>{{ task.name }}</td>
          <td v-if=task.completed>&#x2611;</td>
          <td v-else> &#x1F5F9;</td>
        </tr>
      </tbody>
    </table> -->
    <div class="input-group mb-3">
      <input type="text" class="form-control" id="new-task" placeholder="New Task" aria-label="New Task Name" v-on:keyup.enter="taskAdd" v-model="taskName">
    </div> 
    <ul class="list-group">
      <li class="list-group-item" v-for='task in tasks' :id="task.id">
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

export default {
  name: "app",
  data() {
    return {
      taskName: '',
      tasks: [],
      errors: [],
    };
  },
  async created() {
    try {
      const response = await axios.get(`http://localhost:3000/tasks`);
      this.tasks = response.data;
    } catch (e) {
      this.errors.push(e);
    }
  },
  methods: {
    taskAdd(event) {
      let data = {}
      data.name = event.target.value
      axios.post(`http://localhost:3000/tasks`, data).then((response) => {
        this.tasks.push(response.data)
        this.taskName = ''
      })
    },
    taskUpdate(event) {
      let data = {};
      data.id = event.path[2].id;
      data.name = event.target.value;
      axios.put(`http://localhost:3000/tasks/${data.id}`, data).then((response)=>{
        this.tasks[data.id] = response.data
        alert(`Task name updated`)
        console.log(response);
      })
    },
    taskComplete(event) {
      let data = {};
      data.id = event.path[3].id;
      if (event.target.id == "true") {
        data.completed = true
      } else {
        data.completed = false
      }
      axios.put(`http://localhost:3000/tasks/${data.id}`, data).then((response)=>{
        this.tasks[data.id]= response.data
      })
    },
    taskDelete(event) {
      let id = event.path[3].id;
      axios.delete(`http://localhost:3000/tasks/${id}`).then((response)=> {
        this.tasks.splice(this.tasks.indexOf(id), 1)
      })
    }
  }
};

</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 160px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.jumbotron {
  background-color: white;
  filter: drop-shadow(0 0 0.25rem lightgrey);
  color: #42b983;
  padding: 0;
  margin: 0
}

h1 {
  font-size: 5rem;
  margin: 0;
}

.task-list {
  margin-top: 40px;
}

.status {
  width: 9em;
}
</style>
