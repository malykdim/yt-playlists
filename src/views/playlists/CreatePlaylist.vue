<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import useStorage from '../../composables/useStorage.js'
import useCollection from '../../composables/useCollection.js'
import getUser from '../../composables/getUser.js'
import { timestamp } from '../../config/firebase.js'

const { filePath, url, uploadImage } = useStorage()
const { error, addDoc } = useCollection('playlists')
const { user } = getUser()
const router = useRouter()

const title = ref('')
const description = ref('')
const file = ref(null)
const fileError = ref(null)
const isPending = ref(false)

const handleSubmit = async () => {
    if (file.value) {
        // console.log(title.value, ' | ', description.value, ' | ', file.value)
        isPending.value = true
        await uploadImage(file.value)
        // console.log('image uploaded, url: ', url.value)
        const res = await addDoc({
            title: title.value,
            description: description.value,
            userId: user.value.uid,
            userName: user.value.displayName,
            coverUrl: url.value,
            filePath: filePath.value,
            items: [],
            createdAt: timestamp()
        })
        isPending.value = false
        if (!error.value) {
            // console.log('playlist added')
            router.push({ name: 'playlistDetails', params: { id: res.id }})
        }
    }
}

// allowed file types
const types = ['image/png', 'image/jpeg', 'image/svg']

const handleChange = (e) => {
    const selected = e.target.files[0]
    console.log(selected)

    if (selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
    } else {
        file.value = null
        fileError.value = 'Please select an image file (png, jpg or svg)'
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="create">
        <h4 class="title">Create new Playlist</h4>
        <input v-model="title" type="text" required placeholder="Playlist title">
        <textarea v-model="description" required name="" id="" cols="30" rows="7" placeholder="Playlist description..."></textarea>
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange">
        <div class="error"></div>
        <div class="error">{{ fileError }}</div>
        <button v-if="!isPending">Create</button>
        <button v-else disabled>Saving...</button>
    </form>
</template>

<style lang="scss" scoped>
.create {
    input[type="file"] {
        border: 0;
        padding: 0;
    }
    label {
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }
    button {
        margin-top: 20px;
    }
}
</style>