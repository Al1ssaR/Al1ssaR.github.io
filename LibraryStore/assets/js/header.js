window.addEventListener("scroll", function () {
  let div1 = document.querySelector(".sticky-top");
  if (window.scrollY > 0) {
    div1.className = "header-menu sticky-top";
  } else if (window.scrollY == 0) {
    div1.className = "pt-3 sticky-top";
  }
});
