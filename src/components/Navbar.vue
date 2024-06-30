<script setup>
import { RouterLink, useRouter } from 'vue-router'
import useLogout from '../composables/useLogout.js'
import getUser from '../composables/getUser.js'

const router = useRouter()
const { user } = getUser()
const { logout } = useLogout()

const handleLogout = async () => {
    await logout()
    console.log('user logged out')
    router.push({ name: 'login'})
}

</script>

<template>
    <div class="navbar">
        <nav class="nav">
            <img src="../assets/bird.svg" alt="bird">
            <h1 class="title"><RouterLink :to="{ name: 'home'}">YT Playlists</RouterLink></h1>
            <div class="links">
                <div class="user" v-if="user">
                    <RouterLink :to="{ name: 'createPlaylist' }" class="btn">Create Playlist</RouterLink>
                    <RouterLink :to="{ name: 'profile' }" class="btn">Profile</RouterLink>
                    <span class="display-name">{{ user.displayName }}</span>
                    <button @click="handleLogout">Logout</button>
                </div>
                <div class="guest" v-else>
                    <RouterLink :to="{ name: 'signup' }" class="btn">Signup</RouterLink>
                    <RouterLink :to="{ name: 'login' }" class="btn">Login</RouterLink>
                </div>
            </div>
        </nav>
    </div>


</template>

<style lang="scss" scoped>
    .navbar {
        padding: 16px;
        margin-bottom: 60px;
        background: white;
        .nav {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;

            .title {
                margin-left: 20px;
            }
            .links {
                margin-left: auto;

                a, button {
                    margin-left: 16px;
                    font-size: 14px;
                }

                .display-name {
                    font-size: 14px;
                    display: inline-block;
                    margin-left: 16px;
                    padding-left: 16px;
                    border-left: 1px solid #eee;
                }
            }
            img {
                max-height: 60px;
            }
        }
    }
</style>