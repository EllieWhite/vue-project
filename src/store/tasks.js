import { defineStore, acceptHMRUpdate } from 'pinia'
import { reactive, computed } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
    
    const taskList = reactive([
        {
            id: 1,
            title: 'Задача 1',
            description: 'Описание задачи'
        }
    ])

    const addTask = (title, description) => {
         taskList.push(
            {   id: taskList.length + 1,
                title: title, 
                description: description }
            );
    }

    const deleteTask = (id) => {
        const index = taskList.findIndex(task => task.id === id);
        if(index != -1) {
            taskList.splice(index, 1)
        }
        
    }
    const taskCounter = computed(() => taskList.length);
    return { taskList, taskCounter, addTask, deleteTask }

})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot))
}
