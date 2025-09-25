<script setup>
    defineProps({
        totalSum: Number,
        totalTax: Number,
        emptyCheck: Boolean
    })
    const emit = defineEmits(['total-sum']);
</script>

<template>
    <tr v-if="emptyCheck">
        <td colspan="5">
            <p class="basket-table__empty">No items</p>
        </td>
    </tr>

    <tr v-if="!emptyCheck">
        <td colspan="5">
            <div class="basket-table__summary">
            <p class="basket-table__total">Total <b>${{totalSum}}</b></p>
            <p>Tax ${{totalTax}}</p>
            </div>
        </td>
    </tr>
</template>