

var textList = document.querySelector("#text-List");

var cityList = [];
console.log(cityList)

function renderList() {
  var textList = document.querySelector("#text-List");

  textList.innerHTML = "";

  for (let i = 0; i < cityList.length; i++) {
    var list = cityList[i];

    textList.innerHTML += `<li><button class="liBtn" onClick="again('${list}')">${list}</button></li>`;
  }
}

function listClear(){
    textList.innerHTML = ""
    cityList = []
}

async function again(cityVar) {
  event.preventDefault();

  var APIkey = "2c144caf93af11fa2937f37a9113381c";
  var urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityVar}&appid=${APIkey}`;
  var urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityVar}&appid=${APIkey}`;

  await fetch(urlWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var result = document.querySelector("#location-info");
      var K = `${data.main.temp}`;
      var celsius = Math.round(K - 273.15);
      var date = moment().format("l");
      result.innerHTML = `
                    <div class="card mt-3 ms-3">
                        <div class="card-body">
                        <h3 class="card-title">${
                          data.name
                        } (${date}) ${`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`}</h3>
                            <ul class="cardUl">
                                <li>Temperature: ${celsius} °C</li>
                                <br>
                                <li>Humidity: ${data.main.humidity}</li>
                                <br>
                                <li>Wind speed: ${data.wind.speed} MPH</li>
                            </ul>
                        </div>
                    </div> 
                    `;
    });

  await fetch(urlForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var K1 = `${data.list[0].main.temp}`;
      var K2 = `${data.list[8].main.temp}`;
      var K3 = `${data.list[16].main.temp}`;
      var K4 = `${data.list[24].main.temp}`;
      var K5 = `${data.list[32].main.temp}`;
      var celsius1 = Math.round(K1 - 273.15);
      var celsius2 = Math.round(K2 - 273.15);
      var celsius3 = Math.round(K3 - 273.15);
      var celsius4 = Math.round(K4 - 273.15);
      var celsius5 = Math.round(K5 - 273.15);
      var result = document.querySelector("#location-info2");
      result.innerHTML = `
                        <div class="card mt-3 ms-3">
                                <div class="card-body">
                                    <h3 class="card-text">5-Day Forcast</h3>
                                    <a class="btn btn-primary my-2 mx-2">
                                        <ul class="cardUl">
                                            <li>${data.list[0].dt_txt}</li>
                                            <li>${`<img src="http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png"/>`}</li>
                                            <li>Temp: ${celsius1} °C</li>
                                            <li>Humidity: ${
                                              data.list[0].main.humidity
                                            }</li>
                                        </ul>
                                    </a>
                                    <a class="btn btn-primary my-2 mx-2">
                                        <ul class="cardUl">
                                            <li>${data.list[8].dt_txt}</li>
                                            <li>${`<img src="http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png"/>`}</li>
                                            <li>Temp: ${celsius2} °C</li>
                                            <li>Humidity: ${
                                              data.list[1].main.humidity
                                            }</li>
                                        </ul>
                                    </a>
                                    <a class="btn btn-primary my-2 mx-2">
                                        <ul class="cardUl">
                                            <li>${data.list[16].dt_txt}</li>
                                            <li>${`<img src="http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png"/>`}</li>
                                            <li>Temp: ${celsius3} °C</li>
                                            <li>Humidity: ${
                                              data.list[2].main.humidity
                                            }</li>
                                        </ul>
                                    </a>
                                    <a class="btn btn-primary my-2 mx-2">
                                        <ul class="cardUl">
                                            <li>${data.list[24].dt_txt}</li>
                                            <li>${`<img src="http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png"/>`}</li>
                                            <li>Temp: ${celsius4} °C</li>
                                            <li>Humidity: ${
                                              data.list[3].main.humidity
                                            }</li>
                                        </ul>
                                    </a>
                                    <a class="btn btn-primary my-2 mx-2">
                                        <ul class="cardUl">
                                            <li>${data.list[32].dt_txt}</li>
                                            <li>${`<img src="http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png"/>`}</li>
                                            <li>Temp: ${celsius5} °C</li>
                                            <li>Humidity: ${
                                              data.list[4].main.humidity
                                            }</li>
                                        </ul>
                                    </a>
                                </div>
                        </div>   
                        `;
    });
}

