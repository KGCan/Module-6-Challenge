//API variable
var weatherApiLink = 'https://api.openweathermap.org';

//API Key from Openweathermap (had a new one generated as I am starting fresh)
var apiKey = "e64f1bbcc51498c175315a53f4e40804";

//Variables for list of previously searched cities
var previousSearch = [];
var searchList = document.querySelector(".searchList");

//Variable for search button
var searchButton = document.querySelector(".searchButton");

//Variable for search field input
var fieldInput = document.querySelector(".fieldInput");

//Variables for current city data
var currentCity = document.querySelector(".currentCity");
var currentDate = document.querySelector(".currentDate");
var weatherIcon = document.querySelector(".weatherIcon");
var temperature = document.querySelector(".temperature");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var uv = document.querySelector(".uv");

//Variable for extended forecast
var extendedForecast = document.querySelector("extendedForecast");

//timezone plugins for day.js
dayjs.extend(window.dayjs_plugin_timezone);

//function for search list of previously searched cities
function showPreviousSearch() {
    searchList.innerHTML = '';

//starts at the end of the previous search and counts down to show the most recent item at the top
for (var i = previousSearch.length - 1; i >= 0; i--) {
    var prevSearchButton = document.createElement('button');
    prevSearchButton.setAttribute('type', 'button');
    prevSearchButton.classList.add('previous-button', 'button-previous');

    //searchData allows the user to see the data from the data from a search
    prevSearchButton.setAttribute('searchData', previousSearch[i]);
    prevSearchButton.textContent = previousSearch[i];
    searchList.append(prevSearchButton);
  }
}

//update the previous search history in local storage then updates the previous history portion of th epage
function addPreviousSearch(search) {
  //if there is no search term return the function
  if (previousSearch.indexOf(search) !== -1)
  {return;}
  previousSearch.push(search);

  localStorage.setItem('previous-search', JSON.stringify(previousSearch)); 
  showPreviousSearch();
}



