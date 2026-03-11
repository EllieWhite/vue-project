<script setup>
  import ButtonBase from '@/components/base/ButtonBase.vue';
  import { useArticleStore } from '@/stores/article';
  import { ref } from 'vue';

  const articleStore = useArticleStore()
  const newComment = ref('')
  const errorMessage = ref('')

  const handleCommentSubmit = async () => {
    errorMessage.value = '';

    if(!newComment.value.trim()) {
      errorMessage.value = 'Комментарий не должен быть пустым';
      return;
    }

    const response = await articleStore.addComment(newComment.value);
    if (response.error) {
      errorMessage.value = response.error
    } else {
      newComment.value = ''
    }
  }

</script>

<template>
  <form @submit.prevent="handleCommentSubmit">
    <p>Ваш комментарий</p>
    <textarea v-model="newComment" name="" id="newComment" class="border border-gray-300 w-full rounded-md p-2"></textarea>
    <div class="flex justify-between items-center mt-5">
      <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
      <ButtonBase type="submit" class="w-xs ml-auto">Отправить</ButtonBase>
    </div>
  </form>
</template>
