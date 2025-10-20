import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth"
import { auth } from "./firebase"


interface Props {
    email: string,
    password: string
}


export const doCreateUserWithEmailandPassword = async ({email, password} : Props) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailandPassword = async ({email, password}: Props) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const doSignWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)

    return result;
}

export const doSignOut  = async() => {
    return auth.signOut()
}

export const doPasswordReset = async ({email}: Props)=> {
    return sendPasswordResetEmail(auth, email)
}

// export const doPasswordChange = async ({password} : Props) => {
//     return updatePassword(auth.currentUser, password)
// }

// export const doSendEmailVerification = async () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`
//     })
// }