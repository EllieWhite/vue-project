<script setup>
  import { ref, onBeforeUpdate } from 'vue';

  const counter = ref(0)
  const button = ref('d')
  onBeforeUpdate(() => {
    console.log(
      'onBeforeUpdate',
    )
    console.log(
      counter.value
    )
  })

</script>

<template>
  <button ref="button" @click="counter++">кнопка {{ counter }}</button>

</template>


<style src="./App.css"></style>
