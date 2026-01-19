    import { defineStore, acceptHMRUpdate } from 'pinia'
    import { ref } from 'vue'

    export const useArticlesStore = defineStore('articles', () => {

      const articles = ref([])
      const currentPage = ref(1)
      const totalPage = ref(1)
      const searchQuery = ref('')

      const isLoading = ref(false)
      const error = ref(null)

      const fetchArticles = async(args) => {
        const { page, search } = args || {};

        const isNewSearch = search !== undefined && search !== searchQuery.value;

        if (isNewSearch) {
          currentPage.value = 1
          searchQuery.value = search
        } else {
          currentPage.value = page || currentPage.value
        }

        isLoading.value = true;
        error.value = null;

        try {

          const response = await fetch(`/posts?search=${searchQuery.value}&limit=3&page=${currentPage.value}`);

          if (!response.ok) {

            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const { data } = await response.json();
          articles.value = data.posts || [];
          totalPage.value = data.lastPage

        } catch(e) {
          console.error('Failed to fetch articles:', e);
          error.value = 'Не удалось загрузить статьи.';
        } finally {
          isLoading.value = false;
        }
      }
     return { articles, isLoading, error, currentPage, totalPage, fetchArticles }
    })

    if (import.meta.hot) {
     import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot))
    }
