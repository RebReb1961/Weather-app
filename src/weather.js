//Displaying the time

function formatDate(date) {
  let currentDate = date.getDate();
  let year = date.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  let formattedDate = `${day}, ${month} ${currentDate}, ${year}`;
  return formattedDate;
}

function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}

let currentTime = new Date();
let displayDate = document.querySelector("#date");
let displayTime = document.querySelector("#time");
displayDate.innerHTML = formatDate(currentTime);
displayTime.innerHTML = formatTime(currentTime);

// change city button
function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  if (city === undefined) {
    alert("Please enter a city correctly!");
  }
}

let but1 = document.querySelector("#changeCity");
but1.addEventListener("click", enterCity);

function searchCity(city) {
  let apiKey = "32cfeae7e997deb93a00c26137e84796";
  let units = "metric";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
  let apiURL = `${apiRoot}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayInformation);
}

//showing temperature and info for current location

function displayInformation(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-output").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherMessage").innerHTML =
    response.data.weather[0].description;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "32cfeae7e997deb93a00c26137e84796";
  let units = "metric";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
  let apiURL = `${apiRoot}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayInformation);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

searchCity("London");
