getAllEvents();
getCities("location");
getCategories();
var calendar;
let btnSearch = document.getElementById("btn_search");
btnSearch.addEventListener('click',() => searchTitleCity("event_name", "location"));

var modalNotFound = document.querySelector(".container_modal_notfound");
var closeModalNotfound = document.querySelector(".close_modal_notfound");

closeModalNotfound.addEventListener("click", function() {
	modalNotFound.style.display = "none";
	document.location.href = "/";
  });
var elSpinner = document.querySelector(".container_spinner");
function getAllEvents() {
	axios.get('https://eventafisha.com/api/v1/events')
	.then(function (response) {
	  // handle success
	  let allEvent = response.data;
	  console.log(response.data.length);
	if(response.data.length === 0) {
		modalNotFound.style.display = "block";
	} else {
		createEvents(allEvent);
		elSpinner.classList.add("hide_spinner");
	}
	  
	})
	.catch(function (error) {
	  // handle error
	  console.log(error);
	})
	.then(function () {
	  // always executed
	});
};
function getCities(elementSelect) {
    axios.get('https://eventafisha.com/api/v1/cities')
    .then(function (response) {
      for(let item in response.data) {
        addOptionSelect(response.data[item], elementSelect);
      };
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};
function getCategories() {
    axios.get('https://eventafisha.com/api/v1/categories')
    .then(function (response) {
      for(let item in response.data) {
		addCatToSearch(response.data[item], ".container_category");
      };
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};
// categories for search
function addCatToSearch(item, elementTo) {
	// console.log(item);
	let catElements = document.querySelector(elementTo);
	let newCat = document.createElement("div");
	newCat.classList.add("item_category");
    newCat.setAttribute('category_id', item.id);
    newCat.innerHTML = item.title;
	catElements.appendChild(newCat);
	addEventToElement(newCat, item.id);
};
function addEventToElement(element, catId) {
	element.addEventListener("click", function(){
		delActiveColor();
		console.log("CAT - ", catId);
		element.classList.add("color_active_cat");
		document.querySelector(".arrow_down").classList.add("color_active_cat");
		categorySearch = catId;
		searchRequest(nameEventSearch, cityEventSearch, categorySearch);
	});
};
function delActiveColor() {
	let arrActiveColor = document.querySelectorAll(".color_active_cat");
	console.log("arr", arrActiveColor)
	arrActiveColor.forEach(function(el){
		el.classList.remove("color_active_cat");
		// console.log("delete class")
	})
};
// end categories for search
// search function
var nameEventSearch = '';
var cityEventSearch = '';
var categorySearch = '';
var arrElCat = [
	{
		el: document.querySelector("#search_cat_all"),
		id: ""
	}, 
	{
		el: document.querySelector("#search_cat_main1"),
		id: 4
	}, 
	{
		el: document.querySelector("#search_cat_main2"),
		id: 5
	},
];
function addListenerToArrEl(arr) {
	for(let i in arr) {
		arr[i].el.addEventListener("click", function(){
			delActiveColor();
			arr[i].el.classList.add("color_active_cat");
			categorySearch = arr[i].id;
			searchRequest(nameEventSearch, cityEventSearch, categorySearch);
		});
	}
}
addListenerToArrEl(arrElCat);
function checkSearchParam(title, city, date, category) {
	let link = "https://eventafisha.com/api/v1/events?";
	if(title !== "") {
		link += "&title=" + title;
	}
	if(city !== "") {
		link += "&city_id=" + city;
	}
	if(date !== "") {
		link += "&date=" + date;
	}
	if(category !== "") {
		link += "&category_id=" + category;
	}
	return link;
};
function searchRequest(title, city, category) {
	calendar.destroy();
	elSpinner.classList.remove("hide_spinner");
	let url = checkSearchParam(title, city, "", category)
	console.log(url);
	axios.get(url)
	 .then(function (response) {
		console.log(response);
		let searchResponse = response.data;
		if(response.data.length === 0) {
			modalNotFound.style.display = "block";
		} else {
			createEvents(searchResponse);
			elSpinner.classList.add("hide_spinner");
		}
		
	 })
	 .catch(function (error) {
		console.log(error);
	 });
	};
function addOptionSelect(item, elementSelect) {
    let selectCategory = document.getElementById(elementSelect);
    let option = document.createElement("option");
    option.value = item.id;
    option.innerHTML = item.title;
    selectCategory.add(option);
  };
// для поиска по названию/городу
function searchTitleCity(titleEl, cityEl) {
	nameEventSearch = document.getElementById(titleEl).value;
	cityEventSearch = document.getElementById(cityEl).value;
	searchRequest(nameEventSearch, cityEventSearch, categorySearch);
};
function sliceText(text) {
	let sliced = text.replace(/<\/?[^>]+>/g,'');
	sliced = sliced.slice(0,100);
	if (sliced.length < text.length) {
		sliced += '...';
	}
	return sliced;
};
function createEvents(response) {
	let arrEvents = [];
	for(let item in response) {
		// createEventCard(response[item]);
		let objEvent = {};
		objEvent.title = response[item].title;
		objEvent.start = response[item].start_date;
		objEvent.color = 'purple';
		objEvent.url = '/event-page.html?id=' + response[item].id;
		objEvent.description = `<img src="https://eventafisha.com/storage/` + response[item].images +`" width="150">
		<h1>` + response[item].title + `</h1>
		<div class="desc_short">` + sliceText(response[item].desc) + `</div>`;
		arrEvents.push(objEvent);
	};
	console.log(arrEvents);
	createCalendar(arrEvents);
};


function createCalendar(arrEvents) {
	var calendarEl = document.getElementById('calendar');
	calendarEl.innerHTML = '';
	calendar = new FullCalendar.Calendar(calendarEl, {
	  plugins: [ 'dayGrid' ],
	  defaultView: 'dayGridMonth',
	  themeSystem: 'solar',
	  height: 'parent',
	  locale: 'ru',
	//   defaultDate: '2019-11-12',
  
	  eventRender: function(info) {
		// info.el.title = info.event.extendedProps.description
		info.el.onmouseover = function(el) {
		  info.el.style.opacity = '0.5'
		}
		info.el.onmouseout = function(el) {
		  info.el.style.opacity = '1'
		}
		var tooltip = new Tooltip(info.el, {
		  title: info.event.extendedProps.description,
		  placement: 'top',
		  trigger: 'hover',
		  container: 'body',
		  html: true,
		});
	  },
	  events: arrEvents,
	  eventTextColor: 'white'
	});
  	calendar.render();
	};

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


 // Open the dropdown window CATEGORY
 var catWindow = document.querySelector(".dropdown_content");
 var containerCatWindow = document.querySelector(".container_category");
 var btnShowCat = document.querySelector(".dropbtn");


//   btnShowCat.addEventListener("click", function() {
//     catWindow.style.display = "block";
//   });
btnShowCat.addEventListener("click", function() {
   catWindow.classList.toggle("show");
   });
 // Close the dropdown if the user clicks outside of it CATEGORY
 window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
	  var dropdown = document.querySelector(".dropdown_content");
		if (dropdown.classList.contains('show')) {
			dropdown.classList.remove('show');
		}
	}
  };
//  window.onclick = function(event) {
//    if (!event.target.matches('.dropbtn') && !event.target.matches('.container_category') && !event.target.matches('.item_category')) {
// 	   if (catWindow.classList.contains('show')) {
// 		   catWindow.classList.remove('show');
// 	   }
//    }
//  };




	// document.addEventListener('DOMContentLoaded', function() {
	// 	var calendarEl = document.getElementById('calendar');
	  
	// 	var calendar = new FullCalendar.Calendar(calendarEl, {
	// 	  plugins: [ 'dayGrid' ],
	// 	  defaultView: 'dayGridMonth',
	// 	  themeSystem: 'solar',
	// 	  height: 'parent',
	// 	//   defaultDate: '2019-11-12',
	  
	// 	  eventRender: function(info) {
	// 		info.el.title = info.event.title
	// 		info.el.onmouseover = function(el) {
	// 		  info.el.style.opacity = '0.5'
	// 		}
	// 		info.el.onmouseout = function(el) {
	// 		  info.el.style.opacity = '1'
	// 		}
	// 		var tooltip = new Tooltip(info.el, {
	// 		  title: info.event.extendedProps.description,
	// 		  placement: 'top',
	// 		  trigger: 'hover',
	// 		  container: 'body'
	// 		});
	// 	  },
	  
	// 	  events: 
	// 	   [
	// 		{
	// 		  title: 'All Day Event',
	// 		  description: 'description for All Day Event',
	// 		  start: '2020-01-01',
	// 		},
	// 		{
	// 		  title: 'Lunch',
	// 		  description: 'description for Lunch',
	// 		  start: '2020-01-12T12:00:00'
	// 		},
	// 		{
	// 		  title: 'Meeting',
	// 		  description: 'description for Meeting',
	// 		  start: '2020-01-12T14:30:00'
	// 		},
	// 		{
	// 		  title: 'Birthday Party',
	// 		  description: 'description for Birthday Party',
	// 		  start: '2020-01-13T07:00:00',
	// 		  color: 'green'
	// 		},
	// 		{
	// 		  title: 'Click for Google',
	// 		  description: 'description for Click for Google',
	// 		  url: 'http://google.com/',
	// 		  start: '2020-01-28',
	// 		  color: 'purple'
	// 		}
	// 	  ]
	// 	});
	  
	// 	calendar.render();
	//   });