<script setup>
  import ArticlesList from '@/components/ArticlesList.vue';
  import LayoutContainer from '@/components/LayoutContainer.vue';
  import PaginationBase from '@/components/PaginationBase.vue';
  import { useArticlesStore } from '@/stores/articles';

  const articleStore = useArticlesStore();

</script>

<template>
  <LayoutContainer>
      <ArticlesList />
      <PaginationBase :current-page="articleStore.currentPage" :total-page="articleStore.totalPage" :on-page-changes="articleStore.fetchArticles"/>
  </LayoutContainer>
</template>
