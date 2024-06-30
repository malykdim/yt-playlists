import { createRouter, createWebHistory } from "vue-router"

// route guards
import { projectAuth } from "./firebase"

const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if (!user) {
        next({ name: 'login' })
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        beforeEnter: requireAuth
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/Login.vue')
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../views/auth/Signup.vue')
    },
    {
        path: '/playlists/create',
        name: 'createPlaylist',
        component: () => import('../views/playlists/CreatePlaylist.vue'),
        beforeEnter: requireAuth
    },
    {
        path: '/playlists/:id',
        name: 'playlistDetails',
        component: () => import('../views/playlists/PlaylistDetails.vue'),
        beforeEnter: requireAuth,
        props: true
    },
    {
        path: '/playlists/user',
        name: 'profile',
        component: () => import('../views/playlists/Profile.vue'),
        beforeEnter: requireAuth,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router