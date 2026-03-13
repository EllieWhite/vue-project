<script setup>
  import { useModalStore } from '@/stores/modal';
  import ButtonBase from './ButtonBase.vue';

  const modalStore = useModalStore()

</script>

<template>
  <div v-if="modalStore.isVisible" class="fixed inset-0 z-100">
    <div class="fixed bg-black opacity-30 inset-0"></div>
    <div class="bg-white rounded-md p-8 relative max-w-md mx-auto top-50">
      <p class="text-center">{{modalStore.message}}</p>
      <div class="flex gap-4 justify-end mt-8">
        <ButtonBase @click="modalStore.close" class="bg-gray-400 px-4 hover:bg-gray-500">Отмена</ButtonBase>
        <ButtonBase @click="modalStore.confirm" class="cursor-pointer px-4 hover:bg-blue-700">Да</ButtonBase>
      </div>
    </div>
  </div>
</template>
