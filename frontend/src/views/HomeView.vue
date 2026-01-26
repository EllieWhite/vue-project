<script setup>
  import ArticlesList from '@/components/base/ArticlesList.vue';
  import LayoutContainer from '@/components/layout/LayoutContainer.vue';
  import PaginationBase from '@/components/base/PaginationBase.vue';
  import { useArticlesStore } from '@/stores/articles';

  const articleStore = useArticlesStore();

</script>

<template>
  <LayoutContainer>
      <ArticlesList />
      <PaginationBase :current-page="articleStore.currentPage" :total-page="articleStore.totalPage" :on-page-changes="articleStore.fetchArticles"/>
  </LayoutContainer>
</template>
