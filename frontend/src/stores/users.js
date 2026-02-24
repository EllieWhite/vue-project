import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue';

export const useUsersStore = defineStore('users', () => {
  const users = ref([]);
  const fetchUsers = async () => {

    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      return data
    } catch (error) {
      console.error(error)
    }

  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      if(!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Ошибка удаления пользователя: ${response.status}`;
        throw new Error(errorMessage);
      } else {
      const index = users.value.findIndex(user => user.id === id);
      if (index !== -1) {
        users.value.splice(index, 1);
      }
      return { users: [...users.value], error: null };
    }
  } catch (error) {
    console.error("Error in usersStore.deleteUser:", error);
    return { users: null, error: error.message || 'Неизвестная ошибка при удалении' };
  }
  }

  const changeUserRole = async (userId, userRole) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({ roleId: userRole })
      })

      if(!response.ok) {
        throw new Error('Ошибка обновления роли пользователя')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  return {users, fetchUsers, deleteUser, changeUserRole}
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}
