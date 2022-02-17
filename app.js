// --------- Consts to interact with the page ---------------
const main = document.querySelector(".main");
const keyboard = document.querySelector(".keyboard");
const correct = document.querySelector(".correct");

// --------- Start variables --------------
let clean = "";
let line = 0;
let character = 0;
let control = 0;
let controlCleanRight = false;
let controlCleanWrong = false;
let randomNumber = Math.floor(Math.random() * 1320);
const wrong = ["Errou"];
const right = ["Acertou"];
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

// Choice of random word
let word = escolhas[randomNumber];
let result = word.toUpperCase().split("");
console.log(result);

// ---------- Functions to make a div if the usar anwsers rigth or wrong -------------
const functionRight = () => {
  right.forEach((right) => {
    const divi = document.createElement("div");
    divi.textContent = right;
    divi.setAttribute("id", "animate__fadeInDown");
    correct.append(divi);
  });
};

const functionWrong = () => {
  wrong.forEach((wrong) => {
    const divi = document.createElement("div");
    divi.textContent = wrong;
    divi.setAttribute("id", "animate__fadeInDown");
    correct.append(divi);
  });
};

const removeFunctionRight = () => {
  clean.parentNode.removeChild(clean);
};

const removeFunctionWrong = () => {
  clean.parentNode.removeChild(clean);
};

// --------- forEach to make the keyboard -----------
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

// ----------- handleClick to interact with the click in the key --------------
const handleClick = (key) => {
  addLetter(key);
};

// ----------- forEach to make each word divs --------------
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

// ------------ Function of rules for adding letters and deleting them -----------------
const addLetter = (key) => {
  let letter = document.getElementById("word-" + line + "-letter-" + character);
  if (controlCleanRight) {
    removeFunctionRight();
    controlCleanRight = false;
  }
  if (controlCleanWrong) {
    removeFunctionWrong();
    controlCleanWrong = false;
  }

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
    console.log(lines);
    let empty = 0;
    for (let i = 0; i <= 4; i++) {
      if (result[i] === lines[line][i]) {
        let addClass = document.getElementById("word-" + line + "-letter-" + i);
        addClass.classList.add("animate__bounceIn");
        control += 1;
      }
      if (!lines[line][i]) {
        empty += 1;
      }
      let check = lines[line][i];
      let index = result.indexOf(check);
      if (index > -1) {
        let addClass = document.getElementById("word-" + line + "-letter-" + i);
        addClass.classList.add("contain");
      }
    }
    if (control < 5 && empty === 0) {
      line++;
      character = 0;
      control = 0;
      functionWrong();
      clean = document.getElementById("animate__fadeInDown");
      controlCleanWrong = true;
    }

    if (control === 5 && empty === 0) {
      line++;
      character = 0;
      control = 0;
      functionRight();
      clean = document.getElementById("animate__fadeInDown");
      controlCleanRight = true;
    }

    return;
  }

  letter.textContent = key;
  lines[line][character] = key;
  character++;
};
