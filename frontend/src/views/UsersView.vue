<script setup>
  import LayoutContainer from '@/components/layout/LayoutContainer.vue';
  import { onBeforeMount, onMounted, ref } from 'vue';
  import ButtonBase from '@/components/base/ButtonBase.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
  import { useUsersStore } from '@/stores/users';
  import MessageBox from '@/components/base/MessageBox.vue';
  import { formatDate } from '@/utils/dateFormaters';

  const errorMessage = ref('');
  const usersStore = useUsersStore();
    onBeforeMount(async () => {
      const response = await(usersStore.fetchUsers())

      if(response.error) {
        console.error(response.error)
      }

      usersStore.users = response.data;
    })

  const roleOptions =  ref([
    {
      id: 2,
      value: 'Пользователь'
    },
      {
      id: 1,
      value: 'Модератор'
    },
      {
      id: 0,
      value: 'Администратор'
    }
  ])

  const user = ref({ roleId: null });

const roles = ref(null);

onMounted(() => {
  roles.value = user.value.roleId ?? null;
});

</script>

<template>
  <section class="pt-8">
    <LayoutContainer>
      <h1 class="title-primary">Пользователи</h1>
      <MessageBox v-if="errorMessage" type="error" />
      <ul v-if="usersStore.users.length > 0" class="mt-9 rounded-md shadow-md bg-white p-8">
        <li class="grid grid-cols-[168px_168px_352px_168px] justify-between items-center">
          <h4 class="font-bold table-item-base">Логин</h4>
          <h4 class="font-bold table-item-base">Дата регистрации</h4>
          <h4 class="font-bold table-item-base">Роль</h4>
        </li>
        <li>
          <ul>
            <li v-for="user in usersStore.users" :key="user.id" class="grid grid-cols-[168px_168px_352px_168px] justify-between items-center">
              <div class="table-item-base">{{ user.login }}</div>
                <div class="table-item-base">{{ formatDate(user.registeredAt, {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric'
                  })
                }}
              </div>
              <div class="table-item-base">
                <form action="" class="flex gap-2 items-center">
                  <v-select v-model="user.roleId" label="value" :options="roleOptions" :reduce="opt => opt.id" class="w-full"/>
                    <ButtonBase type="submit" class="px-2 py-1 hover:bg-blue-800"><FontAwesomeIcon :icon="faFloppyDisk"/></ButtonBase>
                </form>
              </div>
              <div class="table-item-base"><button class="cursor-pointer text-red-500 hover:text-red-800"><FontAwesomeIcon :icon="faTrash"/> Удалить</button></div>
            </li>
          </ul>
        </li>
      </ul>
    </LayoutContainer>
  </section>
</template>

<style>
  .vs__clear {
    display: none;
  }

  .vs__open-indicator {
    display: none;
  }

  .vs__dropdown-toggle {
    border-radius: 6px;
  }
  .vs__selected-options {
    padding-top: 4px;
  }
</style>
