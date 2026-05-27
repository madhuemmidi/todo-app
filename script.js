import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

  getAuth,

  createUserWithEmailAndPassword,

  signInWithEmailAndPassword,

  onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// FIREBASE CONFIG
const firebaseConfig = {

  apiKey: "AIzaSyDVyKQc9Jk3yWWQdnUtOXbZuBaQCenlfaM",

  authDomain: "user-counter-767bd.firebaseapp.com",

  projectId: "user-counter-767bd",

  storageBucket: "user-counter-767bd.firebasestorage.app",

  messagingSenderId: "322579326042",

  appId: "1:322579326042:web:988d21c172c257f10d2463"
};

// INITIALIZE
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// ELEMENTS
const signupBtn = document.getElementById("signupBtn");

const loginBtn = document.getElementById("loginBtn");

const email = document.getElementById("email");

const password = document.getElementById("password");

// SIGNUP
signupBtn.addEventListener("click", async () => {

  try {

    await createUserWithEmailAndPassword(

      auth,

      email.value,

      password.value
    );

    alert("Signup successful!");

    window.location.href = "todo.html";

  } catch (error) {

    alert(error.message);
  }
});

// LOGIN
loginBtn.addEventListener("click", async () => {

  try {

    await signInWithEmailAndPassword(

      auth,

      email.value,

      password.value
    );

    alert("Login successful!");

    window.location.href = "todo.html";

  } catch (error) {

    alert(error.message);
  }
});

// AUTO LOGIN
onAuthStateChanged(auth, (user) => {

  if (user) {

    window.location.href = "todo.html";
  }
});