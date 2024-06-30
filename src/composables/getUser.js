import { ref } from 'vue'
import { projectAuth } from '../config/firebase'

const user = ref(projectAuth.currentUser)

// auth changes
projectAuth.onAuthStateChanged(_user => {
    // null if user has logged out
    console.log('User state change. Current user is: ', _user)
    user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser