<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faUser } from '@fortawesome/free-solid-svg-icons';
  import ButtonTrash from '@/components/base/ButtonTrash.vue';
</script>

<template>
  <ul>
    <li class="rounded-md shadow-md bg-white px-4 pt-4 py-6 mt-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <FontAwesomeIcon :icon="faUser" />
          <h3 class="subtitle-1">Пользователь1</h3>
        </div>
        <ButtonTrash />
      </div>
      <p><time datetime="" class="mt-4 text-[#6A7282] text-sm">31 декабря 2053 13:11</time></p>
      <p class="mt-4 whitespace-pre-wrap">Отличная статья!</p>
    </li>
    <li class="rounded-md shadow-md bg-white px-4 pt-4 py-6 mt-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <FontAwesomeIcon :icon="faUser" />
          <h3 class="subtitle-1">Пользователь1</h3>
        </div>
        <ButtonTrash />
      </div>
      <p><time datetime="" class="mt-4 text-[#6A7282] text-sm">31 декабря 2053 13:11</time></p>
      <p class="mt-4 whitespace-pre-wrap">Отличная статья!</p>
    </li>
  </ul>
</template>
