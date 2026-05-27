import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

  getAuth,

  signOut,

  onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

  getFirestore,

  collection,

  addDoc,

  getDocs,

  deleteDoc,

  updateDoc,

  doc,

  query,

  where

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const db = getFirestore(app);

// ELEMENTS
const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const logoutBtn = document.getElementById("logoutBtn");

const welcomeText = document.getElementById("welcomeText");

// AUTH CHECK
onAuthStateChanged(auth, (user) => {

  if (user) {

    welcomeText.innerText =
      "Logged in as: " + user.email;

    loadTasks(user);

  } else {

    window.location.href = "index.html";
  }
});

// ADD TASK
addTaskBtn.addEventListener("click", async () => {

  const user = auth.currentUser;

  if (!user) {

    alert("Please login");

    return;
  }

  if (taskInput.value.trim() === "") {

    alert("Enter task");

    return;
  }

  await addDoc(collection(db, "tasks"), {

    text: taskInput.value,

    userId: user.uid
  });

  taskInput.value = "";

  loadTasks(user);
});

// LOAD TASKS
async function loadTasks(user) {

  taskList.innerHTML = "";

  const q = query(

    collection(db, "tasks"),

    where("userId", "==", user.uid)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((task) => {

    const li = document.createElement("li");

    li.innerHTML = `

      <div>${task.data().text}</div>

      <div class="task-buttons">

        <button class="editBtn">
          Edit
        </button>

        <button class="deleteBtn">
          Delete
        </button>

      </div>
    `;

    // DELETE
    li.querySelector(".deleteBtn")
      .addEventListener("click",
      async () => {

        await deleteDoc(
          doc(db, "tasks", task.id)
        );

        loadTasks(user);
      });

    // EDIT
    li.querySelector(".editBtn")
      .addEventListener("click",
      async () => {

        const newTask = prompt(
          "Edit task",
          task.data().text
        );

        if (newTask) {

          await updateDoc(
            doc(db, "tasks", task.id),
            {
              text: newTask
            }
          );

          loadTasks(user);
        }
      });

    taskList.appendChild(li);
  });
}

// LOGOUT
logoutBtn.addEventListener("click", async () => {

  await signOut(auth);

  window.location.href = "index.html";
});