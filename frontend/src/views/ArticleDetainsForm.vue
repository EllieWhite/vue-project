<script setup>
  import { useRouter } from 'vue-router';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faTrash, faFloppyDisk, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
  import { useArticleStore } from '@/stores/article';
  import { ref } from 'vue';
  import { useModalStore } from '@/stores/modal';

  const router = useRouter();
  const modalStore = useModalStore();
  const articleStore = useArticleStore();
  const editedArticle = ref({ ...articleStore.article })

  const handleUpdateArticle = async () => {
    try {
     const response =  await articleStore.updateArticle(editedArticle.value);
     if(response === 'success') {
      articleStore.toggleEditMode()
     }
    } catch (error) {
      console.error(error)
    }
  }

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
  <form action="" @submit.prevent="handleUpdateArticle()" class="pt-8 pb-10 px-8 rounded-md bg-white shadow-md">
    <div class="flex justify-between items-center">
      <h1 class="title-primary text-left">Редактировать статью:</h1>
      <div class="flex gap-2 text-lg">
        <button @click="articleStore.toggleEditMode" aria-label="Отменить" class="cursor-pointer  hover:text-gray-600">
          <FontAwesomeIcon :icon="faArrowRotateLeft" />
        </button>
        <button type="submit" aria-label="Сохранить статью" class="cursor-pointer  hover:text-gray-600">
          <FontAwesomeIcon :icon="faFloppyDisk" />
        </button>
        <button @click="handleDeleteArticle" aria-label="Удалить статью" class="cursor-pointer hover:text-gray-600">
        <FontAwesomeIcon :icon="faTrash" />
        </button>
      </div>
    </div>

      <label for="editUrl" class="label-edit">
        URL изображения:
      </label>
      <input id="editUrl" type="text" v-model="editedArticle.imageUrl" placeholder="Url изображения" class="w-full text-md border-base p-2">

      <label for="editTitle" class="label-edit">
        Заголовок статьи:
      </label>
      <input id="editTitle" type="text" placeholder="Заголовок статьи" v-model="editedArticle.title" class="text-lg w-full border-base p-2" />

      <label for="editContent" class="label-edit">
        Содержание статьи:
      </label>
      <textarea id="editContent" v-model="editedArticle.content" placeholder="Содержание статьи" rows="15" class="text-lg whitespace-pre-wrap w-full h-full border-base p-2"></textarea>
  </form>
</template>
