<script setup>
import { reactive, computed, provide } from 'vue'
import FilterPanel from './components/FilterPanel.vue'
import ReviewList from './components/ReviewList.vue';

 provide('globalFilter', {
     value: 'all',
     label: 'Все',
     active: true
   });

// Отзывы с рейтингом
const reviews = reactive([
  { id: 1, author: 'Иван Иванов', text: 'Отличный сервис!', liked: true, rating: 5 },
  { id: 2, author: 'Мария Смирнова', text: 'Довольна качеством товара.', liked: false, rating: 4 },
  { id: 3, author: 'Дмитрий Кузнецов', text: 'Быстрая доставка.', liked: true, rating: 3 },
  { id: 4, author: 'Аноним', text: 'Такое себе', liked: false, rating: 2 },
])


const filterOptions = reactive([
  { value: 'all', label: 'Все', active: true },
  { value: 'liked', label: '❤️ Понравившиеся', active: false },
  { value: 'notLiked', label: '👎 Без лайка', active: false },
  { value: 'highRating', label: '⭐  и выше', active: false },
])

const filter = computed(() => {
  return filterOptions.find((f) => f.active).value
})

const filteredReviews = computed(() => {
  if (filter.value === 'liked') return reviews.filter((r) => r.liked)
  if (filter.value === 'notLiked') return reviews.filter((r) => !r.liked)
  if (filter.value === 'highRating') return reviews.filter((r) => r.rating >= 4)
  return reviews
})

const toggleLike = (review) => {
  review.liked = !review.liked
}

const removeReview = (index) => {
  reviews.splice(index, 1)
}

const setFilter = (value) => {
  filterOptions.forEach((f) => {
    f.active = f.value === value
  })
}

  // provide("author", reviews.author)
</script>

<template>
  <div class="container reviews">
    <h1 class="reviews__title">Отзывы</h1>

    <!-- Панель фильтров -->
    
    <FilterPanel :filter-options="filterOptions" @set-filter="setFilter"/>

    <!-- Список отзывов -->
    <ReviewList :reviews="filteredReviews" @toggle-like="toggleLike" @remove-review="removeReview" />
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}

.reviews__title {
  text-align: center;
  margin-bottom: 1rem;
}


:global(.btn) {
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

:global(.btn--filter) {
  padding: 6px 12px;
  background: #eee;
  border-radius: 4px;
}

:global(.btn--active) {
  background-color: #333;
  color: #fff;
}
@media screen and (max-width: 850px) {
  .review-tiles__item {
    flex-basis: calc(100% - 2rem);
  }
}

.btn--like,
.btn--delete {
  padding: 4px 10px;
}

.btn--like {
  background: #f9f9f9;
}

.btn--delete {
  background: #ffdddd;
}
</style>
