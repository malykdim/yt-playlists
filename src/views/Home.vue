<script setup>
import getCollection from '../composables/getCollection.js'
import ListView from '../components/ListView.vue'

const { error, documents } = getCollection('playlists')
</script>

<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
        <ListView :playlists="documents"/>
    </div>
    <div v-else class="empty">No playlists yet</div>
  </div>
</template>

<style lang="scss" scoped>

</style>
