<script setup>

  import { ref } from 'vue'

  const count = ref(0)




</script>

<template>
<button v-on:click=count++>кнопка</button>
<p>{{ count }}</p>








</template>

<style src="./App.css"></style>
