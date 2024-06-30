<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import getDocument from '../../composables/getDocument.js'
import getUser from '../../composables/getUser.js'
import useDocument from '../../composables/useDocument.js'
import useStorage from '../../composables/useStorage.js'
import AddItem from '../../components/AddItem.vue'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const { error, document: playlist } = getDocument('playlists', props.id)
const { user } = getUser()
const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
const { deleteImage } = useStorage()
const router = useRouter()

const ownership = computed(() => {
    return playlist.value && user.value && user.value.uid == playlist.value.userId
})

const handleDelete = async () => {
    await deleteImage(playlist.value.filePath)
    await deleteDoc()
    router.push({ name: 'home'})
}

const onDelete = async (id) => {
    const items = playlist.value.items.filter((item) => item.id != id)
    await updateDoc({ items })
}
</script>

<template>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="playlist" class="playlist-details">
        <!-- playlist info -->
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverUrl" :alt="playlist.title" class="image">
            </div>
            <div class="title">{{ playlist.title }}</div>
            <p class="username">Created by {{ playlist.userName }}</p>
            <p class="description">{{ playlist.description }}</p>

            <button 
                v-if="ownership"
                @click="handleDelete"
                class="delete"
            >
                Delete Playlist
            </button>
        </div>

        <!-- items list -->
         <div class="items-list">
            <div v-if="!playlist.items.length">No items have been added to this playlist yet</div>
            <div v-for="item in playlist.items" :key="item.id" class="single-item">
                <div class="details">
                    <h3>{{ item.title }}</h3>
                    <h3>{{ item.artist }}</h3>
                </div>
                <button v-if="ownership" @click="onDelete(item.id)">Delete</button>
            </div>
            <AddItem v-if="ownership" :playlist="playlist" />
         </div>

    </div>
</template>

<style lang="scss" scoped>
.playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;

    .playlist-info {
        text-align: center;

        .cover {
            overflow: hidden;
            border-radius: 20px;
            position: relative;
            padding: 160px;

            .image {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                min-width: 100%;
                min-height: 100%;
                max-width: 100%;
                max-height: 100%;
                object-fit: cover;
                object-position: center;
            }
        }
        .title {
            text-transform: capitalize;
            font-size: 28px;
            margin-top: 20px;
        }
        p {
            margin-bottom: 20px;
        }
        .username {
            color: #999;
        }
        .description {
            text-align: left;
        }
    }
    .items-list {
        padding: 0;

        .single-item {
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px dashed var(--secondary);
            margin-bottom: 20px;
        }
    }
}
</style>