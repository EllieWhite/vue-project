<script setup>
    import { useCounterStore } from '@/store/counter';
    import { storeToRefs } from 'pinia';


    const store =  useCounterStore();
    const { counter } = storeToRefs(store);

    const { increment } = store;
</script>

<template>
    <p>счетчик B: {{ counter }}</p>
    <button @click="increment()">кнопка B {{ store.counter }}</button>
</template>