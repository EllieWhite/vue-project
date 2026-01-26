<script setup>

  const props = defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    totalPage: {
      type: Number,
      required: true
    },
    onPageChanges: {
      type: Function,
      required: true
    }
  })
  const goToPage = (page) => {
    props.onPageChanges({ page })
  }

  const activeClass = 'underline decoration-1 cursor-pointer hover:text-blue-500';
  const disabledClass = 'text-gray-400 cursor-default';

</script>

<template>
  <ul class="flex gap-4 justify-center mt-12 mb-8">
    <li>
      <button @click="goToPage(1)" :disabled="currentPage === 1" :class="currentPage === 1 ? disabledClass : activeClass">В начало</button>
    </li>
    <li>
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" :class="currentPage === 1 ? disabledClass : activeClass">Предыдущая</button>
    </li>
     <li>
      {{ currentPage }}
    </li>
    <li>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPage" :class="currentPage === totalPage ? disabledClass : activeClass">Следующая</button>
    </li>
    <li>
      <button @click="goToPage(totalPage)" :disabled="currentPage === totalPage" :class="currentPage === totalPage ? disabledClass : activeClass">В конец</button>
    </li>
  </ul>
</template>

<style>

</style>
