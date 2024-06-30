<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
.content {
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1200px;
}
</style>
