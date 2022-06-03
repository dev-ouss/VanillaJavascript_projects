const searchbar = document.getElementById("main__input");
const container = document.querySelector(".characters__container");
let characters = [];
// Event listeners
searchbar.addEventListener("keyup", filterCharacters);
window.addEventListener("DOMContentLoaded", loadCharacters);
// functions
async function loadCharacters() {
  try {
    const response = await fetch("http://hp-api.herokuapp.com/api/characters");
    characters = await response.json();
    displayCharacters(characters);
  } catch (err) {
    console.log(err);
  }
}

function displayCharacters(char) {
  let htmlString = char
    .map((character) => {
      if (character.name == "Albus Dumbledore") {
        character.image =
          "https://i.ibb.co/nwBWgfJ/Albus-Dumbledore-WB-F6-Dumbledore-Sitting-In-Chair-Promo-080615-Port.jpg";
        return character;
      } else {
        return character;
      }
    })
    .filter((character) => {
      return character.house !== "" && character.image !== "";
    })
    .map((character) => {
      return `<div class="character">
            <div class="character__info">
              <h2>${character.name}</h2>
              <p>House: ${character.house}</p>
            </div>
            <div class="character__img">
              <img src="${character.image}" alt="character image" />
            </div>
          </div>`;
    })
    .join("");

  container.innerHTML = htmlString;
}

function filterCharacters(e) {
  let filter = e.target.value;
  if (filter.length == 0) {
    loadCharacters();
  }
  let filtered = characters.filter((character) => {
    let regex = new RegExp(filter, "i");
    return regex.test(character.name);
  });
  displayCharacters(filtered);
}
