//API variable
var weatherApiLink = 'https://api.openweathermap.org';
//API Key from Openweathermap (had a new one generated as I am starting fresh)
var apiKey = "e64f1bbcc51498c175315a53f4e40804";

//Variable for list of previously searched cities
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
var extendedForecast = $("extendedForecast");

var cityDate = new Date ();
let day = String(cityDate.getDate()).padStart(2, '0');
let month = String(cityDate.getMonth() + 1).padStart(2, '0');
let year = cityDate.getFullYear();
