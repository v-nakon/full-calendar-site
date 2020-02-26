getAllEvents();
getCities("location");
let btnSearch = document.getElementById("btn_search");
btnSearch.addEventListener('click',() => searchTitleCity("event_name", "location"));

function getAllEvents() {
	axios.get('https://eventafisha.com/api/v1/events')
	.then(function (response) {
	  // handle success
	  let allEvent = response.data;
	  console.log(response.data);
	  createEvents(allEvent);
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
function searchRequest(title, city) {
	let url = checkSearchParam(title, city, "", "")
	console.log(url)
	axios.get(url, {
		params: {
			title: title,
			city_id: city
		  }
	 })
	 .then(function (response) {
		console.log(response);
		let searchResponse = response.data.data;
		createEvents(searchResponse);
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
	let nameEvent = document.getElementById(titleEl).value;
	let cityEvent = document.getElementById(cityEl).value;
	searchRequest(nameEvent, cityEvent);
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
	var calendar = new FullCalendar.Calendar(calendarEl, {
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