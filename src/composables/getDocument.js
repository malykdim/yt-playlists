import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../config/firebase' 

function getDocument(collection, id) {
    const document = ref(null)
    const error = ref(null)

    // register the firestore collection reference
    const documentRef = projectFirestore.collection(collection).doc(id)

    const unsub = documentRef.onSnapshot(doc => {
        if (doc.data()) {
            // update values
            document.value = {...doc.data(), id: doc.id }
            error.value = null
        } else {
            error.value = 'That document does not exist'
        }
    }, (err) => {
        console.log(err.message)
        error.value = 'could not fetch the document'
    })

    // if the user navigates away from this route -> unsubscribe (performance & cost)
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { error, document }
}

export default getDocument