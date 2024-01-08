import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  get,
  set,
  ref,
  push,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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
const contactMember = getDatabase(app);


let fullBookName = $("#fullBookName");
let bookPrice = $("#bookPrice");
$(document).ready(function () {
  var book = JSON.parse(localStorage.getItem("selectedBook"));
  
  fullBookName.val(`${book.title}`);
  bookPrice.val(`${book.price}`);

});


$("#contactBookBtn").on("click", async function (e) {
  e.preventDefault();

  let sendContact = false;

  
  let fullNameContact = $("#fullNameContact");
  let emailContact = $("#emailContact");
  let addressContact = $("#addressContact");
  let phoneContact = $("#phoneContact");


  if(fullNameContact.val().trim() === "" && emailContact.val().trim() === "" &&
  addressContact.val().trim() === "" &&
  phoneContact.val().trim() === "" &&
  fullBookName.val().trim() === "" &&
  bookPrice.val().trim() === "" 
  ){
   sendContact = true;
     $("#contactError #errorP").html("Поля не могут быть пустыми");
     $("#contactError").fadeIn(150);
     return;
  }
  else{
    if (bookPrice.val().trim() === "") {
      sendContact = true;
      $("#contactError #errorP").html("Цена не может быть пустой");
      $("#contactError").fadeIn(150);
      return;
    } else if (fullBookName.val().trim() === "") {
      sendContact = true;
      $("#contactError #errorP").html("Название книги не может быть пустым");
      $("#contactError").fadeIn(150);
      return;
    } else if (fullNameContact.val().trim() === "") {
     sendContact = true;
     $("#contactError #errorP").html("Имя не может быть пустым");
     $("#contactError").fadeIn(150);
     return;
   } else if (emailContact.val().trim() === "") {
     sendContact = true;
     $("#contactError #errorP").html("Email не может быть пустым");
     $("#contactError").fadeIn(150);
     return;
   } else if (!emailContact.val().trim().includes("@", ".")) {
     sendContact = true;
     $("#contactError #errorP").html("Email должен содержать @");
     $("#contactError").fadeIn(150);
     return;
   } else if (addressContact.val().trim() === "") {
     sendContact = true;
     $("#contactError #errorP").html("Адрес не может быть пустым");
     $("#contactError").fadeIn(150);
     return;
   } else if (phoneContact.val().trim() === "") {
     sendContact = true;
     $("#contactError #errorP").html("Телефон не может быть пустым");
     $("#contactError").fadeIn(150);
     return;
   }
 
  }

  let member = {
    bookName: fullBookName.val(),
    price: bookPrice.val(),
    fullName: fullNameContact.val(),
    email: emailContact.val(),
    address: addressContact.val(),
    phone: phoneContact.val(),
    date: new Date().toISOString()
  };

  const contactBranch = ref(contactMember, "/contacts");

  const key = push(contactBranch).key;
  const newBranch = ref(contactMember, "/contacts/" + key);

  await set(newBranch, member);

  if (!sendContact) {
    $("#contactError").fadeOut(150);
    $("#contactSuccess").fadeIn(150);
    $("#contactSuccess").fadeOut(2000);

    fullBookName.val("");
    bookPrice.val("");
    fullNameContact.val("");
    emailContact.val("");
    addressContact.val("");
    phoneContact.val("");
  }
});
