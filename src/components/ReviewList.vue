<script setup>
import ReviewListItem from './ReviewListItem.vue';

    defineProps({
        reviews:{
            type: Array,
            required: true
        },
        index: Number
    })
</script>

<template>
    <ul class="review-tiles">
        <li v-for="(review, index) in reviews" :key="review.id" class="review-tiles__item">
            <ReviewListItem v-bind="review" @toggle-like="$emit('toggle-like', review)" @remove-review="$emit('remove-review', index)"/>
        </li>

        <li
        v-if="reviews.length === 0"
        class="reviews-tiles__item reviews-tiles__item--empty"
        >
        <p>Нет отзывов по выбранному фильтру.</p>
        </li>
    </ul>
</template>

<style>

    .review-tiles {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    gap: 1rem;
    padding: 0;
    }

    .review-tiles__item {
    flex-basis: calc(100% / 3 - 5rem);
    border: 1px solid #bebcbd;
    border-radius: 10px;
    padding: 1rem 2rem;
    }

    .reviews-tiles__item--empty {
    text-align: center;
    padding: 1rem;
    font-style: italic;
    color: #777;
    }

    .review__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;
    }

    .review__text {
    color: #807d7e;
    margin-bottom: 1.5rem;
    }

    .review__author {
    font-weight: bold;
    margin-bottom: 0.3rem;
    }

    .review__rating {
    color: gold;
    font-size: 1.2rem;
    }

    .review__actions {
    display: flex;
    gap: 10px;
    }

</style>