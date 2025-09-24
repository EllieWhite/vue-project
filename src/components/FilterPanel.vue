<script setup>

   defineProps({
      filterOptions: {
        type: Object,
        required: true
      },
    })

</script>

<template>
    <div class="filters">
      <button
        v-for="filter in filterOptions"
        class="btn btn--filter"
        :class="{ 'btn--active': filter.active }"
        @click="$emit('set-filter', filter.value)"
        :key="filter.value"
      >
        {{ filter.label }}
      </button>
    </div>
</template>


<style scoped>
  .filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 2rem;
  }
</style>