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

$(".search-title").on("click", async function (e) {
  const elements = document.querySelector("#url");
  elements.classList.remove("d-none");
  setTimeout(function () {
    getData();

}, 2000);



  setTimeout(function () {
      elements.classList.add("d-none");

  }, 2000);
 
});

$(".categorize").on("click", async function (e) {
  const elements = document.querySelectorAll(".categorize");

  elements.forEach((element) => {
    element.classList.remove("header-actived");
  });

  $(this).addClass("border-0 bg-transparent categorize header-actived");

  onValue(ref(db, "/books"), async (snapshot) => {
    $("#first").slick("removeSlide", null, null, true);

    var booksJson = await snapshot.val();

    for (var index = 1; index < booksJson.length; index++) {
      var book = booksJson[index];
      if (book.title.length > 15 || book.authorName.length > 15) {
        var newTitle = book.title.substring(0, 12) + "...";
        var newAuthor = book.authorName.substring(0, 12) + "...";
        var bookID = index;
      }
      var div = `
      <div>
        <div class="card p-4 text-center rounded-0">
          <div class="img-wrapper">
            <img
              src="${book.imageUrl}"
              class="d-block w-80"
              alt="..."
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">${newTitle}</h5>
            <p class="card-text">${newAuthor}</p>
            <a href="../pages/aboutBook.html" id="${bookID}" class="btn bg-orange">Read More</a>
          </div>
        </div>
      </div>
      `;

      if (
        book.hasOwnProperty("type") &&
        book.type.includes(this.innerHTML.replace(/\s/g, ""))
      ) {
        $("#first").slick("slickAdd", div);
      }
      $(".bg-orange").on("click", async function (e) {
        let bookId = $(this).attr("id");
        var selectedBookJson = {};
        await onValue(ref(db, `/books/${bookId}`), async (snapshot) => {
          selectedBookJson = await snapshot.val();
          localStorage.setItem(
            "selectedBook",
            JSON.stringify(selectedBookJson)
          );
          localStorage.setItem("selectedId", JSON.stringify(bookId));
        });
      });
    }
  });
});
$(document).ready(function () {
  getData();
  const myTimeout = setTimeout(myStopFunction, 3000);

  function myStopFunction() {
    $(".bg-orange").on("click", async function (e) {
      let bookId = $(this).attr("id");
      localStorage.setItem("selectedId", JSON.stringify(bookId));
      var selectedBookJson = {};
      await onValue(ref(db, `/books/${bookId}`), async (snapshot) => {
        selectedBookJson = await snapshot.val();
        localStorage.setItem("selectedBook", JSON.stringify(selectedBookJson));
      });
    });
  }

  setTimeout(function () {
    const elements = document.querySelector("#url");

      elements.classList.add("d-none");

  }, 2000);





  $(".responsive").slick({
    dots: true,
    arrows: true,
    prevArrow:
      "<span  class='priv_arrow ps-2'><i class='fa fa-chevron-left fa-xl' aria-hidden='true'></i></span>",
    nextArrow:
      "<span class='next_arrow pe-2'><i class='fa-solid fa-chevron-right fa-xl'></i></span>",
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          arrows: false
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false
        },
      },
    ],
  });
});

function getData() {
  onValue(ref(db, "/books"), async (snapshot) => {
    var booksJson = await snapshot.val();
    let bookID = 1;
    for (var index in booksJson) {
      var book = booksJson[index];
      if (book.title.length > 15 || book.authorName.length > 15) {
        var newTitle = book.title.substring(0, 12) + "...";
        var newAuthor = book.authorName.substring(0, 12) + "...";
      }
      var div = `
    <div>
      <div class="card p-2 p-xl-4 text-center rounded-0">
        <div class="img-wrapper">
          <img
            src="${book.imageUrl}"
            class="d-block w-80"
            alt="..."
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">${newTitle}</h5>
          <p class="card-text">${newAuthor}</p>
          <a href="../pages/aboutBook.html" id="${bookID}" class="btn bg-orange">Подробнее</a>
        </div>
      </div>
    </div>
    `;

   

      $("#first").slick("slickAdd", div);

      if (
        book.hasOwnProperty("averageRating") &&
        parseInt(book.averageRating) > 3
      ) {
        $("#bestSeller").slick("slickAdd", div);
      }
      const publishedDate = Date.parse(book.publishedDate);
      const dateForCompare = new Date("2022");
      if (
        book.hasOwnProperty("publishedDate") &&
        publishedDate > dateForCompare
      ) {
        $("#newReleases").slick("slickAdd", div);
      }
      bookID++;
    }
  });


 
}

var category = document.querySelectorAll(".categorize");
var mas = [];

for (var i = 0; i < category.length; i++) {
  mas.push(category[i].innerText);
}

localStorage.setItem("categories", JSON.stringify(mas));
