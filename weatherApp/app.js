import { Kelvin } from "../temperatureConverter/temperatureConverter/app.js";

const tempDiv = document.querySelector(".temperature");
const form = document.querySelector(".searchbar");
const input = document.querySelector("#city");
const section = document.querySelector("section");
// Event Listener

form.addEventListener("submit", display);

async function fetchTemp() {
  let city = input.value;
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=428ec4625357a5f4c55c7daf00da85e0`
  ).then((res) => res.json());
  let temperature = response.main.temp;
  let description = response.weather[0].main;
  return [temperature, description];
}

async function display(e) {
  e.preventDefault();
  let city = input.value;
  let info = await fetchTemp();
  let temperature = new Kelvin(info[0]).getCelsius().toFixed(0);
  tempDiv.innerHTML = `<strong>${city}</strong>
          <strong>${temperature}°C</strong>
          `;
  let canvas = document.createElement("canvas");
  canvas.className = "icon";
  section.appendChild(canvas);
  let currentIcon = info[1];
  switch (currentIcon) {
    case "Rain":
      currentIcon = "RAIN";
      break;
    case "Thunderstorm":
      currentIcon = "RAIN";
      break;
    case "Clouds":
      currentIcon = "PARTLY_CLOUDY_DAY";
      break;
    case "Clear":
      currentIcon = "CLEAR_DAY";
      break;
    case "Mist":
      currentIcon = "CLOUDY";
      break;
    default:
      currentIcon = "CLEAR_DAY";
  }
  console.log(currentIcon);
  setIcon(currentIcon, document.querySelector(".icon"));
}

function setIcon(icon, iconID) {
  const skycons = new Skycons({ color: "white" });
  skycons.play();
  return skycons.set(iconID, Skycons[icon]);
}
