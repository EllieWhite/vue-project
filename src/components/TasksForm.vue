<script setup>
  import { useTasksStore } from '@/store/tasks';
  import { ref } from 'vue';

  const tasksStore = useTasksStore();
  // const { addTask } = storeToRefs(tasksStore);

  const taskName = ref('cc');
  const descriptionText = ref('ff');

  const addTask = () => {
    if (taskName.value.trim()) {
      tasksStore.addTask(taskName.value, descriptionText.value)
      taskName.value = '';
      descriptionText.value = ''
    }
  };

</script>

<template>
    <form class="form" @submit.prevent="addTask">
      <h3 class="form__title">Добавить новую задачу</h3>
      <input class="form-control" type="text" placeholder="Новая задача" v-model="taskName"/>
      {{ descriptionText }}
      <textarea class="form-control" v-model="descriptionText"></textarea>
      <button class="btn btn--add-task" type="submit">Добавить</button>
    </form>
</template>