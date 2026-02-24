import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useRolesStore = defineStore('roles', () => {
  const roles = ref([])

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/users/roles');

      if(!response.ok) {
        throw new Error('Ошибка запроса ролей пользователя')
      }

      const data = await response.json();
      roles.value = data;
      return data
      } catch (error) {
      console.error(error)
    }
  }

  return { roles, fetchRoles }
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useRolesStore, import.meta.hot))
}
