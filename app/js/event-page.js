import { getEvent } from "./helpers/requests.js";
import { orderNumber } from "./helpers/requests.js";

let urlStringParams = window.location.search;
let urlParams = new URLSearchParams(urlStringParams);
let idEvent = urlParams.get("id");

getEventData(idEvent);
function getEventData(idEvent) {
  getEvent(idEvent)
    .then((response) => {
      checkMetaData(response.data);
      document.title = response.data.title;
      setTitle(response.data);
      setDate(response.data);
      setLocation(response.data);
      setPrice(response.data);
      setBuyLink(response.data);
      setDescription(response.data);
      setImg(response.data);
      setCategory(response.data);
      setTags(response.data);
      setPromo(response.data);
    })
    .catch((error) => {
      console.log(error);
      document.querySelector(".container_event").classList.add("hide_element");
      document
        .querySelector(".container_notfound")
        .classList.remove("hide_element");
    });
}
// axios
//   .get("https://eventafisha.com/api/v1/events/" + idEvent)
//   .then(function (response) {
//     checkMetaData(response.data);
//     document.title = response.data.title;
//     setTitle(response.data);
//     setDate(response.data);
//     setLocation(response.data);
//     setPrice(response.data);
//     setBuyLink(response.data);
//     setDescription(response.data);
//     setImg(response.data);
//     setCategory(response.data);
//     setTags(response.data);
//     setPromo(response.data);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });
function checkMetaData(response) {
  if (response.seo.meta_title !== null) {
    setMetaData("title", response.seo.meta_title);
  } else {
    setMetaData("title", response.title);
  }
  if (response.seo.meta_desc !== null) {
    setMetaData("description", response.seo.meta_desc);
  }
  if (response.seo.meta_keywords !== null) {
    setMetaData("keywords", response.seo.meta_keywords);
  }
}
function setMetaData(name, data) {
  let meta = document.createElement("meta");
  meta.name = name;
  meta.content = data;
  document.querySelector("head").appendChild(meta);
}
function setTitle(obj) {
  let title = obj.title;
  let titleElement = document.querySelector(".event_title");
  let titleDesc = document.querySelector(".event_content_title");
  titleElement.innerHTML = title;
  titleDesc.innerHTML = title;
}
function setDate(obj) {
  let startDate = new Date(obj.start_date);
  let endDate = new Date(obj.end_date);
  let dateElement = document.querySelector(".event_date");
  if (startDate.toLocaleDateString() === endDate.toLocaleDateString()) {
    dateElement.innerHTML = startDate.toLocaleDateString();
  } else {
    dateElement.innerHTML =
      startDate.toLocaleDateString() + " - " + endDate.toLocaleDateString();
  }
}
function setLocation(obj) {
  let location = obj.address;
  let city = "";
  if (obj.city !== null) {
    city = obj.city.title + ", ";
  }
  let locationElement = document.querySelector(".event_location_address");
  locationElement.innerHTML = city + location;
}
function setPrice(obj) {
  let price = obj.cost;
  if (price == 0) {
    document
      .querySelector(".container_event_price")
      .classList.add("hide_element");
    renameBtn();
  } else {
    let priceElement = document.querySelector("#price");
    priceElement.innerHTML = price;
  }
}
function setBuyLink(obj) {
  let buyLink = obj.buy_link;
  let buyBtn = document.querySelector(".btn_buy");
  if (buyLink === null) {
    buyBtn.classList.add("hide_element");
  } else {
    buyBtn.addEventListener("click", function () {
      setOrderNumber(idEvent);
    });
  }
}
function setDescription(obj) {
  let description = obj.desc;
  let description_first = obj.description_first;
  let description_second = obj.description_second;
  let descriptionElement = document.querySelector(".content");
  descriptionElement.innerHTML = description;
  if (description_first !== null || description_first !== null) {
    let descriptionElement1 = document.querySelector(".description_first");
    descriptionElement1.innerHTML = description_first;
    let descriptionElement2 = document.querySelector(".description_second");
    descriptionElement2.innerHTML = description_second;
  }
}
function setImg(obj) {
  let imgPath = obj.images;
  let imgElement = document.querySelector(".event_img");
  imgElement.src = "https://eventafisha.com/storage/" + imgPath;
}
function setCategory(obj) {
  let category = obj.category.title;
  let categoryElement = document.querySelector(".event_cat");
  categoryElement.innerHTML = category;
}
function setTags(obj) {
  let tags = "";
  let tagsElement = document.querySelector(".group_tags");
  for (let i = 0; i < obj.tags.length; i++) {
    // console.log("tags", arr[i].title);
    tags += '<div class="event_tag">' + obj.tags[i].title + "</div>";
  }
  tagsElement.innerHTML = tags;
}
function setPromo(obj) {
  // console.log(obj.promo)
  let promo = obj.promocode;
  if (promo === null) {
    document.querySelector(".event_promo").classList.add("hide_element");
  } else {
    let promoElement = document.querySelector(".event_promo_name");
    promoElement.innerHTML = promo;
  }
}
function renameBtn() {
  let btn = document.querySelector(".btn_buy");
  btn.innerHTML = "РЕГИСТРАЦИЯ";
}
function setOrderNumber(idEvent) {
  orderNumber(idEvent)
    .then((response) => {
      // console.log("Num order", response)
      goRedirectPage(idEvent);
    })
    .catch((error) => {
      console.log(error);
    });
}
function goRedirectPage(id) {
  let redirectLink = "/redirect-page.html?id=" + id;
  document.location.href = redirectLink;
}
// var searchIcon = document.getElementById("search_icon");
// var containerSearch = document.querySelector(".container_search");
// var containerLogo = document.querySelector(".container_logo");
// searchIcon.addEventListener("click", function () {
//   if (!containerSearch.classList.contains("show")) {
//     containerSearch.classList.add("show");
//     containerLogo.classList.add("hide");
//   } else {
//     containerSearch.classList.remove("show");
//     containerLogo.classList.remove("hide");
//   }
// });
