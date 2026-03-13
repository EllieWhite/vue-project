<script setup>
  import LayoutContainer from '@/components/layout/LayoutContainer.vue';
  import { useRouter } from 'vue-router';
  import { Field, Form, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faFloppyDisk, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
  import { useArticleStore } from '@/stores/article';
  import { ref } from 'vue';
  import ButtonBase from '@/components/base/ButtonBase.vue';
  import InputBase from '@/components/base/InputBase.vue';

  const router = useRouter();
  const articleStore = useArticleStore();

  const imageUrl = ref('');
  const title = ref('');
  const content = ref('');

  const errorMessage = ref('');

  const resetData = () => {
    imageUrl.value = '';
    title.value = '';
    content.value = ''
  }

  const schema = yup.object({
    imageUrl: yup.string().required('Поле обязательно').url('Введите корректный URL'),
    title: yup.string().required('поле Заголовок обязательно'),
    content: yup.string().min(1, 'поле Содержание должно содержать минимум 50 символов').required('поле Содержание обязательно'),
  })


  const handleCreateArtcle = async (newContent) => {
    errorMessage.value = '';
    const response = await articleStore.createArticle(newContent)

    if(response.error) {
      errorMessage.value = response.error
    } else {
      router.push(`/post/${response.data.id}`)
    }
  }

</script>

<template>
  <LayoutContainer class="py-4">
    <Form autocomplete="off" :validation-schema="schema" @submit="handleCreateArtcle" class="pt-8 pb-10 px-8 rounded-md bg-white shadow-md">
      <div class="flex justify-between items-center">
        <h1 class="title-primary text-left">Создать статью</h1>
        <div class="flex gap-2">
           <ButtonBase @click="resetData" aria-label="Очистить" class="w-10 hover:bg-blue-800">
              <FontAwesomeIcon :icon="faArrowRotateLeft" />
          </ButtonBase>
          <ButtonBase type="submit" aria-label="Сохранить статью" class="w-10 hover:bg-blue-800">
              <FontAwesomeIcon :icon="faFloppyDisk" />
          </ButtonBase>
        </div>
      </div>

        <label for="imageUrl" class="label-edit">
          URL изображения:
        </label>
        <InputBase type="text" name="imageUrl" id="imageUrl" v-model="imageUrl" placeholder="Url изображения" class="text-md"/>
        <ErrorMessage name="imageUrl" class="text-red-500 mt-1 text-sm" />

        <label for="title" class="label-edit">
          Заголовок статьи:
        </label>
        <InputBase type="text" name="title" id="title" v-model="title" placeholder="Заголовок статьи" class="text-md"/>
        <ErrorMessage name="title" class="text-red-500 mt-1 text-sm" />

        <label for="content" class="label-edit">
          Содержание статьи:
        </label>
        <Field as="textarea" name="content" id="content" v-model="content" placeholder="Содержание статьи" rows="15" class="text-lg whitespace-pre-wrap w-full h-full border-base p-2" />
        <ErrorMessage name="content" class="text-red-500 mt-1 text-sm" />
      </Form>
  </LayoutContainer>
</template>
