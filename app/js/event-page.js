var searchIcon = document.getElementById("search_icon");
var containerSearch = document.querySelector('.container_search');
var containerLogo = document.querySelector('.container_logo');
searchIcon.addEventListener("click", function() {
    if(!containerSearch.classList.contains("show")) {
        containerSearch.classList.add("show");
        containerLogo.classList.add("hide");
    } else {
        containerSearch.classList.remove("show");
        containerLogo.classList.remove("hide");
    }
  });