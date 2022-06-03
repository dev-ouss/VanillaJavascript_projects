const inputs = document.querySelectorAll("input[type=number]");
const celsiusTemp = document.getElementById("celsius");
const fahrTemp = document.getElementById("fahr");
const kelvinTemp = document.getElementById("kelvin");
// Event Listeners

inputs.forEach((input) => {
  input.addEventListener("keyup", convert);
});

// Classes

class Celsius {
  constructor(t) {
    this.temperature = t;
  }
  getFahr() {
    return this.temperature * (9 / 5) + 32;
  }
  getKelvin() {
    return this.temperature + 273.15;
  }
}
class Fahr {
  constructor(t) {
    this.temperature = t;
  }
  getCelsius() {
    return (this.temperature - 32) * (5 / 9);
  }
  getKelvin() {
    return new Fahr(this.temperature).getCelsius() + 273.15;
  }
}
class Kelvin {
  constructor(t) {
    this.temperature = t;
  }
  getFahr() {
    return new Kelvin(this.temperature).getCelsius() * (9 / 5) + 32;
  }
  getCelsius() {
    return this.temperature - 273.15;
  }
}

// convert function

function convert(e) {
  let id = e.target.getAttribute("id");
  let temp = Number(e.target.value);
  switch (id) {
    case "celsius":
      fahrTemp.value = new Celsius(temp).getFahr().toFixed(4);
      kelvinTemp.value = new Celsius(temp).getKelvin().toFixed(4);
      break;
    case "fahr":
      celsiusTemp.value = new Fahr(temp).getCelsius().toFixed(4);
      kelvinTemp.value = new Fahr(temp).getKelvin().toFixed(4);
      break;
    case "kelvin":
      celsiusTemp.value = new Kelvin(temp).getCelsius().toFixed(4);
      fahrTemp.value = new Kelvin(temp).getFahr().toFixed(4);
      break;
  }
}

export { Kelvin };
