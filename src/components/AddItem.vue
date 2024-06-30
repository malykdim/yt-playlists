<script setup>
import { ref } from 'vue'
import useDocument from '../composables/useDocument.js'

const props = defineProps({
    playlist: {
        type: Object,
        required: true
    }
})

const title = ref('')
const artist = ref('')
const showForm = ref(false)
const { updateDoc } = useDocument('playlists', props.playlist.id)

const handleSubmit = async () => {
    const newItem = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000)
    }
    await updateDoc({
        items: [...props.playlist.items, newItem]
    })
    title.value = ''
    artist.value = ''
}
</script>

<template>
    <div class="add-item">
        <button v-if="!showForm" @click="showForm = true">Add items</button>
        <form v-else @submit.prevent="handleSubmit">
            <h4>Add a new item</h4>
            <input v-model="title" type="text" placeholder="Item title" required>
            <input v-model="artist" type="text" placeholder="Artist" required>
            <button>Add</button>
        </form>

    </div>
</template>

<style lang="scss" scoped>
.add-item {
    text-align: center;
    margin-top: 40px;

    form {
        max-width: 100%;
        text-align: left;
    }
}
</style>