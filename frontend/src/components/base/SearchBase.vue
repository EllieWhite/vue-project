<script setup>
  import { ref, watch } from 'vue';
  import { debounce } from 'lodash';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
  import ButtonBase from '@/components/base/ButtonBase.vue';

  const props = defineProps({
    onSearch: {
      type: Function,
      required: true
    }
  })

  const searchQuery = ref('');


  let debouncedTimer;

  const handlerSearch = () => {
    clearTimeout(debouncedTimer);
    props.onSearch({search: searchQuery.value} )
  }

  const debouncedSearch = debounce(handlerSearch, 2000);

  watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery);
  });

  const clearSearch = () => {
    searchQuery.value = '';
  }
</script>

<template>
  <form @submit.prevent="handlerSearch">
    <div class="flex relative">
      <input
        v-model="searchQuery"
        type="text"
        name="search"
        placeholder="Поиск по блогу"
        class="pr-20 bg-white w-full p-2 border-base"
      />
      <button class="cursor-pointer" @click="clearSearch" v-if="searchQuery !='' ">
        <FontAwesomeIcon :icon="faX" class="absolute py-3 right-16 top-0"/>
      </button>

      <ButtonBase type="submit" class="hover:bg-blue-700 absolute right-0 top-0">
         <FontAwesomeIcon :icon="faMagnifyingGlass" class="text-white"/>
      </ButtonBase>
    </div>

  </form>
</template>
