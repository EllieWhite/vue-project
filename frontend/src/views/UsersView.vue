<script setup>
  import LayoutContainer from '@/components/layout/LayoutContainer.vue';
  import { onBeforeMount, ref, reactive } from 'vue';
  import ButtonBase from '@/components/base/ButtonBase.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
  import { useUsersStore } from '@/stores/users';
  import { useRolesStore } from '@/stores/roles';
  import MessageBox from '@/components/base/MessageBox.vue';
  import { formatDate } from '@/utils/dateFormaters';


  const errorMessage = ref('');
  const usersStore = useUsersStore();
  const rolesStore = useRolesStore();
  const users = ref([]);
  const isDisabledStates = reactive({});

  onBeforeMount(async () => {
    Promise.all([
      rolesStore.fetchRoles(),
      usersStore.fetchUsers()
    ]).then(([rolesResponse, usersResponse]) => {
      if (rolesResponse.error || usersResponse.error) {
        console.error(rolesResponse.error || usersResponse.error);
        errorMessage.value = 'Ошибка загрузки данных'
      } else {
        rolesStore.roles = rolesResponse.data;
        usersStore.users = JSON.parse(JSON.stringify(usersResponse.data));
        users.value = JSON.parse(JSON.stringify(usersResponse.data));

        usersStore.users.forEach(user => {
          isDisabledStates[user.id] = true;
        });
      }
    })
  })

  const handleDeleteUser = async (id) => {
    errorMessage.value = '';
    const response = await usersStore.deleteUser(id);
    console.log('aaa')
   if (response.error) {
    errorMessage.value = response.error;
  } else {
    usersStore.users = usersStore.users.filter(user => user.id !== id)
    users.value = users.value.filter(user => user.id !== id)
  }
  }


  const handleSampleRole = (user) => {
    const storedUser = usersStore.users.find(u => u.id === user.id)
    // console.log("first:", storedUser.roleId , "next:", user.roleId )
    if (storedUser.roleId !== user.roleId) {
      isDisabledStates[user.id] = false
    } else {
      isDisabledStates[user.id] = true
    }
  }

  const handleUserRole = async (user) => {
    const storedUser = usersStore.users.find(u => u.id === user.id)

    if(user.roleId === storedUser.roleId) {
      return
    }

    const response = usersStore.changeUserRole(user.id, user.roleId);

    if (response.error) {
      console.error(response.error)
      errorMessage.value = response.error
      user.roleId = storedUser.roleId
    } else {
      console.log('обновлено')
      storedUser.roleId = user.roleId
      isDisabledStates[user.id] = true
    }
  }
</script>

<template>
  <section class="pt-8">
    <LayoutContainer>
      <h1 class="title-primary">Пользователи</h1>
      <MessageBox v-if="errorMessage" type="error" />
      <ul v-if="users.length > 0" class="mt-9 rounded-md shadow-md bg-white p-8">
        <li class="grid grid-cols-[168px_168px_352px_168px] justify-between items-center">
          <h4 class="font-bold table-item-base">Логин</h4>
          <h4 class="font-bold table-item-base">Дата регистрации</h4>
          <h4 class="font-bold table-item-base">Роль</h4>
        </li>
        <li>
          <ul>
            <li v-for="user in users" :key="user.id" class="grid grid-cols-[168px_168px_352px_168px] justify-between items-center">
              <div class="table-item-base">{{ user.login }}</div>
                <div class="table-item-base">{{ formatDate(user.registeredAt, {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric'
                  })
                }}
              </div>
              <div class="table-item-base">
                <form @submit.prevent="handleUserRole(user)" class="flex gap-2 items-center">
                  <v-select
                    v-model="user.roleId"
                    :options="rolesStore.roles"
                    label="name"
                    :reduce="role => role.id"
                    :key="`${user.id}-${roleId}`"
                    class="w-full"
                    @option:selected="handleSampleRole(user)"
                  />

                  <ButtonBase type="submit" :disabled="isDisabledStates[user.id]" class="px-2 py-1" :class="isDisabledStates[user.id] ? 'cursor-none bg-blue-300' : ' hover:bg-blue-800'"><FontAwesomeIcon :icon="faFloppyDisk"/></ButtonBase>
                </form>
              </div>
              <div @click="handleDeleteUser(user.id)" class="table-item-base">
                <button class="cursor-pointer text-red-500 hover:text-red-800">
                  <FontAwesomeIcon :icon="faTrash"/>
                  Удалить
                </button>
              </div>
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
