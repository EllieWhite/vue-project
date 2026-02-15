import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
import ROLES from '@/constants/roles.js'

const initUser = {
   id: null,
  login:'',
  roleId: null,
  registeredAt: ''
}
export const useUserStore = defineStore('user', () => {
  const user = ref(initUser)

  const isAutorized = computed(() => !!user.value.id)

  const isAdmin = computed(() => user.value.id && user.value.roleId === ROLES.ADMIN)

  const isModerator = computed(() => user.value.id && user.value.roleId === ROLES.MODERATOR)

  const register = async (login, password) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login,
          password
        })
      })

      if(!response.ok) {
        throw new Error('Ошибка регистрации пользователя')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (login, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login,
          password
        })
      })

      if(!response.ok) {
        throw new Error('Ошибка авторизации пользователя')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

   const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      if(!response.ok) {
        throw new Error('Ошибка логаута пользователя')
      }

      const data = await response.json()

      if(!data.error) {
        user.value = initUser
      }

      return data
    } catch (error) {
      console.error(error)
    }
  }

 return { user, register, login, logout, isAutorized, isAdmin, isModerator }
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
