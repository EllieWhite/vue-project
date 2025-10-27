<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form__group form__group--todo">
      <input class="form-control" type="text" placeholder="Новая задача" v-model.trim="newTodoText"/>
      <button class="btn btn--add-todo" type="submit">Добавить</button>
    </div>
  </form>
</template>

<script setup>
  import { ref } from 'vue'
  const newTodoText = ref('')
  const $emit = defineEmits(['add-todo'])

  const handleSubmit = () => {
    if (newTodoText.value) {
      $emit('add-todo', newTodoText.value)
      newTodoText.value = ''
    }
  }
</script>
