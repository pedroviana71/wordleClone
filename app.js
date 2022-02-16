const main = document.querySelector(".main");
const keyboard = document.querySelector(".keyboard");
const correct = document.querySelector(".correct");
let clean = "";

let line = 0;
let character = 0;
let control = 0;

let randomNumber = Math.floor(Math.random() * 1320);
let word = escolhas[randomNumber];
let result = word.toUpperCase().split("");
console.log(result);

const right = ["Acertou"];
const wrong = ["Errou"];

const functionRight = () => {
  right.forEach((right) => {
    const divi = document.createElement("div");
    divi.textContent = right;
    divi.setAttribute("id", "right");
    correct.append(divi);
  });
};

const removeFunctionRight = () => {
  clean.parentNode.removeChild(clean);
};

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "DEL",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "ENT",
];

const lines = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

keys.forEach((key) => {
  const btn = document.createElement("button");
  btn.textContent = key;
  btn.setAttribute("id", key);
  btn.setAttribute("class", "letter");
  if (key === "ENT") {
    btn.setAttribute("class", "enter");
  }
  if (key === "DEL") {
    btn.setAttribute("class", "delete");
  }
  btn.addEventListener("click", () => {
    handleClick(key);
  });
  keyboard.append(btn);
});

const handleClick = (key) => {  
  addLetter(key);
};

lines.forEach((word, indexWord) => {
  const div = document.createElement("div");
  div.setAttribute("class", "container_input");
  div.setAttribute("id", "word-" + indexWord);
  main.append(div);
  word.forEach((letter, indexLetter) => {
    const square = document.createElement("div");
    square.setAttribute("class", "input");
    square.setAttribute("id", "word-" + indexWord + "-letter-" + indexLetter);
    div.append(square);
  });
});

const addLetter = (key) => {
  let letter = document.getElementById("word-" + line + "-letter-" + character);

  if (key === "DEL") {
    if (line > 0 && character > 0) {
      lines[line][character - 1] = "";
      character--;
      letter = document.getElementById("word-" + line + "-letter-" + character);
      letter.textContent = "";
      return;
    }
    if (line === 0 && character === 0) {
      lines[line][character] = "";
      letter = document.getElementById("word-" + line + "-letter-" + character);
      letter.textContent = "";
      return;
    }

    if (line === 0 && character > 0) {
      lines[line][character - 1] = "";
      character--;
      letter = document.getElementById("word-" + line + "-letter-" + character);
      letter.textContent = "";
      return;
    }

    if (line > 0 && character === 0) {
      lines[line][character] = "";
      letter = document.getElementById("word-" + line + "-letter-" + character);
      letter.textContent = "";
      return;
    }
  }

  if (key === "ENT") {
    let empty = 0;
    for (let i = 0; i <= 4; i++) {
      if (result[i] === lines[line][i]) {
        control += 1;
      }
      if (!lines[line][i]) {
        empty += 1;
        console.log(empty);
      }
    }
    if (control < 5 && empty === 0) {
      wrong.forEach((wrong) => {
        const divi = document.createElement("div");
        divi.textContent = wrong;
        correct.append(divi);
      });
      line++;
      character = 0;
      control = 0;
    }

    if (control === 5 && empty === 0) {      
      line++;
      character = 0;
      control = 0;
      functionRight();
      clean = document.getElementById("right");
    }

    return;
  }

  letter.textContent = key;
  lines[line][character] = key;
  character++;
};
