//API variable
var weatherApiLink = 'https://api.openweathermap.org';

//API Key from Openweathermap (had a new one generated as I am starting fresh)
const apiKey = "e64f1bbcc51498c175315a53f4e40804";

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

//Variables for current date
var date = new Date();
var day = String(date.getDate()).padStart(2, '0');
var month = String(date.getMonth() + 1).padStart(2, '0');
var year = date.getFullYear();
var date = month + '/' + day + '/' + year;

//Variable for extended forecast
var extendedForecast = document.querySelector("extendedForecast");


//SEARCH BUTTON FUNCTIONALITY

//Function to add event listener to search button
$('searchButton').on('click', function(event) {
  event.preventDefault();
  if (fieldInput.val() === "") {
    alert("Please enter a city name");
    return;
  }
  //console log to confirm button is working
  console.log("button was clicked")
  pullWeather(fieldInput.val());
})

//CURRENT CITY SEARCH DATA FUNCTIONS

//Sets up URL to search OpenWeather API
function setApiUrl(cityInput) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&APPID=${apiKey}`;
}

//UV index color based on the EPA color scale found at http://www.epa.gov/sunsafety/uv-index-scale-0
function colorUVIndex(uvColor) {
  if (uvColor < 3) {
    return 'green';
  } else if (uvColor >= 3 && uvColor <6) {
    return 'yellow';
  } else if (uvColor >= 6 && uvColor < 8) {
    return 'orange';
  } else if (uvColor >= 8 && uvColor < 11) {
    return 'red';
  } else return 'purple';
}

function findCurrentWeather(queryURL) {
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(currentWeatherInfo) {
           let data = {
            currentCity: currentWeatherInfo.name,
            temperature: currentWeatherInfo.main.temp,
            humidity: currentWeatherInfo.main.humidity,
            wind: currentWeatherInfo.wind.speed,
            uv: currentWeatherInfo.coord,
            weatherIcon: currentWeatherInfo.weather[0].icon
  }
  let searchUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${data.uv.lat}&lon=${data.uv.lon}&APPID=${apiKey}&units=imperial`
      $.ajax({
      url: searchUrl,
      method: 'GET'
 })
});
}

//PREVIOUS SEARCH FUNCTIONS

//function for search list of previously searched cities
function showPreviousSearch() {
    searchList.innerHTML = '';

//starts at the end of the previous search and counts down to show the most recent item at the top
for (var i = previousSearch.length - 1; i >= 0; i--) {
    var prevSearchButton = document.createElement('button');
    prevSearchButton.setAttribute('type', 'button');
    prevSearchButton.classList.add('previous-button', 'button-previous');

    //searchData allows the user to see the data from a previous search when clicking on the previous city name in the previous search list
    prevSearchButton.setAttribute('searchData', previousSearch[i]);
    prevSearchButton.textContent = previousSearch[i];
    searchList.append(prevSearchButton);
  }
}

//update the previous search history in local storage then updates the previous history portion of the page
function addPreviousSearch(search) {
  //if there is no search term return the function
  if (previousSearch.indexOf(search) !== -1)
  {return;}
  previousSearch.push(search);

  localStorage.setItem('previous-search', JSON.stringify(previousSearch)); 
  showPreviousSearch();
}

//function to pull previous search history from local storage
function pullPreviousSearch() {
  var savedData = localStorage.getItem('previous-search');
  if (savedData) {
    previousSearch = JSON.parse(savedData);
  }}
  pullPreviousSearch()
