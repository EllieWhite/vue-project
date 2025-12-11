    import { defineStore, acceptHMRUpdate } from 'pinia'
    import { ref } from 'vue'

    export const useArticlesStore = defineStore('articles', () => {

      const articles = ref([
      ])
      const isLoading = ref(false) // Новое состояние загрузки
      const error = ref(null) // Новое состояние ошибки

      const fetchArticles = async() => {

        isLoading.value = true;
        error.value = null; // Сброс ошибки перед новым запросом
        try {

          const response = await fetch('/posts');

          if (!response.ok) {

            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const { data } = await response.json();
          articles.value = data.posts || []; // Убедитесь, что articles.value всегда массив
          console.log('Fetched data:', data);

        } catch(e) {
          console.error('Failed to fetch articles:', e);
          error.value = 'Не удалось загрузить статьи.'; // Сохраняем ошибку
          // В случае ошибки, возможно, вы захотите сохранить начальные статьи или очистить их
          // articles.value = []; // Или так, если хотите очистить
        } finally {
          isLoading.value = false;
        }
      }
     return { articles, isLoading, error, fetchArticles }
    })

    if (import.meta.hot) {
     import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot))
    }
