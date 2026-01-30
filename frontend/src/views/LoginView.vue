<script setup>
  import { Form, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import LabelBase from '@/components/base/LabelBase.vue';
  import InputBase from '@/components/base/InputBase.vue';
  import MessageBox from '@/components/base/MessageBox.vue';
  import ButtonBase from '@/components/base/ButtonBase.vue';
  import { useUserStore } from '@/stores/user';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';


  const router = useRouter();
  const userStore = useUserStore();
  const errorMessage = ref('');

  const schema = yup.object({
    login: yup.string().required('поле login обязательно').min(2, 'login должен содержать минимим 2 символа'),
    password: yup.string().min(6, 'password должен содержать минимум 6 символов').required('поле password обязательно'),
  })

  const handleSubmit = async (formData) => {
    errorMessage.value = '';
    try {
      const data = await userStore.login(formData.login, formData.password)

      if (data?.error) {
        throw new Error(data?.error)
      }
      userStore.user = data.user
      router.push('/')

    } catch (error) {
      errorMessage.value = error
    }

      if (userStore.isAutorized) {
    console.log('aaaaaaaaaa')
  }
  }
</script>

<template>
  <section class="pt-8">
    <div class="w-96 mx-auto">
      <h1 class="title-primary">Вход</h1>
      <Form  @submit="handleSubmit" autocomplete="off" class="mt-4" :validation-schema="schema">
        <div class="rounded-md shadow-md bg-white p-7">
          <div>
            <LabelBase for="login">Логин</LabelBase>
            <InputBase type="text" name="login" id="login"/>
            <ErrorMessage name="login" class="text-red-500 mt-1 text-sm" />
          </div>
          <div class="mt-4">
            <LabelBase for="password">Пароль</LabelBase>
            <InputBase type="password" name="password" id="pasword"/>
            <ErrorMessage name="password" class="text-red-500 mt-1 text-sm" />
          </div>
          <ButtonBase type="submit" class="w-full mt-4">Вход</ButtonBase>
          <MessageBox type="error" class="mt-4">{{ errorMessage }}</MessageBox>
        </div>
      </Form>
      <p class="mt-8">нет логина?
        <ButtonBase to="/register" linkType="true" class="w-full block text-center mt-2">Зарегистрироваться</ButtonBase>
      </p>
    </div>
  </section>

</template>
