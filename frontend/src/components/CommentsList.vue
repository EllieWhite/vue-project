<script setup>
  import { ref } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faUser } from '@fortawesome/free-solid-svg-icons';
  import ButtonTrash from '@/components/base/ButtonTrash.vue';
  import { useArticleStore } from '@/stores/article';
  import { useUserStore } from '@/stores/user';
  import { formatDate } from '@/utils/dateFormaters';
  import { useModalStore } from '@/stores/modal';
  import MessageBox from './base/MessageBox.vue';


  const articleStore = useArticleStore()
  const userStore = useUserStore();
  const modalStore = useModalStore();

  const errorMessage = ref('');

  const props = defineProps({
    dateOptions: {
      type: Object,
      required: false
    }
  })

  const handleDeleteAComment = (commentId) => {
    errorMessage.value = '';
    modalStore.open('Удалить комментарий?', async () => {
      const response = await articleStore.deleteComment(commentId);
      if (response.error) {
        errorMessage.value = response.error
      }
    });
  }

</script>

<template>
  <ul>
    <li v-for="comment in articleStore.article.comments" :key="comment.id"  class="rounded-md shadow-md bg-white px-4 pt-4 py-6 mt-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <FontAwesomeIcon :icon="faUser" />
          <h3 class="subtitle-1">{{ comment.author }}</h3>
        </div>
        <ButtonTrash v-if="userStore.isAdmin || userStore.isModerator" @click="handleDeleteAComment(comment.id)" />
      </div>
      <p><time :datetime="comment.publishedAt" class="mt-4 text-[#6A7282] text-sm">{{ formatDate(comment.publishedAt, props.dateOptions) }}</time></p>
      <p class="mt-4 whitespace-pre-wrap">{{ comment.content }}</p>
    </li>
  </ul>
  <MessageBox v-if="errorMessage" type="error">{{ errorMessage }}</MessageBox>
</template>
