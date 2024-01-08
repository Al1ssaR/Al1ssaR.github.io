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
$("#btn-search").on("click", async function (e) {
  e.preventDefault();
  let search = $("#search-input");

  if (search.val().trim() === "") {
    $("#searchSuccess").fadeOut(10);
    $("#searchError #errorP").html("Поиск не может быть пустым");
    $("#searchError").fadeIn(150);
    search.val("");
    return;
  } else if (search.val().length < 3) {
    $("#searchSuccess").fadeOut(10);
    $("#searchError #errorP").html("Поиск должен быть больше 3х символов");
    $("#searchError").fadeIn(150);
    search.val("");
    return;
  } else if (search.val().length > 22) {
    $("#searchSuccess").fadeOut(10);
    $("#searchError #errorP").html("Поиск должен быть меньше 22 символов");
    $("#searchError").fadeIn(150);
    search.val("");
    return;
  }

  let searchInput = $("#search-input").val();

  onValue(ref(db, "/books"), async (snapshot) => {
    $("#first").slick("removeSlide", null, null, true);
    var f = false;
    var booksJson = await snapshot.val();
    let bookID = 1;
    for (var index in booksJson) {
      var book = booksJson[index];

      var description = book.description.substring(0, 400) + "...";
      var div = `
        <div class="box">
           <div class="row">
             <div class="col-lg-5 col-6 p-3">
               <img src="${book.imageUrl}" width="100%" alt="" />
             </div>
             <div class="col-lg-7 p-2 read-more-container">
               <h2>${book.title}</h2>
               <p>${book.authorName}</p>
               <p id="read-more">
               ${description}
               <span class ="read-more-text">${book.description}</span>
               </p>
               <span class="read-more-btn">Узнать больше</span>
             </div>
           </div>
        </div>
      `;
      var re = new RegExp(searchInput, "i");
      if (book.hasOwnProperty("title") && book.title.search(re) > -1) {
        $("#first").slick("slickAdd", div);
        f = true;
      }

      bookID++;
    }

    if (f) {
      $("#searchError").fadeOut(10);
      $("#searchSuccess").fadeIn(150);
      $("#searchSuccess").fadeOut(3000);
    } else {
      $("#searchSuccess").fadeOut(10);
      $("#searchError #errorP").html(
        "Нет книг с таким названием"
      );
      $("#searchError").fadeIn(150);
    }
  });
});
$(document).ready(function () {
  getData();

  setTimeout(readMore, 1000);

  $(".rightPartOnSearch").slick({
    arrows: true,
    prevArrow:
      "<span  class='priv_arrow'><i class='fa fa-chevron-left fa-xl' aria-hidden='true'></i></span>",
    nextArrow:
      "<span class='next_arrow'><i class='fa-solid fa-chevron-right fa-xl'></i></span>",
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,

    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],

  });
});

function getData() {
  onValue(ref(db, "/books"), async (snapshot) => {
    var booksJson = await snapshot.val();
    for (var index in booksJson) {
      var book = booksJson[index];

      var description = book.description.substring(0, 400);
      var textLeft= book.description.slice(400, book.description.length);
      var divMore = `
        <div class="box">
           <div class="row p-3">
             <div class="col-lg-5 col-6 p-3">
               <img src="${book.imageUrl}" width="100%" alt="" />
             </div>
             <div class="col-lg-7 p-2 read-more-container">
               <h2 class="mb-0">${book.title}</h2>
               <p class="slider-aname">${book.authorName}</p>
               <p id="read-more">
               ${description}
               <span class ="read-more-text">${textLeft}</span>
               </p>
               <span class="read-more-btn">Узнать больше...</span>
             </div>
           </div>
        </div>
      `;

      var divLess = `
        <div class="box">
           <div class="row p-3">
             <div class="col-lg-5 col-6 p-3">
               <img src="${book.imageUrl}" width="100%" alt="" />
             </div>
             <div class="col-lg-7 p-2 read-more-container">
               <h2 class="mb-0">${book.title}</h2>
               <p class="slider-aname">${book.authorName}</p>
               <p id="read-more">
               ${book.description}
            
               </p>
           
             </div>
           </div>
        </div>
      `;

       
     

   
      if(book.description.length<=400){
        $(".rightPartOnSearch").slick("slickAdd", divLess);
      }
      else{
        $(".rightPartOnSearch").slick("slickAdd", divMore);
      }
    }
  });
}

setTimeout(function () {
  const elements = document.querySelector("#url");

  elements.classList.add("d-none");
}, 2000);

function readMore() {
  const parentContainer = document.querySelector(".rightPartOnSearch");

  parentContainer.addEventListener("click", (event) => {
    const current = event.target;

    const isReadMoreBtn = current.className.includes("read-more-btn");

    if (!isReadMoreBtn) return;

    const currentText =
      event.target.parentNode.querySelector(".read-more-text");

    currentText.classList.toggle("read-more-text--show");

    current.textContent = current.textContent.includes("Узнать больше...")
      ? "Узнать больше..."
      : "Меньше...";
  });
}


