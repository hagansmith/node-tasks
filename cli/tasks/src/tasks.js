import axios from "axios";
export default {
methods: {
    taskAdd(event) {
      let data = {}
      data.name = event.target.value
      axios.post(`http://localhost:3000/tasks`, data).then((response) => {
        this.tasks.unshift(response.data)
        this.taskName = ''
      });
    },
    taskUpdate(event) {
      let data = {};
      data.id = event.path[2].id;
      data.name = event.target.value;
      axios.put(`http://localhost:3000/tasks/${data.id}`, data).then((response)=>{
        this.success = 'Task name updated'
        this.showSuccess = true;
      });
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
        let updated = this.tasks.findIndex(task => task.id == data.id)
        this.tasks[updated].completed = response.data.completed
      });
    },
    taskDelete(event) {
      let id = event.path[3].id;
      axios.delete(`http://localhost:3000/tasks/${id}`).then((response)=> {
        this.tasks.splice(this.tasks.findIndex(task=> task.id == id), 1)
      });
    },
    conflicting: function () {
        console.log('from mixin')
    }
  }
};