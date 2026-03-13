<script setup>
  import LayoutContainer from '@/components/layout/LayoutContainer.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faCode,faBackward, faFile, faPeopleGroup, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
  import { RouterLink, useRouter, useRoute } from 'vue-router';
  import { useUserStore } from '@/stores/user';

  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await userStore.logout();

    if(!response.error && route.meta.requireAdmin) {
      router.push('/login')
    }
  }
</script>

<template>
  <header class="bg-white fixed top-0 left-0 right-0 z-50 shadow" style="height: var(--header-height-main);">
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
            <RouterLink
              v-if="!userStore.isAutorized"
              to="/login"
              class="bg-blue-500 px-4 py-2 text-white rounded-md inline-block"
              aria-label="войти">
                Войти
            </RouterLink>
            <div v-else class='flex gap-3 items-center' @click="handleLogout">
              <p>{{ userStore.user.login }}</p>
             <button class="cursor-pointer hover:text-blue-500">
                |
                <FontAwesomeIcon :icon="faArrowRightFromBracket" />
             </button>
            </div>
          </div>
          <div class="mt-4 flex gap-4 items-center justify-end">
            <a href="">
              <FontAwesomeIcon :icon="faBackward" @click="$router.go(-1)" aria-label="назад"/>
            </a>
            <RouterLink v-if="userStore.isAutorized && userStore.isAdmin" to="/post" aria-label="новый пост">
              <FontAwesomeIcon :icon="faFile" />
            </RouterLink>
            <RouterLink v-if="userStore.isAutorized && userStore.isAdmin" to="/users" aria-label="пользователи">
              <FontAwesomeIcon :icon="faPeopleGroup" />
            </RouterLink>
            </div>
          </div>
        </div>
    </LayoutContainer>
  </header>

</template>
