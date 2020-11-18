import firebase from "firebase/app"
import "firebase/auth"
import { myDevEnv } from './myenv'

const app = firebase.initializeApp({  
    apiKey: myDevEnv.REACT_APP_FIRE_BASE_API_KEY,
    authDomain: myDevEnv.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
    databaseURL: myDevEnv.REACT_APP_FIRE_BASE_DATABASE_URL,
    projectId: myDevEnv.REACT_APP_FIRE_BASE_PROJECT_ID,
    storageBucket: myDevEnv.REACT_APP_FIRE_BASE_STORAGEBUCKET,
    messagingSenderId: myDevEnv.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID,
    appId: myDevEnv.REACT_APP_FIRE_BASE_APP_ID,
    measurementId: myDevEnv.REACT_APP_FIRE_BASE_MEASUREMENT_ID,
});

// export const firebase
export const auth = app.auth()

export default app
    