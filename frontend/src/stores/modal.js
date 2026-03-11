import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const message = ref('Вы уверены?')
  const isVisible = ref(false)
  const callback = ref(null)

  const open = (newMessage, newCallback) => {
    message.value = newMessage
    callback.value = newCallback
    isVisible.value = true
  }

  const close = () => {
    isVisible.value = false
  }

  const confirm = () => {
    callback.value()
    close()


  }

 return { isVisible, message, open, close, confirm }
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot))
}
