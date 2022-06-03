let list = [
  {
    question: "who made the iconic i love new york logo :",
    answer1: "Paull Rand",
    answer2: "David Carson",
    answer3: "Milton Glaser",
    correct: "Milton Glaser",
  },
  {
    question:
      "What is the appropriate resolution an image should have in order to be printed clearly?",
    answer1: "300 ppi",
    answer2: "150 ppi",
    answer3: "72 ppi",
    correct: "300 ppi",
  },
  {
    question: "Which Adobe program is the best to use when creating a logo?",
    answer1: "adobe photoshop",
    answer2: "adobe illustrator",
    answer3: "adobe indesign",
    correct: "adobe illustrator",
  },
  {
    question: "Is CMYK an additive or subtractive color system?",
    answer1: "additive",
    answer2: "substractive",
    answer3: "none of the above",
    correct: "substractive",
  },
  {
    question: "What is kerning?",
    answer1: "the spacing between letters in a word",
    answer2: "the spacing between consecutive lines of text",
    answer3: "the spacing between a headline and a sub headline",
    correct: "the spacing between letters in a word",
  },
  {
    question:
      "Which Adobe program is the best to use when creating a multi-page layout?",
    answer1: "adobe indesign",
    answer2: "adobe Acrobat",
    answer3: "adobe photoshop",
    correct: "adobe indesign",
  },
  {
    question: "Who created the typeface Helvetica?",
    answer1: "Max Miedinger",
    answer2: "alonso gonzalez ",
    answer3: "Erik Spierkermann",
    correct: "Max Miedinger",
  },
];

const scrollBtn = document.getElementById("scroll-down");
const nextBtn = document.getElementById("next-btn");
const quizSection = document.querySelector(".quiz-sec");
const questions = document.querySelector(".question-wrapper");
let i = 0;
let score = 0;
const scoreContainer = document.querySelector(".score-container");
const getScoreLink = document.querySelector(".get-score");
// Event Listeners

scrollBtn.addEventListener("click", scroll);
nextBtn.addEventListener("click", next);
questions.addEventListener("click", pickAnswer);
window.addEventListener("DOMContentLoaded", display);

// functions

function scroll() {
  const quizSectionHeight = quizSection.getBoundingClientRect().height;
  scrollTo(0, quizSectionHeight);
}
function display() {
  questions.innerHTML = `<h3>${list[i].question}</h2>
        <div class="answer"><p>${list[i].answer1}</p></div>
        <div class="answer"><p>${list[i].answer2}</p></div>
        <div class="answer"><p>${list[i].answer3}</p></div>`;
}
function next() {
  questions.addEventListener("click", pickAnswer);
  if (i < list.length - 1) {
    i++;
    questions.innerHTML = `<h3>${list[i].question}</h2>
        <div class="answer"><p>${list[i].answer1}</p></div>
        <div class="answer"><p>${list[i].answer2}</p></div>
        <div class="answer"><p>${list[i].answer3}</p></div>`;
  }
  if (i == list.length - 1) {
    scoreContainer.style.display = "flex";
    getScoreLink.addEventListener("click", function (e) {
      e.preventDefault();
      const text = document.querySelector(".score-text");
      if (score >= 5) {
        text.textContent = `your score is ${score} [jooli hh]`;
      } else if (score < 5) {
        text.textContent = `your score is ${score} [9wdtiha hh]`;
      }
    });
  }
}
function pickAnswer(e) {
  let item = e.target;
  let answer = item.querySelector("p").textContent;
  item.classList.add("selected");
  if (answer == list[i].correct) {
    score++;
  }
  questions.removeEventListener("click", pickAnswer);
}
