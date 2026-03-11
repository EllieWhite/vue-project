<script setup>
  import { useModalStore } from '@/stores/modal';

  const modalStore = useModalStore()

</script>

<template>
  <div v-if="modalStore.isVisible" class="fixed inset-0 z-100">
    <div class="fixed bg-black opacity-30 inset-0"></div>
    <div class="bg-white rounded-md p-8 relative max-w-md mx-auto top-50">
      <p class="text-center">{{modalStore.message}}</p>
      <div class="flex gap-4 justify-end mt-8">
        <button type="button"  @click="modalStore.close" class="cursor-pointer bg-gray-100 rounded-md py-2 px-4 hover:bg-gray-200">Отмена</button>
        <button type="button" @click="modalStore.confirm" class="cursor-pointer text-white bg-blue-500 rounded-md py-2 px-4 hover:bg-blue-700">Да</button>
      </div>
    </div>
  </div>
</template>
