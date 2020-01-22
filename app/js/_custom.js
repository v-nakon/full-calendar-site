document.addEventListener('DOMContentLoaded', function() {
	var calendarEl = document.getElementById('calendar');
  
	var calendar = new FullCalendar.Calendar(calendarEl, {
	  plugins: [ 'dayGrid' ],
	  defaultView: 'dayGridMonth',
	  themeSystem: 'solar',
	  height: 'parent',
	//   defaultDate: '2019-11-12',
  
	  eventRender: function(info) {
		info.el.title = info.event.title
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
		  container: 'body'
		});
	  },
  
	  events: [
		{
		  title: 'All Day Event',
		  description: 'description for All Day Event',
		  start: '2020-01-01',
		},
		// {
		//   title: 'Long Event',
		//   description: 'description for Long Event',
		//   start: '2020-01-07',
		//   end: '2020-01-10'
		// },
		// {
		//   groupId: '999',
		//   title: 'Repeating Event',
		//   description: 'description for Repeating Event',
		//   start: '2020-01-09T16:00:00'
		// },
		// {
		//   groupId: '999',
		//   title: 'Repeating Event',
		//   description: 'description for Repeating Event',
		//   start: '2020-01-16T16:00:00'
		// },
		// {
		//   title: 'Conference',
		//   description: 'description for Conference',
		//   start: '2020-01-11',
		//   end: '2020-01-13'
		// },
		// {
		//   title: 'Meeting',
		//   description: 'description for Meeting',
		//   start: '2020-01-12T10:30:00',
		//   end: '2020-01-12T12:30:00'
		// },
		{
		  title: 'Lunch',
		  description: 'description for Lunch',
		  start: '2020-01-12T12:00:00'
		},
		{
		  title: 'Meeting',
		  description: 'description for Meeting',
		  start: '2020-01-12T14:30:00'
		},
		{
		  title: 'Birthday Party',
		  description: 'description for Birthday Party',
		  start: '2020-01-13T07:00:00',
		  color: 'green'
		},
		{
		  title: 'Click for Google',
		  description: 'description for Click for Google',
		  url: 'http://google.com/',
		  start: '2020-01-28',
		  color: 'purple'
		}
	  ]
	});
  
	calendar.render();
  });

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