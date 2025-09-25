<script setup>
import BasketTableItem from './BasketTableItem.vue';
import BasketTableSummary from './BasketTableSummary.vue';

    defineProps({
        basket: Array,
        totalSum: Number,
        totalTax: Number,
        emptyCheck: Boolean

    })
</script>
<template>
    <table class="basket-table">
        <thead class="basket-table__header">
          <tr>
            <th>Product Details</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="basket-table__body">
            <tr v-for="(item, index) in basket" :key="'basket' + item.id">
                <BasketTableItem 
                    v-bind="item" 
                    @decreanse-item-quantity="$emit('decreanse-item-quantity', item)"
                    @increase-item-quantity="$emit('increase-item-quantity', item)"
                    @remove-item="$emit('remove-item', index)"
                  
                />
            </tr>
          <BasketTableSummary :totalSum="totalSum" :totalTax="totalTax" :emptyCheck="emptyCheck" />
        </tbody>
      </table>
</template>