<script setup>
  import LayoutContainer from '@/components/layout/LayoutContainer.vue';
  import ArticleDetails from '@/components/ArticleDetails.vue';
  import CommentsList from '@/components/CommentsList.vue';
  import CommentsForm from '@/components/CommentsForm.vue';

</script>

<template>
  <LayoutContainer class="py-4">
    <ArticleDetails />
    <div class="mt-4">
      <h2 class="title-primary text-left">Комментарии</h2>
      <CommentsList />
      <article class="mt-4 px-4 ot-4 py-6 bg-white rounded-md shadow-md">
        <CommentsForm />
      </article>
    </div>
  </LayoutContainer>
</template>
