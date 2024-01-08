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
const aboutAdmin = getDatabase(app);
const joinMember = getDatabase(app);
const auth = getAuth()
const database = getDatabase(app);
var logOut = $("#adminLogout");
let logdata = [];
logOut.on("click", function () {
  localStorage.clear();
});

// Регистрация администратора
const adminRegisterForm = document.getElementById('admin-register-form');
adminRegisterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = adminRegisterForm['admin-email'].value;
  const password = adminRegisterForm['admin-password'].value;

  createUserWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      console.log(userCredential)
      // Добавляем атрибут "isAdmin" к учетной записи
      updateProfile(userCredential.user, {
        isAdmin: true
      });
      set(ref(database, 'admins/' + userCredential.user.uid), {
        email: userCredential.user.email,
        isAdmin: true
    });
    
      console.log('Admin registered:', userCredential.user);
    })
    .catch((error) => {
      console.error('Admin registration error:', error);
    });
});

if (JSON.parse(localStorage.getItem("adminTrue"))) {
  var adminName = JSON.parse(localStorage.getItem("adminTrue"));
  $(".admin-name").text(adminName.username);
}

let joinTable = $("#joinTable");

onValue(ref(joinMember, "/users"), async (snapshot) => {
  const user = (await snapshot.val()) || {};
  let array = Object.entries(user);

  let data = array.map((item) => {
    return {
      id: item[0],
      ...item[1],
    };
  });
  joinTable.html(
    data
      .map(
        (user, index) => `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${user.username}</td>
            <td>${user.email}</td>
         </tr>

    `
      )
      .join("")
  );
});

let contactTable = $("#contactTable");

onValue(ref(joinMember, "/contacts"), async (snapshot) => {
  const contact = (await snapshot.val()) || {};
  let array = Object.entries(contact);

  let data = array.map((item) => {
    return {
      id: item[0],
      ...item[1],
    };
  });
  contactTable.html(
    data
      .map(
        (user, index) => `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${user.fullName}</td>
            <td>${user.address}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.bookName}</td>
            <td>${user.price}</td>
         </tr>

    `
      )
      .join("")
  );
});

// $(document).ready(function (e) {
//   var check = JSON.parse(localStorage.getItem("adminTrue"));
//   if (!check) {
//     document.location.href = "admin-login.html";
//     return;
//   } else {
//     return;
//   }
// });


onValue(ref(aboutAdmin, "/about"), async (snapshot) => {
  const about = await snapshot.val();
  if (!about) {
    return;
  }
  console.log(about);
  $("#nameInputTitle").val(about.title);
  $("#nameInputDesc").val(about.desc);
  $("#nameInputUrl").val(about.url);

});




$("#admin-about-store").on("click", async function (e) {
  e.preventDefault();

  let adminAboutTitle = $("#nameInputTitle");
  let adminAboutDesc = $("#nameInputDesc");
  let adminAboutUrl = $("#nameInputUrl");

  if (
    adminAboutTitle.val().trim().length <= 2 ||
    adminAboutDesc.val().trim() === "" ||
    adminAboutUrl.val().trim() === ""
  ) {
    $(".join-error").fadeIn(10);
    return;
  }

  let about = {
    title: adminAboutTitle.val(),
    desc: adminAboutDesc.val(),
    url: adminAboutUrl.val(),
  };

  await set(ref(aboutAdmin, "/about"), about);
  $(".join-error").fadeOut();
  $(".join-success").fadeIn(10);


  setTimeout(function () {
    $(".join-error").fadeOut();
    $(".join-success").fadeOut();
  }, 1000);
});


