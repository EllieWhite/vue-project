<script setup>
  import { RouterView } from 'vue-router';
  import LayoutHeader from './components/LayoutHeader.vue';
  import LayoutFooter from './components/LayoutFooter.vue';

</script>

<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <LayoutHeader/>
    <main class="flex-1" style="margin-top: var(--header-height-main);">
      <RouterView />
    </main>

    <LayoutFooter/>
  </div>
</template>

<style scoped>
</style>
