var mas = JSON.parse(localStorage.getItem("categories"));

for (var i = 0; i < mas.length; i++) {
  var div = `

   
    <div class="col-md-4 mb-4" id="home-category">
    <div class="card shadow py-1 py-lg-3">
      <div class="card-body">
      <a href="assets/pages/catalog.html">
        <h4 class="card-title m-0 text-center">
          ${mas[i]}
        </h4>
        </a>
      </div>
    </div>
  </div>
 
      `;
  $("#home-catalog-list").append(div);
}
