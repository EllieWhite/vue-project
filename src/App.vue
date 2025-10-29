<script setup>
//db;
import { db } from './firebase.js';
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

import { onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

// const cities = ref([{
//   key: 'msc',
//   value: 'Москва'
// },{
//   key: 'spb',
//   value: 'Санкт-Петербург'
// },
//   {
//   key: 'ovb',
//   value: 'Новосибирск'
// },
//   {
//   key: 'svx',
//   value: 'Екатеринбург'
// },
//   {
//   key: 'other',
//   value: 'Другой'
// }]);

//start fb
  const cities = ref([]);

  const error = ref(false);
  const isLoading = ref(true);

  const fetchCities = async () => {
    try {
      const citiesCollection = collection(db, 'cities');
      const citiesSnapShot = await getDocs(citiesCollection);
      cities.value = citiesSnapShot.docs.map(doc => doc.data())
    } catch (error) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }

  }

  const users = ref([]);
  const fetchData = async () => {
    const usersCollection = collection(db, 'users');
    const usersSnapShot = await getDocs(usersCollection);
    users.value = usersSnapShot.docs.map(doc => doc.data())
  }
    onMounted(() => {
      fetchCities();
  })
  

    onMounted(() => {
      fetchData();
  })
  

const registrationSuccess = ref(false);

const togglePasswordVisibility = () => {
  const passwordField = document.getElementById('password');
  passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
};

const toggleConfirmPasswordVisibility = () => {
  const passwordField = document.getElementById('password');
  passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
};

const register = async (values) => {
  isLoading.value = true;
  error.value = '';
  const filteredValue = Object.fromEntries(
    Object.entries(values).filter(([key, value]) => value !== '' && value !== null && value !== undefined)
  )
console.log(filteredValue)
  const newUser = {
    id: Date.now().toString(),
    ...filteredValue
  }

      try {
      const usersCollection = collection(db, 'users')
      const usersSnapshot = await getDocs(usersCollection)
      const existingUser = usersSnapshot.docs.find(doc => doc.data().email === newUser.email)

      if (existingUser) {
        error.value = 'Пользователь с таким email уже существует'
        return
      } else {
        const userRef = doc(db, 'users', newUser.id);
        setDoc(userRef, newUser).then(() => {
          registrationSuccess.value = true;
        });
      }
    } catch (error) {
      console.error('Error checking existing users:', error)
    } finally {
      isLoading.value = false;
    }

};
//end fb
const schema = yup.object({
  firstname: yup.string().required('Имя обязательно') ,
  lastname: yup.string().required('Фамилия обязательна'),
  country: yup.string().required('Страна/Регион обязательны'),
  city: yup.string().required('Город обязателен'),
  phone: yup.string().required('Телефон обязателен').matches(/^\+?\d{10,15}$/, 'Неверный формат телефона'),
  email: yup.string().email('Неверный формат email').required('Email обязателен'),
  password: yup.string().min(6, 'Пароль должен содержать минимум 6 символов').required('Пароль обязателен'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают').required('Подтверждение пароля обязательно'),
  comments: yup.string(),
  terms: yup.bool().required('Вы должны согласиться с условиями пользования и политикой конфиденциальности.'),
});
</script>

<template>
  <div class="container">
    <h1 class="title">Регистрация</h1>
    <div class="overlay" v-show="">Идет загрузка данныx </div>
    <Form  v-if="!registrationSuccess" class="registration-form" @submit="register" :validation-schema="schema">
      <div class="form-group">
        <label class="form-label" for="firstname">Имя *</label>
        <Field class="form-control" type="text" id="firstname" name="firstname"/>
        <ErrorMessage name="firstname" class="message message--error" />
      </div>
      <div class="form-group">
        <label class="form-label" for="lastname">Фамилия *</label>
        <Field class="form-control" type="text" id="lastname" name="lastname" />
        <ErrorMessage name="lastname" class="message message--error" />
      </div>
      <div class="form-group">
        <label class="form-label" for="country">Страна/Регион *</label>
        <Field class="form-control" type="text" id="country" name="country" />
        <ErrorMessage name="country" class="message message--error" />
      </div>
      <div class="form-group">
        <label class="form-label" for="city">Город *</label>
        <div class="custom-select">
          <Field as="select" class="form-control" id="city" name="city">
            <option value="" disabled selected>Выберите город</option>
            <option v-for="city in cities" :key="city.id" :value="city.value">{{ city.value }}</option>
          </Field>
        </div>
        <ErrorMessage name="city" class="message message--error" />
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон *</label>
        <Field class="form-control" type="tel" id="phone" name="phone" />
        <ErrorMessage name="phone" class="message message--error" />
      </div>
      <div class="form-group">
        <label class="form-label" for="email">Email *</label>
        <Field class="form-control" type="email" id="email" name="email" />
        <ErrorMessage name="email" class="message message--error" />
      </div>
      <div class="form-group form-group--password">
        <label class="form-label" for="password">Пароль *</label>
        <Field class="form-control" type="password" id="password" name="password" />
        <button class="btn-icon btn-icon--password" type="button" @click="togglePasswordVisibility">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 4.5C6.5 4.5 2 9 2 12s4.5 7.5 10 7.5S22 14.5 22 12s-4.5-7.5-10-7.5zm0 13c-3.1 0-5.5-2.4-5.5-5.5S8.9 7.5 12 7.5s5.5 2.4 5.5 5.5S15.1 17.5 12 17.5z"/>
            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2c1.1 0 2-.9 2-2s-.9-2-2-2z"/>
          </svg>
        </button>
        <ErrorMessage name="password" class="message message--error" />
      </div>
      <div class="form-group form-group--password">
        <label class="form-label" for="confirm-password">Подтвердите пароль *</label>
        <Field class="form-control" type="password" id="confirm-password" name="confirmPassword" />
        <button class="btn-icon btn-icon--password" type="button" @click="toggleConfirmPasswordVisibility">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 4.5C6.5 4.5 2 9 2 12s4.5 7.5 10 7.5S22 14.5 22 12s-4.5-7.5-10-7.5zm0 13c-3.1 0-5.5-2.4-5.5-5.5S8.9 7.5 12 7.5s5.5 2.4 5.5 5.5S15.1 17.5 12 17.5z"/>
            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2c1.1 0 2-.9 2-2s-.9-2-2-2z"/>
          </svg>
        </button>
        <ErrorMessage name="confirmPassword" class="message message--error" />
      </div>
      <div class="form-group form-group--full-width">
        <label class="form-label" for="comments">Дополнительная информация</label>
        <Field as="textarea" class="form-control" id="comments" name="comments" />
        <ErrorMessage name="comments" class="message message--error" />
      </div>
      <div class="form-group form-group--full-width">
        <label class="form-label form-label--checkbox" for="terms">
          <Field type="checkbox" id="terms" name="terms" :value="true" />
          Я согласен c условиями пользования и политикой конфиденциальности
        </label>
        <ErrorMessage name="terms" class="message message--error" />
      </div>
      <button class="btn" type="submit">Зарегистрироваться</button>
      <button class="btn" type="reset">Очистить форму</button>
    </Form>
    <div v-else class="message message--success">
      Регистрация прошла успешно!
    </div>
    <br />
    <br />
    <div class="error" v-show="error">Произошла ошибка: {{ error }}</div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem;
  background-color: #fff;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1;
}

