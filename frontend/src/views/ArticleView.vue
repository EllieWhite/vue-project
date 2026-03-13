<script setup>
  import LayoutContainer from '@/components/layout/LayoutContainer.vue';
  import ArticleDetails from '@/components/ArticleDetails.vue';
  import ArticleDetainsForm from './ArticleDetainsForm.vue';
  import CommentsList from '@/components/CommentsList.vue';
  import CommentsForm from '@/components/CommentsForm.vue';
  import { onBeforeMount } from 'vue';
  import { useArticleStore } from '@/stores/article';
  import { useUserStore } from '@/stores/user';
  import { ref } from 'vue';
  import NotFoundView from './NotFoundView.vue';

  const articleStore = useArticleStore()
  const userStore = useUserStore()
  const notFound = ref(false)

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })

  onBeforeMount(async () => {
    try {
      const response = await articleStore.fetchArticle(props.id);
      if(response.error) {
         notFound.value = true
      }
    } catch (error) {
      console.log(error)
      notFound.value = true
    }
  })

  const formatDateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }

</script>

<template>
  <NotFoundView v-if="notFound"/>
  <LayoutContainer v-else class="py-4">
    <ArticleDetainsForm  v-if="articleStore.isInEditMode"/>
    <ArticleDetails v-else :date-options="formatDateOptions" />
  <div v-if="!articleStore.isInEditMode &&
      (userStore.isAutorized || (articleStore.article && articleStore.article.comments && articleStore.article.comments.length > 0))"
     class="mt-4">
      <h2 class="title-primary text-left">Комментарии</h2>
      <CommentsList :date-options="formatDateOptions" />
      <article v-if="userStore.isAutorized" class="mt-4 px-4 ot-4 py-6 bg-white rounded-md shadow-md">
        <CommentsForm />
      </article>
    </div>
  </LayoutContainer>
</template>
