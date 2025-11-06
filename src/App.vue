<script setup>

</script>

<template>
  <div class="wrapper">
    <nav class="navigation">
      <div class="navigation-left">
        <RouterLink to="/dashboard" class="router-link">Dashboard</RouterLink>
        <RouterLink to="/tasks" class="router-link">Tasks</RouterLink>
        <RouterLink to="/settings" class="router-link">Settings</RouterLink>
      </div>
    </nav>
    <main class="container">
      <Transition name="fade">
        <RouterView />
      </Transition>
    </main>
  </div>
</template>


<style src="./App.css"></style>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.6s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
