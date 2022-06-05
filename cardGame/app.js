const cards = document.querySelectorAll(".card");
const livesTxt = document.querySelector(".lives");
const titleDiv = document.querySelector(".title");
let flipped = [];
let lives = Number(livesTxt.textContent);
let counter = 0;

// add event listener

cards.forEach((card) => {
  card.addEventListener("click", isSimilar);
});
// reload the game to play again
titleDiv.addEventListener("click", reloadDoc);

// functions

function isSimilar(e) {
  let front = e.target;
  let back = e.target.parentElement.querySelector(".back");

  flipped.push(e.target.parentElement);

  // flipping the cards
  front.classList.add("flip-front");
  back.classList.add("flip-back");
  if (flipped.length == 2) {
    // removing the flip
    if (
      flipped[0].querySelector("img").src != flipped[1].querySelector("img").src
    ) {
      setTimeout(() => {
        cards.forEach((card) => {
          if (flipped.includes(card)) {
            card.querySelector(".front").classList.remove("flip-front");
            card.querySelector(".back").classList.remove("flip-back");
          }
        });
        lives--;
        flipped = [];
        gameState();
      }, 200);
    } else {
      counter++;
      flipped = [];
      gameState();
    }
  }
}

function gameState() {
  if (lives < 1) {
    let text = document.createElement("h2");
    text.textContent = "GAME OVER :(";
    text.style.color = "red";
    let button = document.createElement("button");
    button.textContent = "Play Again";
    button.className = "play__again";
    titleDiv.appendChild(text);
    titleDiv.appendChild(button);
    cards.forEach((card) => {
      card.removeEventListener("click", isSimilar);
    });
  }
  if (counter > 7) {
    let text = document.createElement("h2");
    text.textContent = "YOU'VE WON :D!";
    text.style.color = "green";
    let button = document.createElement("button");
    button.textContent = "Play Again";
    button.className = "play__again";
    titleDiv.appendChild(text);
    titleDiv.appendChild(button);
    cards.forEach((card) => {
      card.removeEventListener("click", isSimilar);
    });
  }
  livesTxt.textContent = lives;
}

function reloadDoc(e) {
  let target = e.target;
  console.log(target);
  if (target.className == "play__again") {
    location.reload();
  }
}
