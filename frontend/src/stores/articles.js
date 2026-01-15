    import { defineStore, acceptHMRUpdate } from 'pinia'
    import { ref } from 'vue'

    export const useArticlesStore = defineStore('articles', () => {

      const articles = ref([
      ])
      const isLoading = ref(false)
      const error = ref(null)

      const fetchArticles = async(search = '') => {

        isLoading.value = true;
        error.value = null;
        try {

          const response = await fetch(`/posts?search=${search}`);

          if (!response.ok) {

            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const { data } = await response.json();
          articles.value = data.posts || [];
          console.log('Fetched data:', data);

        } catch(e) {
          console.error('Failed to fetch articles:', e);
          error.value = 'Не удалось загрузить статьи.';
        } finally {
          isLoading.value = false;
        }
      }
     return { articles, isLoading, error, fetchArticles }
    })

    if (import.meta.hot) {
     import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot))
    }
