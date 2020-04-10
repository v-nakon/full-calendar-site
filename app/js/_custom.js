import { addOptionSelect } from "./helpers/help_create_elements.js";
import { getCategories } from "./helpers/requests.js";
import { getCities } from "./helpers/requests.js";
import { getSubjects } from "./helpers/requests.js";
import { getAllEvents } from "./helpers/requests.js";
import { searchEvents } from "./helpers/requests.js";
import { addCatToSearch } from "./helpers/category_search_block.js";
import { delActiveColor } from "./helpers/help_create_elements.js";

getCitiesData();
getCategoriesData();
getSubjectsData();
var calendar;
let btnSearch = document.getElementById("btn_search");
btnSearch.addEventListener("click", () =>
  searchEvent("event_name", "location", "subject_search")
);

var modalNotFound = document.querySelector(".container_modal_notfound");
var closeModalNotfound = document.querySelector(".close_modal_notfound");

closeModalNotfound.addEventListener("click", function () {
  modalNotFound.style.display = "none";
  document.location.href = "/";
});
var elSpinner = document.querySelector(".container_spinner");
function getAllEventsData() {
  getAllEvents()
    .then((response) => {
      // handle success
      let allEvent = response.data;
      // console.log(response.data.length);
      if (response.data.length === 0) {
        modalNotFound.style.display = "block";
      } else {
        createEvents(allEvent);
        elSpinner.classList.add("hide_spinner");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function getCitiesData() {
  getCities()
    .then((response) => {
      for (let item in response.data) {
        addOptionSelect(response.data[item], "location");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function getSubjectsData() {
  getSubjects()
    .then((response) => {
      for (let item in response.data) {
        addOptionSelect(response.data[item], "subject_search");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function getCategoriesData() {
  getCategories()
    .then((response) => {
      for (let item in response.data) {
        addCatToSearch(response.data[item], ".container_category");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// search function
export var nameEventSearch = "";
export var cityEventSearch = "";
export var categorySearch = "";
export var subjectSearch = "";
export function setCategorySearch(value) {
  categorySearch = value;
}
function checkSearchParam(title, city, date, category, subject) {
  let link = "https://eventafisha.com/api/v1/events?";
  if (title !== "") {
    link += "&title=" + title;
  }
  if (city !== "") {
    link += "&city_id=" + city;
  }
  if (date !== "") {
    link += "&date=" + date;
  }
  if (category !== "") {
    link += "&category_id=" + category;
  }
  if (subject !== "") {
    link += "&subject_id=" + subject;
  }
  return link;
}
export function searchRequest(title, city, category, subject) {
  // calendar.destroy();
  elSpinner.classList.remove("hide_spinner");
  let url = checkSearchParam(title, city, "", category, subject);
  searchEventsData(url);
}
function searchEventsData(urlSearch) {
  searchEvents(urlSearch)
    .then((response) => {
      let searchResponse = response.data;
      if (response.data.length === 0) {
        modalNotFound.style.display = "block";
      } else {
        createEvents(searchResponse);
        elSpinner.classList.add("hide_spinner");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
// для поиска по названию/городу
function searchEvent(titleEl, cityEl, subjectEl, searchCityID) {
  nameEventSearch = document.getElementById(titleEl).value;
  if (searchCityID === undefined) {
    cityEventSearch = document.getElementById(cityEl).value;
  } else {
    cityEventSearch = searchCityID;
  }
  subjectSearch = document.getElementById(subjectEl).value;
  searchRequest(
    nameEventSearch,
    cityEventSearch,
    categorySearch,
    subjectSearch
  );
}
function sliceText(text) {
  let sliced = text.replace(/<\/?[^>]+>/g, "");
  sliced = sliced.slice(0, 100);
  if (sliced.length < text.length) {
    sliced += "...";
  }
  return sliced;
}
function createEvents(response) {
  let arrEvents = [];
  for (let item in response) {
    // createEventCard(response[item]);
    let objEvent = {};
    objEvent.title = response[item].title;
    objEvent.start = response[item].start_date;
    objEvent.color = "purple";
    objEvent.url = "/event-page.html?id=" + response[item].id;
    objEvent.description =
      `<a href="/event-page.html?id=` +
      response[item].id +
      `">` +
      `<img src="https://eventafisha.com/storage/` +
      response[item].images +
      `" width="150">
		<h1>` +
      response[item].title +
      `</h1>
		<div class="desc_short">` +
      sliceText(response[item].desc) +
      `</div> </a>`;
    arrEvents.push(objEvent);
  }
  // console.log(arrEvents);
  createCalendar(arrEvents);
}

function createCalendar(arrEvents) {
  var calendarEl = document.getElementById("calendar");
  calendarEl.innerHTML = "";
  calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["dayGrid"],
    defaultView: "dayGridMonth",
    themeSystem: "solar",
    height: "parent",
    locale: "ru",
    //   defaultDate: '2019-11-12',

    eventRender: function (info) {
      // info.el.title = info.event.extendedProps.description
      info.el.onmouseover = function (el) {
        info.el.style.opacity = "0.5";
      };
      info.el.onmouseout = function (el) {
        info.el.style.opacity = "1";
      };
      var tooltip = new Tooltip(info.el, {
        title: info.event.extendedProps.description,
        placement: "top",
        trigger: "hover",
        container: "body",
        html: true,
      });
    },
    events: arrEvents,
    eventTextColor: "white",
  });
  calendar.render();
}

var widthMedia676 = window.matchMedia("(max-width: 676px)");
var widthMedia471 = window.matchMedia("(max-width: 471px)");
var searchIcon = document.getElementById("search_icon");
var containerSearch = document.querySelector(".container_search");
var containerLogo = document.querySelector(".container_logo");
var headerEl = document.querySelector("header");
searchIcon.addEventListener("click", function () {
  if (!containerSearch.classList.contains("show")) {
    console.log("open");
    if (widthMedia676.matches) {
      if (widthMedia471.matches) {
        headerEl.style.height = "80px";
      } else {
        headerEl.style.height = "60px";
      }
    }
    containerSearch.classList.add("show");
    containerLogo.classList.add("hide");
  } else {
    console.log("close");
    if (widthMedia676.matches) {
      headerEl.style.height = "40px";
    }
    containerSearch.classList.remove("show");
    containerLogo.classList.remove("hide");
  }
});

document.addEventListener("keydown", pushEnterBtn);
function pushEnterBtn(event) {
  if (event.which == 13 || event.keyCode == 13) {
    let getElTag = document.activeElement.tagName;
    if (getElTag === "INPUT" || getElTag === "SELECT") {
      searchEvent("event_name", "location", "subject_search");
    }
  }
}

// Open the dropdown window CATEGORY
// var catWindow = document.querySelector(".dropdown_content");
// var containerCatWindow = document.querySelector(".container_category");
// var btnShowCat = document.querySelector(".dropbtn");

// //   btnShowCat.addEventListener("click", function() {
// //     catWindow.style.display = "block";
// //   });
// btnShowCat.addEventListener("click", function () {
//   catWindow.classList.toggle("show");
// });
// // Close the dropdown if the user clicks outside of it CATEGORY
// window.onclick = function (event) {
//   if (!event.target.matches(".dropbtn")) {
//     var dropdown = document.querySelector(".dropdown_content");
//     if (dropdown.classList.contains("show")) {
//       dropdown.classList.remove("show");
//     }
//   }
// };

let urlStringParams = window.location.search;
let urlParams = new URLSearchParams(urlStringParams);
let categoryIdParam = urlParams.get("cat_id");
let cityIdParam = urlParams.get("city_id");
if (categoryIdParam !== null) {
  categorySearch = categoryIdParam;
  searchEvent("event_name", "location", "subject_search");
} else if (cityIdParam !== null) {
  searchEvent("event_name", "location", "subject_search", cityIdParam);
} else {
  getAllEventsData();
}
