<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
    <h2>страница товара {{ route.params.id }}</h2>
</template>