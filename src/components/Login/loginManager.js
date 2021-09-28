import { initializeApp } from 'firebase/app';
import { } from 'firebase/auth';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, signOut, } from "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFrameWork = () => {
    initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            const { displayName, photoURL, email } = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.massage);
        })
}

export const handleFbSignIn = () => {
    const fbProvider = new FacebookAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, fbProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            user.success = true
            return user;

            // ...
        })
        .catch((error) => {
            console.log(error.message);
        });
}


export const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth).then(() => {
        const signOutUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: ''
        }

        return signOutUser;
    }).catch(error => {
        console.log(error);
    })
}

export const createUserWithEmailAndPasswordd = (email, name, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const newUserInfo = userCredential.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signInWithEmailAndPasswordd = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const newUserInfo = userCredential.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: name,
    }).then(() => {

    }).catch((error) => {

    });
}