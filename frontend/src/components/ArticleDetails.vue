<script setup>
  import { useRouter } from 'vue-router';
  import { useArticleStore } from '@/stores/article';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faCalendar, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
  import { formatDate } from '@/utils/dateFormaters';
  import { useUserStore } from '@/stores/user';
  import { useModalStore } from '@/stores/modal';


  const articleStore = useArticleStore();
  const modalStore = useModalStore();
  const userStore = useUserStore();
  const router = useRouter();

  const props = defineProps({
    dateOptions: {
      type: Object,
      required: false
    }
  })

  const handleDeleteArticle = () => {
    modalStore.open('Удалить запись?', async () => {
      const response = await articleStore.deleteArticle();
      if (!response.error) {
        router.push('/')
      }
    });
  }
</script>

<template>
  <article class="pt-8 pb-5 px-8 rounded-md bg-white shadow-md">
    <div class="rounded-md overflow-x-hidden">
      <img :src="articleStore.article.imageUrl" alt="" class="w-full h-64 object-cover">
    </div>
    <div class="mt-5 text-[#4a5565]">
      <FontAwesomeIcon :icon="faCalendar" />
      <time :datetime="articleStore.article.publishedAt">
        {{ formatDate(articleStore.article.publishedAt, props.dateOptions) }}
      </time>
    </div>

    <div class="mt-5 flex justify-between items-center">
      <h1 class="text-3xl">{{ articleStore.article.title }}</h1>
      <div v-if="userStore.isAutorized && userStore.isAdmin" class="flex gap-2 text-lg">
        <button @click="articleStore.toggleEditMode" aria-label="Редактировать статью" class="cursor-pointer  hover:text-gray-600">
          <FontAwesomeIcon :icon="faEdit" />
        </button>
        <button @click="handleDeleteArticle" aria-label="Удалить статью" class="cursor-pointer hover:text-gray-600">
        <FontAwesomeIcon :icon="faTrash" />
        </button>
      </div>
    </div>
    <div class="mt-5">
      <p class="mb-8 text-lg whitespace-pre-wrap">
        {{ articleStore.article.content }}
      </p>
    </div>

  </article>
</template>
