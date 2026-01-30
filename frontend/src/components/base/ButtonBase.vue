<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: {
    type: [String, Object],
    default: null
  },
  buttonType: {
    type: String,
    default: 'button'
  }
})
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    class="p-2 text-[15px] text-white bg-[#2b7fff] rounded-md cursor-pointer"
  >
    <slot></slot>
  </RouterLink>

  <button
    v-else
    :type="buttonType"
    class="p-2 text-[15px] text-white bg-[#2b7fff] rounded-md cursor-pointer"
  >
    <slot></slot>
  </button>
</template>

