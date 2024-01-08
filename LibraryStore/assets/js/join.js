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
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged, createUserWithEmailAndPassword,signInAnonymously  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
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
window.addEventListener("scroll", function () {
  let div1 = document.querySelector(".sticky-top");
  if (window.scrollY > 0) {
    div1.className = "header-menu sticky-top";
  } else if (window.scrollY == 0) {
    div1.className = "pt-3 sticky-top";
  }
});

$("#home-login-btn").on("click", async function (e) {
  let email = document.getElementById('home-login-email').value;
  let password = document.getElementById('home-login-password').value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  const timestamp = new Date().toISOString();
  const newSessionToken = generateUniqueSessionToken();
  saveSessionTokenToStorage(newSessionToken);
  logVisitSession(user.id, newSessionToken,timestamp)
  const dt = new Date();
  update(ref(database, 'users/'+ user.uid),{
      last_login: dt,
  })
  alert('Успешный вход')
  setTimeout(function () {
    window.location.reload();
  }, 1250);
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage);
});



});

$('#signOut').on('click', function(e) {
  e.preventDefault();
  const auth = getAuth();
  auth.signOut().then(function() {
    const timestamp = new Date().toISOString();
    const newSessionToken = generateUniqueSessionToken();
    saveSessionTokenToStorage(newSessionToken);
    logVisitSession(user.uid, newSessionToken,timestamp)
    console.log('Пользователь вышел из аккаунта');
    setTimeout(function () {
      window.location.reload();
    }, 1250);
  }).catch(function(error) {
    // Обработка ошибок выхода из аккаунта
    console.error('Ошибка выхода из аккаунта', error);
  });
});









$("#home-join-btn").on("click", async function (e) {
  e.preventDefault();
  let email = document.getElementById('home-join-email').value;
  let password = document.getElementById('home-join-password').value;
  let username = document.getElementById('home-join-name').value;

  try {
    // Регистрация пользователя в Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Загрузка аватара
    const file = document.getElementById('home-join-avatar').files[0];
    const storage = getStorage(app);
    const storageReference = storageRef(storage, `avatars/${user.uid}/${file.name}`);
    const timestamp = new Date().toISOString();
    const newSessionToken = generateUniqueSessionToken();
    saveSessionTokenToStorage(newSessionToken);
    logVisitSession(user.uid, newSessionToken,timestamp)

  
    uploadBytes(storageReference, file).then((snapshot) => {
      console.log('Upload is complete');
      // Здесь можно получить URL или выполнить другие действия по завершении загрузки
      return getDownloadURL(storageReference);
     }).then(async (downloadURL) => {
      // Сохраните URL аватара в Firestore
      await set(ref(database, 'users/' + user.uid), {
          username: username,
          email: email,
          avatarURL: downloadURL
      });
      
      alert("User Created with Avatar URL saved");
  }).catch((error) => {
      // Обработка ошибок загрузки
      console.error("Error uploading avatar:", error);
      alert(error.message);
  });

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  }


  setTimeout(function () {
    window.location.reload();
  }, 1250);
});



$(document).ready(function() {
  $('input').keyup(function(event) {
      if (event.which === 13)
      {
          event.preventDefault();
          $('form').submit();
      }
  });
});

// Функция для получения sessionToken из sessionStorage
function getSessionTokenFromStorage() {
  return sessionStorage.getItem('sessionToken');
}

// Функция для сохранения sessionToken в sessionStorage
function saveSessionTokenToStorage(sessionToken) {
  sessionStorage.setItem('sessionToken', sessionToken);
}
function generateUniqueSessionToken() {
  // Здесь можно использовать различные методы генерации уникальных токенов, например:
  return Math.random().toString(36).substr(2, 9);
}
function logVisitSession(userId, sessionToken,timestamp){
  const visitRef = ref(database, `visits/${userId}/${sessionToken}/`);
  set(visitRef, {
    timestamp: timestamp // Здесь сохраняется дата и время посещения
  })
}
// Функция для записи данных о посещении страницы
function logVisit(userId, sessionToken, pageId, timestamp) {
  const visitRef = ref(database, `visits/${userId}/${sessionToken}/${pageId}`);
  
  set(visitRef, {
    timestamp: timestamp // Здесь сохраняется дата и время посещения
  })
  .then(() => {
    console.log(`Запись для страницы ${pageId} успешно добавлена в базу данных`);
  })
  .catch((error) => {
    console.error("Ошибка при записи данных:", error);
  });
}

// Функция для записи отказа (если пользователь посетил только одну страницу)
function logRefusal(userId, sessionToken) {
  const refusalRef = ref(database, `refusals/${userId}/${sessionToken}`);
  set(refusalRef, true);
}
document.addEventListener("DOMContentLoaded", function() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // Пользователь вошел
      const userId = user.uid;
      const sessionToken = getSessionTokenFromStorage();
      console.log("ПРОФИЛЬ")
      console.log(sessionToken)
      const timestamp = new Date().toISOString();
      // Получение названия текущей HTML-страницы без расширения
        let currentPagePath = window.location.pathname; // Например, "/profile.html"
        let currentPageName = currentPagePath.split('/').pop(); // Получаем "profile.html"
        let currentPage = currentPageName.split('.')[0]; // Получаем "profile"
        console.log(currentPage); // В этой переменной будет содержаться название текущей HTML-страницы без расширения
      if (!sessionToken) {
        const newSessionToken = generateUniqueSessionToken();
        logVisitSession(userId, newSessionToken,timestamp)
        saveSessionTokenToStorage(newSessionToken);
        logVisit(userId, newSessionToken, currentPage, timestamp);
        console.log(`новый`)
        console.log(`${sessionToken}`)
      } else {
        logVisit(userId, sessionToken, currentPage, timestamp);
        console.log(`старый`)
        console.log(`${sessionToken}`)
      }
    } else {
      signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;
        const sessionToken = getSessionTokenFromStorage();
        const timestamp = new Date().toISOString();
        // Получение названия текущей HTML-страницы без расширения
        let currentPagePath = window.location.pathname; // Например, "/profile.html"
        let currentPageName = currentPagePath.split('/').pop(); // Получаем "profile.html"
        let currentPage = currentPageName.split('.')[0]; // Получаем "profile"
        console.log(currentPage); // В этой переменной будет содержаться название текущей HTML-страницы без расширения
        if (!sessionToken) {
          const newSessionToken = generateUniqueSessionToken();
          saveSessionTokenToStorage(newSessionToken);
          
          logVisit(userId, newSessionToken, currentPage, timestamp);
        } else {
          
          logVisit(userId, sessionToken, currentPage, timestamp);
        }
      })
      .catch((error) => {
        console.error("Ошибка анонимной аутентификации:", error);
      });
    }
  });
  
});

// Получение данных о сессии для подсчета отказов
async function getVisitData(userId, sessionToken) {
  const sessionRef = ref(database, `visits/${userId}/${sessionToken}`);
  const snapshot = await get(sessionRef);

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("Сессия не найдена или пуста");
    return null;
  }
}
// Вычисление "отказов" (bounce rate)
function calculateBounceRate(userId, sessionToken) {
  getVisitData(userId, sessionToken).then((data) => {
    if (data) {
      const pageCount = Object.keys(data).length;
      console.log(`Количество просмотренных страниц в сессии: ${pageCount}`);
      logRefusal(userId, sessionToken);
      // Здесь вы можете дополнительно обработать или вернуть данные по своему усмотрению
    }
  });
}