// Функция отображения логов
async function displayLogs() {
  
  const logsRef = ref(database, 'visits/');
  const snapshot = await get(logsRef);
  const logs = [];

  // Проходимся по каждому пользователю
  snapshot.forEach((userSnapshot) => {
      const userId = userSnapshot.key;
      const userLogs = userSnapshot.val();

      // Проходимся по каждому токену сессии пользователя
      for (let sessionToken in userLogs) {
          const sessionData = userLogs[sessionToken];
          let i = 0;
          // Проходимся по каждой странице в сессии
          for (let pageId in sessionData) {
              
              let size = Object.keys(sessionData).length;
              if(i < size-1){ 
                
                      logs.push({
                          userId: userId,
                          sessionToken: sessionToken,
                          pageId: pageId,
                          sessionTimestamp:sessionData[Object.keys(sessionData)[size-1]],
                          timestamp: sessionData[pageId].timestamp  // предполагая, что у вас есть метка времени для каждой записи
                  });
                      logdata.push({
                          userId: userId,
                          sessionToken: sessionToken,
                          pageId: pageId,
                          sessionTimestamp:sessionData[Object.keys(sessionData)[size-1]],
                          timestamp: sessionData[pageId].timestamp  // предполагая, что у вас есть метка времени для каждой записи
                      });
                  i++
               }else {
                 
                  continue;
               }
          }
      }
  });

  // Отображение логов в таблице
  const tableBody = document.getElementById('logsTable').getElementsByTagName('tbody')[0];
 
  logs.forEach(log => {
    if(log.sessionTimestamp){
      
      const row = tableBody.insertRow();
      row.insertCell(0).innerText = log.userId;
     
      row.insertCell(1).innerText = log.sessionToken;
      
      row.insertCell(2).innerText = log.pageId;
     
      row.insertCell(3).innerText = new Date(log.timestamp).toLocaleString();  // Преобразование метки времени в удобный формат даты и времени
     
      row.insertCell(4).innerText =  typeof log.sessionTimestamp === 'string' ? new Date(log.sessionTimestamp).toLocaleString() :  new Date(log.sessionTimestamp.timestamp).toLocaleString();  // Преобразование метки времени в удобный формат даты и времени
    }  
  });
  

const usersWithSingleSessionVisits = findSinglePageSessionVisits(logs);
console.log('ИЗЕЙШАЯ',usersWithSingleSessionVisits);
// Отображение логов в таблице
  const tableBodyBounce = document.getElementById('logsTableBounce').getElementsByTagName('tbody')[0];
 
  usersWithSingleSessionVisits.forEach(log => {
      const row = tableBodyBounce.insertRow();
      row.insertCell(0).innerText = log.userId;
      row.insertCell(1).innerText = log.sessionToken;
  });
  return logs;
}


let logsPromise = displayLogs();
let logsData = []
let bounceData = []
let sortOrder = {
timestamp: 'asc', // начальная сортировка по возрастанию
sessionTimestamp: 'asc' // начальная сортировка по возрастанию
};
// обрабатываем значение массива logs после завершения Promise
logsPromise.then((logs) => {

logsData= logs;
console.log(logsData);
bounceData = findSinglePageSessionVisits(logsData);
 // Для рассчета уникальных сессий
let uniqueSessions = new Set();

logsData.forEach(item => uniqueSessions.add(item.sessionToken));
console.log(bounceData.length)
console.log(uniqueSessions)
let bounceRate = (bounceData.length / uniqueSessions.size) * 100;

console.log(`Процент отказов: ${bounceRate.toFixed(2)}%`);
// Предположим, что у вас есть ссылка на canvas и у вас уже есть bounceRate
const ctx = document.getElementById('bounceChart').getContext('2d');
const bounceProcent = document.getElementById('bounceRate')
// Отобразите процент отказов
bounceProcent.textContent = `Процент отказов : ${bounceRate.toFixed(2)}%`
new Chart(ctx, {
  type: 'doughnut',
  data: {
      labels: ['Отказы', 'Успешные сессии'],
      datasets: [{
          data: [bounceRate, 100 - bounceRate], // 100% минус процент отказов
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }]
  },
  options: {
      responsive: true,
   
  }
});

});

function sortLogsBySessionTimestamp() {
logsData.sort((a, b) => {
    if (sortOrder.sessionTimestamp === 'asc') {
        return new Date(a.sessionTimestamp) - new Date(b.sessionTimestamp);
    } else {
        return new Date(b.sessionTimestamp) - new Date(a.sessionTimestamp);
    }
});
displayLogs1(); // функция отображения данных
}
function sortLogsByTimestamp() {
logsData.sort((a, b) => {
    if (sortOrder.timestamp === 'asc') {
        return new Date(a.timestamp) - new Date(b.timestamp);
    } else {
        return new Date(b.timestamp) - new Date(a.timestamp);
    }
});
displayLogs1(); // функция отображения данных
}

