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

// get current date value
var today = new Date();
let day = String(today.getDate()).padStart(2, '0');
let month = String(today.getMonth() + 1).padStart(2, '0');
let year = today.getYear();
var today = month + '/' + day + '/' + year;

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

function setUVIndexColor(uvi) {
  if (uvi < 3) {
      return 'green';
  } else if (uvi >= 3 && uvi < 6) {
      return 'yellow';
  } else if (uvi >= 6 && uvi < 8) {
      return 'orange';
  } else if (uvi >= 8 && uvi < 11) {
      return 'red';
  } else return 'purple';
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
        var weatherIcon = weatherData.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/"+weatherIcon +"@2x.png";
        // pull new date
        var date = new Date(weatherData.dt*1000).toLocaleDateString();
        // city name response and weather icon
        $(currentCity).html(weatherData.name + "("+date+")" + "<img src=" +iconUrl+">");

        // Parse response to display the current temperature and convert that temp to fahreneit
        var tempFahrenheit = (weatherData.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempFahrenheit).toFixed(2)+"&#8457");
        
        // show humidity
        $(currentHumidty).html(weatherData.main.humidity+"%");

        // show Wind Speed and convert to MPH
        var windSpeed = weatherData.wind.speed;
        var windSpeedMPH = (windSpeed*2.237).toFixed(1);
        $(currentWindSpeed).html(windSpeedMPH+"MPH");

        // Show UV Index using geographic coordinates method and using appid coordinates as a parameter, build uv search url
        uvIndex(weatherData.coord.lon, weatherData.coord.lat);
        currentForecast(weatherData.id);
        if(weatherData.cod==200){
            searchedCity=JSON.parse(localStorage.getItem("cityname"));
            console.log(searchedCity);
            if (searchedCity==null){
                searchedCity=[];
                searchedCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(searchedCity));
                addToHistory(city);
            }
            else {
                if(find(city)>0){
                    searchedCity.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(searchedCity));
                    addToHistory(city);
                }
            }
        }
});
}

// fucntion to return the UV index response
 function uvIndex(lon, lat){
   var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+"&lat="+lat+"&lon="+lon;
   $.ajax({
     url: uvURL,
     method: "GET"
   }).then(function(uvData){
    //  let uvIndex = uvData.current.uvi;
    //  let uvColor = setUVIndexColor(uvIndex);
    //  currentUvindex.text(uvData.current.uvi);
    //  currentUvindex.attr("style", `background-color:
    //  ${uvColor}; color: ${uvColor === "yellow" ? "black" : "white"}`);
     $(currentUvindex).html(uvData.value);
   });
 }

 // Show extended forecast for current city
 function currentForecast(inputID){
  // var dayover= false;
  var extendedForecastURL="https://api.openweathermap.org/data/2.5/forecast?id=" + inputID + "&appid="+ apiKey;
  $.ajax({
      url:extendedForecastURL,
      method:"GET"
  }).then(function(extendedForecast){
      
      for (i=0;i<5;i++){
          var date= new Date((extendedForecast.list[((i+1)*8)-1].date)*1000).toLocaleDateString();
          var forecastIcon= extendedForecast.list[((i+1)*8)-1].weather[0].icon;
          var forecastIconUrl = "https://openweathermap.org/img/wn/"+ forecastIcon + ".png";
          var startTemp= extendedForecast.list[((i+1)*8)-1].main.temp;
          var tempFahrenheit=(((startTemp-273.5)*1.80)+32).toFixed(2);
          var humidity= extendedForecast.list[((i+1)*8)-1].main.humidity;
      
          $("#fDate"+i).html(date);
          $("#forecastImg"+i).html("<img src="+ forecastIconUrl +">");
          $("#forecastTemp"+i).html(tempFahrenheit+"&#8457");
          $("#forecastHumidity"+i).html(humidity+"%");
      }
      
  });
}

// Add city input to search history list 
function addToHistory(cityInput){
  var searchHistory = $("<li>" + cityInput.toUpperCase() + "</li>");
  $(searchHistory).attr("class", "list-gorup-item");
  $(searchHistory).attr("data-value", cityInput.toUpperCase());
  $(".list-group").append(searchHistory);
}

// Show the forecast for a previously searched city when that city name is clicked on in the search history list
function pullPreviousSearch(event){
  var historyItem = event.target;
  if (event.target.matches("li")){
    city = historyItem.textContent.trim();
    findCurrentWeather(city);
  }
}

// Function to render the data from the previous search
function showPreviousSearch(){
  $("ul").empty();
  var searchedCity = JSON.parse(localStorage.getItem("cityname"));
  if (searchedCity!==null){
    searchedCity=JSON.parse(localStorage.getItem("cityname"));
    for(i=0; i<searchedCity.length;i++){
      addToHistory(searchedCity[i]);
    }
    city = searchedCity[i-1];
    findCurrentWeather(city);
  }
}

// Clear search history
function clearSearchHistory(event){
  event.preventDefault();
  searchedCity = [];
  localStorage.removeItem("cityname");
  document.location.reload();
}

// event listeners
$("#searchButton").on("click", showWeather);
$(document).on("click", pullPreviousSearch);
$(window).on("load", showPreviousSearch);
$("#clearHistory").on("click", clearSearchHistory);

