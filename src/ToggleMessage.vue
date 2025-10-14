<script setup>

    import { ref } from 'vue';

    const showMessage = ref(false)

    const toggleMessage = () => {
        showMessage.value = !showMessage.value
    }

    defineExpose({
        toggleMessage,
    })


</script>
<template>
    <button @click="toggleMessage">показать письку</button>
    <p v-show="showMessage">покажи</p>
</template>