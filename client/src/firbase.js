import firebase from "firebase/app"
import "firebase/auth"
import { env } from './env/myenv'

const app = firebase.initializeApp({  
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    databaseURL: env.databaseURL,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId,
    appId: env.appId,
    measurementId: env.measurementId,
});

// export const firebase
export const auth = app.auth()

export default app
    