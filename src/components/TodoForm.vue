<script setup>
    import { ref } from 'vue';
    const taskValue = ref('')
    const emit = defineEmits(['add-to'])

    const addTo = () => {
        if(taskValue.value !== '') {
            emit('add-to', taskValue.value);
            taskValue.value = ''
        }
    }
</script>

<template>
    <form class="form">
      <div class="form__group form__group--todo">
        <input v-model.trim="taskValue" class="form-control" type="text" placeholder="Новая задача" />
        <button class="btn btn--add-todo" type="submit" @click.stop.prevent="addTo">Добавить</button>
      </div>
    </form>
</template>