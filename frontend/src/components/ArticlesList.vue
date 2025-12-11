<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faCalendar, faComment } from '@fortawesome/free-solid-svg-icons';
  import { useArticlesStore } from '@/stores/articles';
  import { onBeforeMount } from 'vue';
  import { RouterLink } from 'vue-router';
  import { formatDate } from '@/utils/dateFormaters';

  const articleStore = useArticlesStore();

  onBeforeMount(() => {
    articleStore.fetchArticles()
  })


</script>
<template>
  <section>
    <h2 class="sr-only">Последние статьи</h2>
    <ul class="mt-8 grid grid-cols-3 gap-8">
      <li v-for="article in articleStore.articles" :key="article.id" class="flex">
        <article class="flex w-full">
          <RouterLink :to="`/post/${article.id}`" class="rounded-md bg-white w-full shadow transition-transform hover:transform-[scale(1.05)]">
            <div class="p-4 flex flex-col">
              <img :src="article.imageUrl" class="w-full h-48 object-cover" alt="">
              <h3 class="mt-4 mb-3">{{ article.title }}</h3>
              <div class="flex justify-between align-center mt-auto">
                <p>
                  <FontAwesomeIcon :icon="faCalendar"/>
                  <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
                </p>
                <p>
                  <FontAwesomeIcon :icon="faComment"/>
                  <span>{{ article.comments.length }}</span>
                </p>
              </div>
            </div>
          </RouterLink>
        </article>
      </li>

    </ul>
  </section>
</template>
