import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDubBkTstz05xfWxr63dVLZMr2FMXSCB-s',
    authDomain: 'elma-ecommerce-98c30.firebaseapp.com',
    projectId: 'elma-ecommerce-98c30',
    storageBucket: 'elma-ecommerce-98c30.appspot.com',
    messagingSenderId: '941757166412',
    appId: '1:941757166412:web:4c041972ed7398d16695e9',
    measurementId: 'G-X1TTZRE6QG',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
