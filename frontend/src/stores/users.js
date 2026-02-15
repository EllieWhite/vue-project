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
  return {users, fetchUsers}
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}
