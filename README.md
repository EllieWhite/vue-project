# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

**Основы реактивности**

    Composition API - стал доступен с появлением 3-й версии. Лучше переиспользует логику, более гибко организовывает код. 
        <script setup>
            import { ref } from 'vue';
            const name = ref("World")
        </script>

    Options API
        <script>
            export default {
                data() {
                    return {
                        name: 'World'
                    }
                }
            }
        </script>

    Vue- реактивная библиотека. Это означает, что данные в компоненте отслеживаются и изменения автоматически отобразятся, если данные поменяем.

    Стандартно в js нет доступа отследить доступ к переменной при изменении значения, но мы можем перехватывать получение и установку св-в объекта с помощью методов
    геттеров и сеттеров.

    Установка таких значений происходит при оборачивании значения переменной в метод ref().

    const name = ref('John')
    name.value = 'ss'

    ".value" дает обнаружить, когда обращались к ссылке или когда она была изменена.
    "ref" может быть использован с любыми типами данных. Под капотом работает метод reactive.
    Для примитивов использовать ref, а для объектов и массивов использовать метод reactive, так как reactive с примитивами не работает.


**Синтаксис (интерполяция, bind-атрибутов)**

    Способы вывода переменных в html-размертку всего 2: интерполяция и привязка аттрибутов.

    Интерполяция - синтаксис двойных скобок {{name}}. Есть проблема: не работает в html-аттрибутах: <p class="{{name}}"></p>. Можно использовать тернарный оператор.

    Привязка через директиву- это специальные аттрибуты (с приставкой "v-"), которые добавляют реактивное поведение к DOM-элементов.

    v-bind. Сообщает вью поддерживать связь между аттрибутом html-разметки и переменной скрипта.

        <script setup>
            import { ref } from 'vue';
            let image = 'test';
        </script>

        <template>
            <img v-bind:src="image" alt="">
        </template>

        сокращенный вариант: <img :src="image" alt="">