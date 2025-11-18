<script setup>

import { useTasksStore } from '@/store/tasks';

  const tasksStore = useTasksStore(); 
  const { taskList } = tasksStore

</script>
<template>
    <ul class="task-list">
      <li class="task-item" v-for="task in taskList" :key="task.id">
        <RouterLink class="task-link" :to="`/tasks/${task.id}`">{{ task.title }}</RouterLink>
      </li>
    </ul>

</template>