let urlStringParams = window.location.search;
let urlParams = new URLSearchParams(urlStringParams);
let idEvent = urlParams.get('id')
console.log(idEvent);


axios.get('https://eventafisha.com/api/v1/events/' + idEvent)
  .then(function (response) {
    document.title = response.data.title;
	console.log(response.data);
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
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

 function setTitle(obj) {
     let title = obj.title;
     let titleElement = document.querySelector(".event_title");
     let titleDesc = document.querySelector(".event_content_title");
     titleElement.innerHTML = title;
     titleDesc.innerHTML = title;
 };
 function setDate(obj) {
     let startDate = new Date(obj.start_date);
     let endDate = new Date(obj.end_date);
     let dateElement = document.querySelector(".event_date");
     dateElement.innerHTML = startDate.toLocaleDateString() + " - " + endDate.toLocaleDateString();
 };
 function setLocation(obj) {
     let location = obj.address;
     let locationElement = document.querySelector(".event_location_address");
     locationElement.innerHTML = location;
 };
 function setPrice(obj) {
     let price = obj.cost;
     let priceElement = document.querySelector("#price");
     priceElement.innerHTML = price;
 };
 function setBuyLink(obj) {
     let buyLink = obj.buy_link;
     let buyBtn = document.querySelector(".btn_buy");
     buyBtn.addEventListener( "click" , () => window.open(buyLink));
 };
 function setDescription(obj) {
     let description = obj.desc;
     let descriptionElement = document.querySelector(".content");
     descriptionElement.innerHTML = description;
 };
 function setImg(obj) {
     let imgPath = obj.images;
    //  console.log("https://eventafisha.com/storage/" + imgPath);
     let imgElement = document.querySelector(".event_img");
     imgElement.src = "https://eventafisha.com/storage/" + imgPath;
 };
 function setCategory(obj) {
    let category = obj.category.title;
    let categoryElement = document.querySelector(".event_cat");
    categoryElement.innerHTML = category;
};
function setTags(obj) {
    let tags = "";
    let tagsElement = document.querySelector(".group_tags");
	for(let i=0; i < obj.tags.length; i++) {
		// console.log("tags", arr[i].title);
		tags += '<div class="event_tag">' + obj.tags[i].title + '</div>';
    };
    tagsElement.innerHTML = tags;
};
function setPromo(obj) {
    // console.log(obj.promo)
    let promo = obj.promo;
    let promoElement = document.querySelector(".event_promo_name");
    promoElement.innerHTML = promo;
}

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