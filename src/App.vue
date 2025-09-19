<script setup>

  import { ref, reactive, computed } from 'vue';
  import TodoItem from './TodoItem/TodoItem.vue';

  const todos = reactive([
    {
      id: 1,
      text: 'Изучить компоненты Vue.js',
      completed: false
    },
    {
      id: 2,
      text: 'Создать TodoList приложение',
      completed: false
    },
    {
      id: 3,
      text: 'Похвалить себя за отличную работу',
      completed: false
    },
  ])

  const removeTodo = (index) => {
    todos.splice(index, 1);
    return(todos.length)
  }
  const todosEmpty = computed(() => todos.length === 0);

  const remainingTodos = computed(() => {
    return todos.filter((todo) => !todo.completed).length
  })

  const clearCompleted  = () => {
    for (let i = 0; i < todos.length; i++) {
      if(todos[i].completed) {
        todos.splice(i, 1)
      }
    }
  }

  const clearAll  = () => {
        todos.splice(0, todos.length)
  }
</script>

<template>
      <div class="container todo-app">
      <h1 class="title">Todo List</h1>
      <div class="todo-app__main">
        <ul class="todo-list">
          <li  v-for="(todo, index) in todos" :key="todo.id" :class="{ 'todo-list__item--completed': todo.completed }" class="todo-list__item">
            <TodoItem 
              v-bind="todo" 
              @complete-todo.once="() => (todo.completed = true)" 
              @remove-todo="removeTodo(index)" 
            />
          </li>
        </ul>
        <div v-if="todosEmpty" class="todo-list__empty">
          <p>Список задач пуст</p>
        </div>
      </div>

      <div class="todo-app__footer" v-if="!todosEmpty">
        <p class="todo-app__footer-text">Осталось {{ remainingTodos }} задания(й)</p>
        <button class="btn btn--clear" @click="clearCompleted">Удалить завершенные</button>
        <button class="btn btn--clear" @click="clearAll">Очистить список</button>
      </div>
    </div>
</template>

<style src="./App.css"></style>
