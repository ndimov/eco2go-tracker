import firebase from 'firebase';

import 'firebase/storage'

const config = {
    apiKey: "AIzaSyAf1xMhKlroWGJuSNfrpLObx8WbXZp6oGY",
    authDomain: "washu-hacktech-2021.firebaseapp.com",
    projectId: "washu-hacktech-2021",
    storageBucket: "washu-hacktech-2021.appspot.com",
    messagingSenderId: "269439224734",
    appId: "1:269439224734:web:c870c923b78f3683a3648f"
};
firebase.initializeApp(config);
const storage = firebase.storage();
const functions = firebase.functions();

export {
    storage, functions, firebase as default
}