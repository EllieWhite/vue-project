<script setup>
 import { useRoute } from 'vue-router';

  const route = useRoute()

</script>

<template>
  <div>
    <h1>Список задач</h1>
    <ul class="task-list">
      <li class="task-item">
        <RouterLink to="/tasks/task1" class="task-link">Задача 1</RouterLink>
      </li>
      <li class="task-item"> 
        <RouterLink to="/tasks/task2" class="task-link">Задача 2</RouterLink>
      </li>
    </ul>

     
  </div>
</template>