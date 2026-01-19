<script setup>
  import { ref, watch } from 'vue';
  import { debounce } from 'lodash';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';

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
        class="
          rounded-md border
          border-gray-300
          bg-white
          pl-2
          pr-20
          py-2
          rounded-l-md
          w-full"
        />
        <button class="cursor-pointer" @click="clearSearch" v-if="searchQuery !='' ">
          <FontAwesomeIcon :icon="faX" class="absolute py-3 right-16 top-0"/>
        </button>

      <button type="submit" class="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 absolute right-0 top-0">
        <FontAwesomeIcon :icon="faMagnifyingGlass" class="text-white"/>
      </button>
    </div>

  </form>
</template>
