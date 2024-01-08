import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  get,
  set,
  ref,
  update,
  push,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged, createUserWithEmailAndPassword,signInAnonymously,updateEmail,updateProfile  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBhO37eW2-8cWiHjOVs50O4BgcggWVQV0",
  authDomain: "webcoursovaya.firebaseapp.com",
  databaseURL: "https://webcoursovaya-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webcoursovaya",
  storageBucket: "webcoursovaya.appspot.com",
  messagingSenderId: "681497932420",
  appId: "1:681497932420:web:b2bf3b036abd57c2f7c8d1"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth()

// $(document).ready(async function (e) {
 
//   await set(ref(adminLogin, "/admins"), admin);
//   adminLogine(JSON.parse(localStorage.getItem("adminTrue")));


// });


$("#admin-login-logo").on("click", function (e) {
  e.preventDefault();
});



// Вход администратора
const adminLoginForm = document.getElementById('admin-login-form');
document.getElementById('admin-login-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const email = adminLoginForm['admin-email'].value;
  const password = adminLoginForm['admin-password'].value;

   signInWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      // Пользователь авторизован, получаем его данные из Firestore
      const userRef = ref(database, 'admins/' + user.uid);
      get(userRef).then((snapshot) => {
          const userData = snapshot.val();
          if (userData.isAdmin) {
            console.log('Admin logged in:', user);
            window.location.href = "admin-panel.html"
          } else {
            console.log('You are not authorized to access the admin panel.');
          }
        })
      
    })
    .catch((error) => {
      console.error('Admin login error:', error);
    });
});

