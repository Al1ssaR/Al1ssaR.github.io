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
const db = getDatabase(app);

let searchInput = $("#searchAdminInput");
let bookNameInput = $("#bookName");
let authorNameInput = $("#authorName");
let bookImageUrlInput = $("#bookImageUrl");
let bookDescriptionInput = $("#bookDescription");
let bookTypeInput = $("#bookType");
let btnAdd = $("#btnAdd");
let btnSearch = $("#btnSearch");
let bookAverageRating = $("#averageRating");
let bookPublishedDate = $("#publishDate");
let bookPrice = $("#price");
var api_key = "AIzaSyCBhO37eW2-8cWiHjOVs50O4BgcggWVQV0";
let booksCount = 0;
onValue(ref(db, "/booksCount"), async (snapshot) => {
  booksCount = (await snapshot.val()) || 0;
});

$(btnSearch).on("click", function (e) {
  e.preventDefault();

  if (searchInput.val().trim() === "") {
    $(".search-join-error #errorBookP").html("Поиск не может быть пустым");
    $(".search-join-error").fadeIn(10);
    return;
  }
  else if(searchInput.val().trim().length <= 2){
    
   $(".search-join-error #errorBookP").html("Поиск не содержать меньше 3 символов");
   $(".search-join-error").fadeIn(10);
   return;

  }

  

  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchInput.val()}&key=${api_key}`
  )
    .then((response) => response.json())
    .then((result) => {
      var volumeInfo = result.items[0].volumeInfo;
      console.log(volumeInfo);
      bookNameInput.val(volumeInfo.title);
      authorNameInput.val(volumeInfo.authors[0]);
      bookImageUrlInput.val(volumeInfo.imageLinks.thumbnail);
      bookDescriptionInput.val(volumeInfo.description);
      bookTypeInput.val(volumeInfo.categories[0]);
      if (volumeInfo.hasOwnProperty("averageRating")) {
        bookAverageRating = volumeInfo.averageRating;
      }
      if (volumeInfo.hasOwnProperty("publishedDate")) {
        bookPublishedDate = volumeInfo.publishedDate;
      }
      if(bookNameInput.val().trim() === ""){
        $(".search-join-error #errorBookP").html("Нет книги с таким названием");
        $(".search-join-error").fadeIn(10);
        return;
      }
  
   

    });
    
    $(".search-join-error").fadeOut();
    $(".search-join-success").fadeIn(10);
    $(".search-join-success").fadeOut(1500);

     





});

$(btnAdd).on("click", async function (e) {
  e.preventDefault();

  if (
    bookNameInput.val().trim().length <= 3 ||
    bookNameInput.val().trim() === "" ||
    authorNameInput.val().trim().length <= 5 ||
    authorNameInput.val().trim() === "" ||
    bookImageUrlInput.val().trim().length <= 10 ||
    bookImageUrlInput.val().trim() === "" ||
    bookDescriptionInput.val().trim().length <= 10 ||
    bookDescriptionInput.val().trim() === ""
  ) {
    $(".add-join-error").fadeIn(10);
    return;
  }

  $(".add-join-error").fadeOut(10);

  $(".add-join-success").fadeIn(15);
  $(".add-join-success").fadeOut(1500);

  await set(ref(db, "/booksCount"), ++booksCount);

  var bookJson = {
    title: bookNameInput.val(),
    authorName: authorNameInput.val(),
    imageUrl: bookImageUrlInput.val(),
    description: bookDescriptionInput.val(),
    type: bookTypeInput.val(),
    averageRating: bookAverageRating.val(),
    price:bookPrice.val(),
    publishedDate: bookPublishedDate,
  };

  await set(ref(db, `/books/${booksCount}`), bookJson);
  bookNameInput.val("");
  authorNameInput.val("");
  bookImageUrlInput.val("");
  bookDescriptionInput.val("");
  bookAverageRating.val("");
  bookPrice.val("");
  bookTypeInput.val("");
  searchInput.val("");
});
