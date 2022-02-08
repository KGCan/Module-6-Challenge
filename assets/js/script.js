//API variable & API Key from Openweathermap (had new one generated)
var weatherApiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "e64f1bbcc51498c175315a53f4e40804";

//Variables to store searched city information
var city = "";

// Variables for search data
var searchInput = $("#searchInput");
var searchButton = $("#searchButton");

// Variable to clear search history
var clearHistory = $("#clearHistory");

// Serached city variables
var searchInput = $("#searchInput");
var currentCity = $("#currentCity");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWindSpeed=$("#wind");
var currentUvindex= $("#uv");
var searchedCity=[];

// Search storage for city entry
function find(input){
  for (var i=0; i<searchedCity.length; i++){
    if(input.toUpperCase()===searchedCity[i]){
      return -1;
    }
  }
  return 1;
}

// Function to display current and extended forecast to the user after pulling input from the search box
function showWeather(event){
  event.preventDefault();
  if(searchInput.val().trim()!==""){
    city=searchInput.val().trim();
    findCurrentWeather(city);
  }
}

// Create AJAX Call
function findCurrentWeather(city) {
  // Build URL to pull data from API
  var searchURL = weatherApiLink + city + "&APPID=" + apiKey;
  $.ajax({
    url: searchURL,
    method: 'GET'
  }).then(function(weatherData) {
        // console log the current weather
        console.log(weatherData);

        // weather icon from api
        var weatherIcon = response.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/"+weatherIcon +"@2x.png";
        // pull new date
        var date = new Date(weatherData.dt*1000).toLocaleDateString();
        
        // city name response and weather icon
        $(currentCity).html(weatherData.name+"("+date+")" + "<img src=" +iconUrl+">");

        // Parse response to display the current temperature and convert that temp to fahreneit
        var tempFahrenheit = (weatherData.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempFahrenheit).toFixed(2)+"&#8457"); 



});
}

//Variables for current date

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


