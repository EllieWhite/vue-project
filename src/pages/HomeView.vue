<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const onBtnClick = () => {
        router.push("/contacts")
    }
</script>

<template>
    <h2>HOME VIEW</h2>
    <button @click="onBtnClick">перейти</button>
</template>