.title {
  font-weight: 300;
  margin: 0 0 4rem;
}

.registration-form {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.form-group {
  position: relative;
  flex-basis: calc(50% - 2rem);
  margin-bottom: 1rem;
}

@media (max-width: 850px) {
  .form-group {
    flex-basis: 100%;
  }
}

.form-group--password {
  position: relative;
}

.form-group--full-width {
  flex-basis: 100%;
}

.form-label {
  display: block;
  font-size: 1.2rem;
  margin-bottom: .75rem;
}

.form-control {
  width: 100%;
  font-size: 1rem;
  padding: 1rem;
  background-color: #F6F6F6;
  border: 1px solid #F6F6F6;
  border-radius: 8px;
}

.custom-select {
  position: relative;
}

.custom-select::after {
  content: '';
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat center;
  background-size: 30px;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.custom-select select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

textarea.form-control {
  height: 150px;
  resize: none;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
}

.btn-icon--password {
  position: absolute;
  right: 1rem;
  top: calc(1.2rem + 50%);
  transform: translateY(-50%);
}

.btn-icon--password svg {
  width: 30px;
  height: 30px;
}

.btn-icon--password:hover {
  opacity: 0.7;
}

.btn {
  background-color: #F6F6F6;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.btn:hover {
  opacity: 0.8;
}

.btn[type="submit"] {
  background-color: #8A33FD;
  color: white;
}

.form-label--checkbox {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

.form-label--checkbox input {
  margin-right: 1rem;
}

.form-label--checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.form-label--checkbox input[type="checkbox"]:checked {
  background-color: #8A33FD;
}

.form-label--checkbox input[type="checkbox"]:checked:before {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  background-color: #8A33FD;
}

.message {
  margin: 0;
  font-size: .75rem;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: -1rem;
}

.message--success {
  color: #368039;
  position: static;
  font-size: 20px;
}

.error,
.message--error {
  color: #F44336;
}
</style>
