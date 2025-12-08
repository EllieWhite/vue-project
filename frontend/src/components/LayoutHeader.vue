<script setup>
  import LayoutContainer from './LayoutContainer.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faCode,faBackward, faFile, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
  import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="bg-white fixed top-0 left-0 right-0" style="height: var(--header-height-main);">
    <LayoutContainer>
      <div class="flex justify-between items-center h-full">
        <div>
          <RouterLink to="/" aria-label="главная страница">
            <FontAwesomeIcon :icon="faCode" />
            Блог веб-разработчика
          </RouterLink>
        </div>
        <div>
          <p>Веб-технологии</p>
          <p>Написание кода</p>
          <p>Разбор ошибок</p>
        </div>
        <div>
          <div>
            <RouterLink to="/login" class="bg-blue-500 px-4 py-2 text-white rounded-md inline-block" aria-label="войти">Войти</RouterLink>
          </div>
          <div class="mt-4 flex gap-4 items-center">
            <a href="">
              <FontAwesomeIcon :icon="faBackward" @click="$router.go(-1)" aria-label="назад"/>
            </a>
            <RouterLink to="/post" aria-label="новый пост">
              <FontAwesomeIcon :icon="faFile" />
            </RouterLink>
            <RouterLink to="/users" aria-label="пользователи">
              <FontAwesomeIcon :icon="faPeopleGroup" />
            </RouterLink>
            </div>
          </div>
        </div>
    </LayoutContainer>
  </header>

</template>
