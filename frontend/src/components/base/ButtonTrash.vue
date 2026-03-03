<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faTrash } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
  <button class="cursor-pointer text-red-500 hover:text-red-800">
    <FontAwesomeIcon :icon="faTrash"/>
    Удалить
  </button>
</template>
