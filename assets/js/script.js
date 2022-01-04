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

    //searchData allows the user to see the 
    prevSearchButton.setAttribute('searchData', previousSearch[i]);
    prevSearchButton.textContent = previousSearch[i];
    searchList.append(prevSearchButton);
  }
}

//following at line 35 on other page
