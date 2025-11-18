<script setup>

  import { useTasksStore } from '@/store/tasks';
import { useRoute, useRouter } from 'vue-router';


  const tasksStore = useTasksStore(); 
  const { taskList } = tasksStore

 const props =  defineProps({
    id: {
      type: Number,
      required: true
    }
  })

  const task = tasksStore.taskList.find(task => task.id=== parseInt(props.id));
  const router = useRouter();

  const deleteTask = () => {
    tasksStore.deleteTask(task.id);
    router.push('/tasks')
  }
</script>

<template>
  <div>
    <div v-if="task">
      <h1>Задача {{ task.title }}</h1>
      <p>Детали задачи #{{ id }}</p>
      <button class="btn btn--edit">Редактировать</button>
      &nbsp;

      <RouterLink to="/tasks">
        <button class="btn btn--delete" @click="deleteTask(id)">Удалить</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.form-control {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn--edit {
  background-color: #007bff;
  color: white;
}

.btn--edit:hover {
  background-color: #0056b3;
}

.btn--delete {
  background-color: #dc3545;
  color: white;
}

.btn--delete:hover {
  background-color: #c82333;
}

.btn--save {
  background-color: #28a745;
  color: white;
}

.btn--save:hover {
  background-color: #218838;
}
</style>
