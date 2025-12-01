<script setup>
  import { computed } from 'vue'
  import { useCartStore } from '@/store/cart';
  import { storeToRefs } from 'pinia'

  const cartStore = useCartStore();
  const { totalPrice } = storeToRefs(cartStore);

const props = defineProps({
  totalPrice: {
    type: Number,
    required: true,
  },
})

const tax = computed(() => {
  return (totalPrice.value * 0.1).toFixed(2)
})
</script>

<template>
  <tr>
    <td colspan="5">
      <div class="basket-table__summary">
        <p class="basket-table__total">
          Total <b>$ {{ totalPrice.toFixed(2) }}</b>
        </p>
        <p>Tax $ {{ tax }}</p>
      </div>
    </td>
  </tr>
</template>

<style>
.basket-table__summary {
  text-align: right;
}

.basket-table__total {
  font-size: 1.4rem;
}
</style>
