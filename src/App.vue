<script setup>

</script>

<template>
  <nav>
    <RouterLink to="/">Главное</RouterLink>
    <RouterLink to="/contacts">Контакты</RouterLink>
    <RouterLink to="/product/lamp-123">лампа</RouterLink>
    <RouterLink to="/product/light-123">свет</RouterLink>
  </nav>

  <main>
    <RouterView />
  </main>
</template>


<style src="./App.css"></style>
