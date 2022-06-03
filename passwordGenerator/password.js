// dom elements

const output = document.querySelector(".output").querySelector("p");
const passLength = document.getElementById("length");
const checkboxes = document.querySelectorAll("[type=checkbox]");
const generatorBtn = document.getElementById("generator__btn");
const copyBtn = document.getElementById("clipboard");
// arrays of characters
let uppercase = Array.from(Array(26)).map((a, i) =>
  String.fromCharCode(i + 65)
);
let lowercase = Array.from(Array(26)).map((a, i) =>
  String.fromCharCode(i + 97)
);
let numbers = Array.from(Array(10)).map((element, i) => i);
let symbols = Array.from(Array(14)).map((element, i) =>
  String.fromCharCode(i + 33)
);
// object of arrays of characters
let object = {
  uppercase: uppercase,
  lowercase: lowercase,
  numbers: numbers,
  symbols: symbols,
};

// event listeners
generatorBtn.addEventListener("click", generate);
copyBtn.addEventListener("click", copyToClipboard);

// functions
function generate() {
  let length = Number(passLength.value);
  let checkedArr = [];
  let passwordArr = [];
  let text = "";
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) checkedArr.push(checkbox.getAttribute("id"));
  });
  checkedArr.forEach((element) => {
    // assure that there is at least 1 element from each array
    text += object[`${element}`][Math.floor(Math.random() * 6)];
    // array of all the selected characters
    passwordArr.push(object[`${element}`]);
  });
  passwordArr = passwordArr.reduce((a, b) => a.concat(b));
  while (text.length < length) {
    let random = Math.floor(Math.random() * passwordArr.length);

    text += passwordArr[random];
  }
  output.textContent = text;
}

function copyToClipboard() {
  let copyText = output.textContent;
  navigator.clipboard.writeText(copyText).then(() => {
    alert("copied!");
  });
}