function init() {
  var storedCity = JSON.parse(localStorage.getItem("cityList"));

  if (storedCity !== null) {
    cityList = storedCity;
  }
  renderList();
}

init();

function storeList() {
  localStorage.setItem("cityList", JSON.stringify(cityList));
}

function getInfo() {
  event.preventDefault();
  var city = document.querySelector("#citySearch").value;
  var APIkey = "2c144caf93af11fa2937f37a9113381c";
  var urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
  var urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`;

  var cityInput = document.getElementById("citySearch").value;
  var cityText = cityInput.trim();

  if (cityText === "") {
    return;
  }

  cityList.push(cityText);

  storeList();
  renderList();

  fetch(urlWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var result = document.querySelector("#location-info");
      var K = `${data.main.temp}`;
      var celsius = Math.round(K - 273.15);
      var date = moment().format("l");
      result.innerHTML = `
                    <div class="card mt-3 ms-3">
                        <div class="card-body">
                        <h3 class="card-title">${
                          data.name
                        } (${date}) ${`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`}</h3>
                            <ul class="cardUl">
                                <li>Temperature: ${celsius} °C</li>
                                <br>
                                <li>Humidity: ${data.main.humidity}</li>
                                <br>
                                <li>Wind speed: ${data.wind.speed} MPH</li>
                            </ul>
                        </div>
                    </div> 
                    `;
    });

  fetch(urlForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var K1 = `${data.list[0].main.temp}`;
      var K2 = `${data.list[8].main.temp}`;
      var K3 = `${data.list[16].main.temp}`;
      var K4 = `${data.list[24].main.temp}`;
      var K5 = `${data.list[32].main.temp}`;
      var celsius1 = Math.round(K1 - 273.15);
      var celsius2 = Math.round(K2 - 273.15);
      var celsius3 = Math.round(K3 - 273.15);
      var celsius4 = Math.round(K4 - 273.15);
      var celsius5 = Math.round(K5 - 273.15);
      var result = document.querySelector("#location-info2");
      result.innerHTML = `
                        <div class="card mt-3 ms-3">
                                <div class="card-body">
                                    <h3 class="card-text">5-Day Forcast</h3>
                                    <a class="btn btn-primary my-2 mx-2">
                                        <ul class="cardUl">
                                            <li>${data.list[0].dt_txt}</li>
                                            <li>${`<img src="http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png"/>`}</li>
                                            <li>Temp: ${celsius1} °C</li>
                                            <li>Humidity: ${
                                              data.list[0].main.humidity
                                            }</li>
                                        </ul>
                                    </a>
                                    <a class="btn btn-primary my-2 mx-2">
                                        <ul class="cardUl">
                                            <li>${data.list[8].dt_txt}</li>
                                            <li>${`<img src="http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png"/>`}</li>
                                            <li>Temp: ${celsius2} °C</li>
                                            <li>Humidity: ${
                                              data.list[1].main.humidity
                                            }</li>
                                        </ul>
                                    </a>
                                    <a class="btn btn-primary my-2 mx-2">
                                        <ul class="cardUl">
                                            <li>${data.list[16].dt_txt}</li>
                                            <li>${`<img src="http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png"/>`}</li>
                                            <li>Temp: ${celsius3} °C</li>
                                            <li>Humidity: ${
                                              data.list[2].main.humidity
                                            }</li>
                                        </ul>
                                    </a>
                                    <a class="btn btn-primary my-2 mx-2">
                                        <ul class="cardUl">
                                            <li>${data.list[24].dt_txt}</li>
                                            <li>${`<img src="http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png"/>`}</li>
                                            <li>Temp: ${celsius4} °C</li>
                                            <li>Humidity: ${
                                              data.list[3].main.humidity
                                            }</li>
                                        </ul>
                                    </a>
                                    <a class="btn btn-primary my-2 mx-2">
                                        <ul class="cardUl">
                                            <li>${data.list[32].dt_txt}</li>
                                            <li>${`<img src="http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png"/>`}</li>
                                            <li>Temp: ${celsius5} °C</li>
                                            <li>Humidity: ${
                                              data.list[4].main.humidity
                                            }</li>
                                        </ul>
                                    </a>
                                </div>
                        </div>   
                        `;
    });
}
