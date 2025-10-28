<template>
  <div class="container todo-app">
    <h1 class="title">Todo List</h1>
    <TodoForm @add-todo="addTodo" />

    <TodoList :todos="todos" @remove-todo="removeTodo" @complete-todo = "completeTodo" />

    <TodoFooter
      v-if="todos.length"
      :remaining="remainingTodos"
      @clear-completed="clearCompleted"
      @clear-all="clearAll"
    />
    <div v-if="isLoading">Загрузка...</div>
    <div v-show="error">Произошла ошибка:</div>
  </div>
</template>

<script setup>

import { reactive, computed, onMounted, ref } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import { useFetch } from './composables/useFetch'

  const todos = reactive([
    { id: 1, text: 'Изучить компоненты Vue.js', completed: true },
    { id: 2, text: 'Создать TodoList приложение', completed: false },
    { id: 3, text: 'Похвалить себя за отличную работу', completed: false },
  ])

  // const addTodo = (newTodo) => {
  //   todos.push({ id: Date.now(), text: newTodo, completed: false })
  // }

  // const removeTodo = (index) => {
  //   todos.splice(index, 1)
  // }

  const remainingTodos = computed(() =>
    todos.filter((todo) => !todo.completed).length
  )

  // const clearCompleted = () => {
  //   for (let i = todos.length - 1; i >= 0; i--) {
  //     if (todos[i].completed) {
  //       todos.splice(i, 1)
  //     }
  //   }
  // }

  // const clearAll = () => {
  //   todos.splice(0, todos.length)
  // }



  const url = ref('http://localhost:3000/todos');
  const {isLoading, error, fetchData} = useFetch();

  const fetchTodos = async () => {
    const data = await fetchData('http://localhost:3000/todos');
    todos.splice(0, todos.length, ...data)
  }

  const addTodo = async (newTodoText) => {
    const newTodoId = new Date();

    const newTodo = {
      "id": newTodoId.toString(),
      "text": newTodoText,
      "completed": false
    }

    fetchData('http://localhost:3000/todos', {
      method: 'POST',
      body: newTodo,
      headers: { 'Content-Type': 'application/json'}
    }).then(()=> {
    fetchTodos()
   });
  }

  const removeTodo = async (id) => {

    fetchData(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE'
    }).then(()=> {
    fetchTodos()
   });
  }

  const completeTodo = async (id, completed) => {
    const updateStatus = {
      "completed": !completed,
    }
     await fetchData(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      body: updateStatus,
       headers: { 'Content-Type': 'application/json'}
    }).then(()=> {
    fetchTodos()
   });
  }

  const clearAll= () => {
    for (let i = todos.length - 1; i >= 0; i--) {
      removeTodo(todos[i].id)
    }
  }
  

  const clearCompleted = () => {
    for (let i = todos.length - 1; i >= 0; i--) {
      if(todos[i].completed) {
        removeTodo(todos[i].id)
      }
    }
  }

  onMounted(() => {
    fetchTodos()
  })


</script>

<style src="./App.css"></style>
