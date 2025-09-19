<template>
    <button>{{ text }} {{ number }}</button>
</template>

<script setup>
    const props = defineProps({
        text: {
            type: String,
            required: true
        },
        number: Number
    })
</script>
