import { nameEventSearch } from "../_custom.js";
import { cityEventSearch } from "../_custom.js";
import { categorySearch } from "../_custom.js";
import { subjectSearch } from "../_custom.js";
import { setCategorySearch } from "../_custom.js";
import { searchRequest } from "../_custom.js";
import { delActiveColor } from "./help_create_elements.js";
// categories for search
export function addCatToSearch(item, elementTo) {
  // console.log(item);
  let catElements = document.querySelector(elementTo);
  let newCat = document.createElement("div");
  newCat.classList.add("item_category");
  newCat.setAttribute("category_id", item.id);
  newCat.innerHTML = item.title;
  catElements.appendChild(newCat);
  addEventToElement(newCat, item.id);
}
function addEventToElement(element, catId) {
  element.addEventListener("click", function () {
    delActiveColor();
    // console.log("CAT - ", catId);
    element.classList.add("color_active_cat");
    document.querySelector(".arrow_down").classList.add("color_active_cat");
    // categorySearch = catId;
    setCategorySearch(catId);
    searchRequest(
      nameEventSearch,
      cityEventSearch,
      categorySearch,
      subjectSearch
    );
  });
}
// arr for static category btn
var arrElCat = [
  {
    el: document.querySelector("#search_cat_all"),
    id: "",
  },
  {
    el: document.querySelector("#search_cat_main1"),
    id: 24,
  },
  {
    el: document.querySelector("#search_cat_main2"),
    id: 1,
  },
  {
    el: document.querySelector("#search_cat_main3"),
    id: 2,
  },
];
function addListenerToArrEl(arr) {
  for (let i in arr) {
    arr[i].el.addEventListener("click", function () {
      delActiveColor();
      arr[i].el.classList.add("color_active_cat");
      // categorySearch = arr[i].id;
      setCategorySearch(arr[i].id);
      searchRequest(
        nameEventSearch,
        cityEventSearch,
        categorySearch,
        subjectSearch
      );
    });
  }
}
addListenerToArrEl(arrElCat);
// end categories for search

// Open the dropdown window CATEGORY
var catWindow = document.querySelector(".dropdown_content");
var btnShowCat = document.querySelector(".dropbtn");

btnShowCat.addEventListener("click", function () {
  catWindow.classList.toggle("show");
});
// Close the dropdown if the user clicks outside of it CATEGORY
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdown = document.querySelector(".dropdown_content");
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  }
};