// добавляем слушатель событий к заголовку таблицы
document.getElementById('timestampHeader').addEventListener('click', () => {
sortOrder.timestamp = sortOrder.timestamp === 'asc' ? 'desc' : 'asc';
sortLogsByTimestamp();
});
// добавляем слушатель событий к заголовку таблицы
document.getElementById('sessionTimestampHeader').addEventListener('click', () => {
sortOrder.sessionTimestamp = sortOrder.sessionTimestamp === 'asc' ? 'desc' : 'asc';
sortLogsBySessionTimestamp();
});
// Функция отображения данных в таблице
function displayLogs1() {
const tableBody = document.getElementById('logsTable').getElementsByTagName('tbody')[0];
tableBody.innerHTML = ''; // очистка тела таблицы перед добавлением отсортированных данных

logsData.forEach(log => {
  if(log.sessionTimestamp){
    console.log("Логи",log.sessionTimestamp)
    const row = tableBody.insertRow();
    row.insertCell(0).innerText = log.userId;
     
    row.insertCell(1).innerText = log.sessionToken;
    
    row.insertCell(2).innerText = log.pageId;
   
    row.insertCell(3).innerText = new Date(log.timestamp).toLocaleString();  // Преобразование метки времени в удобный формат даты и времени
   
    row.insertCell(4).innerText = new Date(log.sessionTimestamp).toLocaleString();  // Преобразование метки времени в удобный формат даты и времени
  }
});
}
// Создадим функцию, которая будет находить отказы (посещение только одной страницы)
// Создадим функцию, которая будет находить отказы (посещение только одной страницы)
function findSinglePageSessionVisits(userLogs) {
  const countMap = {};

  // Сначала заполняем countMap, чтобы подсчитать количество встречаний каждого sessionToken
  userLogs.forEach(log => {
    if (!countMap[log.sessionToken]) {
      countMap[log.sessionToken] = 1;
    } else {
      countMap[log.sessionToken]++;
    }
  });
  
  // Затем находим sessionToken, встречающиеся только один раз
  const uniqueSessionTokens = Object.keys(countMap).filter(sessionToken => countMap[sessionToken] === 1);
  
  // Создаем массив с пользователями, у которых найденные сессионные токены встречаются только один раз
  const uniqueUsersWithSessionTokens = userLogs
    .filter(log => uniqueSessionTokens.includes(log.sessionToken))
    .map(log => ({ userId: log.userId, sessionToken: log.sessionToken }));
  
  console.log(uniqueUsersWithSessionTokens);
  return uniqueUsersWithSessionTokens;
}









$("#menuIconForMobile").click(function () {
  if ($(".overlay").css("display") == "none") {
    $(".overlay").css("display", "block");
    $("#menuIconForMobile")
      .removeClass("fa-solid fa-bars")
      .addClass("fa-solid fa-xmark");
  } else {
    $(".overlay").css("display", "none");
    $("#menuIconForMobile")
      .removeClass("fa-solid fa-xmark")
      .addClass("fa-solid fa-bars");
  }

  if ($("#admin-panel-menuForMobile").css("display") == "none") {
    $("#admin-panel-menuForMobile").css("display", "block");
    $("#menuIconForMobile")
      .removeClass("fa-solid fa-bars")
      .addClass("fa-solid fa-xmark");
  } else {
    $("#admin-panel-menuForMobile").css("display", "none");
    $("#menuIconForMobile")
      .removeClass("fa-solid fa-xmark")
      .addClass("fa-solid fa-bars");
  }
});
$("#homeForMobile").click(function () {
  if ($("#admin-panel-menuForMobile").css("display") == "block") {
    $("#admin-panel-menuForMobile").css("display", "none");
    $("#menuIconForMobile")
      .removeClass("fa-solid fa-xmark")
      .addClass("fa-solid fa-bars");
  }
});
$("#homeForMobile").click(function () {
  if ($("#admin-panel-menuForMobile").css("display") == "block") {
    $("#admin-panel-menuForMobile").css("display", "none");
    $("#menuIconForMobile")
      .removeClass("fa-solid fa-xmark")
      .addClass("fa-solid fa-bars");
  }
});
$("#aboutForMobile").click(function () {
  if ($("#admin-panel-menuForMobile").css("display") == "block") {
    $("#admin-panel-menuForMobile").css("display", "none");
    $("#menuIconForMobile")
      .removeClass("fa-solid fa-xmark")
      .addClass("fa-solid fa-bars");
  }
});
$("#joinUsForMobile").click(function () {
  if ($("#admin-panel-menuForMobile").css("display") == "block") {
    $("#admin-panel-menuForMobile").css("display", "none");
    $("#menuIconForMobile")
      .removeClass("fa-solid fa-xmark")
      .addClass("fa-solid fa-bars");
  }
});
$("#contactForMobile").click(function () {
  if ($("#admin-panel-menuForMobile").css("display") == "block") {
    $("#admin-panel-menuForMobile").css("display", "none");
    $("#menuIconForMobile")
      .removeClass("fa-solid fa-xmark")
      .addClass("fa-solid fa-bars");
  }
});

$("#logoutForMobile").click(function () {
  localStorage.clear();

  if ($("#admin-panel-menuForMobile").css("display") == "block") {
    $("#admin-panel-menuForMobile").css("display", "none");
    $("#menuIconForMobile")
      .removeClass("fa-solid fa-xmark")
      .addClass("fa-solid fa-bars");
  }
});
