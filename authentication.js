
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyArUFRPdwPx2ukgvRPLSdywUpG2v70fFyg",
    authDomain: "cs102-c14fd.firebaseapp.com",
    projectId: "cs102-c14fd",
    storageBucket: "cs102-c14fd.appspot.com",
    messagingSenderId: "188857887033",
    appId: "1:188857887033:web:5ac07db99d7884c8cf60e8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(); 

const submit = document.getElementById('submit');

submit.addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Account created successfully!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
