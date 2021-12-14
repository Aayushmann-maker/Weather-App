const submitBtn = document.querySelector(".submitBtn");
const inputField = document.querySelector("form input");
const outputContainer = document.querySelector(".form-output");

// Display content on the DOM
const displayandUpdate = ({ main, name, weather, sys }) => {
  const celsius = Math.floor(main.temp - 273.15);
  const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
  const html = `
  <div class="form-output__item">
  <h3 class="form-output__item--heading">
    ${name}
    <span> ${sys.country} </span>
  </h3>
  <h1 class="form-output__item--temp">
    ${celsius}
    <span> °C </span>
  </h1>
  <div class="weather-img">
    <img
      src=${icon}
      alt=${weather[0].description}
    />
  </div>
  <div class="weather-desc">
    <h3>${weather[0].description}</h3>
  </div>
</div>`;

  outputContainer.insertAdjacentHTML("afterbegin", html);
};

// Get weather from the API
const getWeather = async (city) => {
  const KEY = "e72f4d71ae5d4ed9d1f51e48c92e8ea0";
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`;
  try {
    const response = await fetch(API);
    const data = await response.json();
    displayandUpdate(data);
  } catch (error) {
    alert("Not Found Please Search For another City");
  }
};

// Handles the Submission of the Form
const formSubmitHandler = (e) => {
  e.preventDefault();
  const city = inputField.value.trim();
  inputField.value = "";
  if (city === "") return;
  getWeather(city);
};

// Event Handlers
submitBtn.addEventListener("click", formSubmitHandler);
