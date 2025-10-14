<script setup>

  import { Form, Field, ErrorMessage } from 'vee-validate'
  import * as yup from 'yup'

  const schema = yup.object({
    name: yup.string().required('имя обязательно')
  })

  const onFormSubmit = () => {
   alert('yes')
  }
</script>

<template>
 <Form :validation-schema="schema" @submit="onFormSubmit">
  <Field type="text" v-model="name" name="name" id="name" />
  <ErrorMessage name="name" />
  <Field type="email" v-model="email" name="email" id="email" />

  <button type="submit">отправить</button>
 </Form>

</template>


<style src="./App.css"></style>
