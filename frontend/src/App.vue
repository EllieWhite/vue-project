<script setup>
  import { RouterView, useRoute } from 'vue-router';
  import LayoutHeader from './components/layout/LayoutHeader.vue';
  import LayoutFooter from './components/layout/LayoutFooter.vue';
  import ModalBase from './components/base/ModalBase.vue';
  import { useUserStore } from './stores/user';
  import { computed } from 'vue';
  import AccessDeniedView from './views/AccessDeniedView.vue';

  const userStore = useUserStore()
  const route = useRoute()

  const canAccess = computed(() => {

    if(route.meta?.requireAdmin) {
      if(userStore.isAdmin) {
        return true
      } else {
        return false
      }
    }
    return true
  })

</script>

<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <LayoutHeader/>
    <main class="flex-1" style="margin-top: var(--header-height-main);">
      <RouterView v-if="canAccess" />
      <AccessDeniedView v-else/>
    </main>

    <LayoutFooter/>
    <ModalBase />
  </div>
</template>

<style scoped>
</style>
