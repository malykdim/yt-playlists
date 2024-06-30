<script setup>
import getUser from '../../composables/getUser.js'
import getCollection from '../../composables/getCollection.js'
import ListView from '../../components/ListView.vue'

const { user } = getUser()

const { documents: playlists } = getCollection(
    'playlists',
    ['userId', '==', user.value.uid]
)

console.log(playlists)
</script>

<template>
    <div class="profile">
        <h2>My Playlists</h2>
        <div v-if="playlists" class="playlists">
            <ListView :playlists="playlists" />
        </div>
        <div v-else class="empty">You haven't created a playlist yet.</div>
        <RouterLink :to="{ name: 'createPlaylist' }" class="btn">Create a new Playlist</RouterLink>
    </div>
</template>

<style lang="scss" scoped>

</style>