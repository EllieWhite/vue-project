<script setup>
    // import { inject } from 'vue'; 

    // const author = inject('author')

    defineProps({
        author: String,
        rating: Number,
        text: String,
        liked: Boolean
    })
</script>

<template>
    <div class="review">
        <div class="review__header">
        <p class="review__author">{{ author }}</p>
        <div class="review__rating">
            <span v-for="n in 5" :key="`star-${n}`" class="star">
            {{ n <= rating ? '★' : '☆' }}
            </span>
        </div>
        </div>
        <p class="review__text">"{{ text }}"</p>
        <div class="review__actions">
        <button @click="$emit('toggle-like', review)" class="btn btn--like">
            {{ liked ? '❤️' : '🤍' }}
        </button>
        <button @click="$emit('remove-review', index)" class="btn btn--delete">Удалить</button>
        </div>
    </div>
</template>