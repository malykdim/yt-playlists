<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import useSignup from '../../composables/useSignup.js'

const {error, signup, isPending} = useSignup()
const router = useRouter()

const email = ref('')
const password = ref('')
const displayName = ref('')

const handleSubmit = async () => {
    const res = await signup(email.value, password.value, displayName.value)
    if (!error.value) {
        router.push({ name: 'profile' })
    }
}


</script>

<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign up</h3>
        <input type="text" placeholder="Display name" v-model="displayName">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div class="error" v-if="error">{{ error }}</div>
        <button v-if="!isPending">Sign up</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>

</template>

<style lang="scss" scoped>

</style>