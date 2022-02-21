// --------- Consts to interact with the page ---------------
const main = document.querySelector(".main");
const keyboard = document.querySelector(".keyboard");
const correct = document.querySelector(".correct");

// --------- Start variables --------------
let controlDeleteDivExist = false;
let doNotExist = false;
let controlWord = false;
let isRight = false;
let y = 0;
let clean = "";
let line = 0;
let character = 0;
let control = 0;
let controlCleanRight = false;
let controlCleanWrong = false;
let randomNumber = Math.floor(Math.random() * 1320);
const wrong = ["Errou!!"];
const right = ["Muito bem!"];
const exist = ["Tente outra palavra."];
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
let wordsToWrite = Array.from(opcoes);

// Choice of random word
let word = escolhas[randomNumber];
let answer = word
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toUpperCase()
  .split("");
console.log(answer);

// ---------- Functions to make a div if the usar anwsers rigth or wrong -------------
const functionRight = () => {
  right.forEach((right) => {
    const divi = document.createElement("div");
    divi.textContent = right;
    divi.setAttribute("id", "right");
    correct.append(divi);
  });
};

const functionExist = () => {
  exist.forEach((exist) => {
    const div = document.createElement("div");
    div.textContent = exist;
    div.setAttribute("id", "exist");
    correct.append(div);
  });
};

const functionWrong = () => {
  wrong.forEach((wrong) => {
    const divi = document.createElement("div");
    divi.textContent = wrong;
    divi.setAttribute("id", "wrong");
    correct.append(divi);
  });
};

const removeFunctionWrong = () => {
  document.getElementById("wrong").remove();
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

const deleteLetter = () => {
  let letter = document.getElementById("word-" + line + "-letter-" + character);
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
};

const enterLetter = () => {
  let empty = 0;
  controlWord = false;

  for (let i = 0; i <= 4; i++) {
    if (!lines[line][i]) {
      empty += 1;
    }
    let indexCheck = lines[line][i];
    let index = answer.indexOf(indexCheck);
    if (index >= 0) {
      let addClass = document.getElementById("word-" + line + "-letter-" + i);
      addClass.classList.add("contain");
    }
    if (answer[i] === lines[line][i]) {
      let addClass = document.getElementById("word-" + line + "-letter-" + i);
      addClass.classList.remove("contain");
      addClass.classList.add("animate__bounceIn");
      control += 1;
    }
  }

  if (control < 5 && empty === 0) {
    line++;
    character = 0;
    control = 0;
    functionWrong();
    clean = document.getElementById("wrong");
    controlCleanWrong = true;
    let addStylesRight = document.querySelectorAll(".animate__bounceIn");

    for (let i = 0; i < addStylesRight.length; i++) {
      addStylesRight[i].style.backgroundColor = "#1A7600";
    }
  }

  if (control === 5 && empty === 0) {
    isRight = true;
    control = 0;
    functionRight();
    let addStylesRight = document.querySelectorAll(".animate__bounceIn");

    for (let i = 0; i < addStylesRight.length; i++) {
      addStylesRight[i].style.backgroundColor = "#1A7600";
    }
    clean = document.getElementById("right");
    controlCleanRight = true;
  }

  let addStyleContain = document.querySelectorAll(".contain");
  let addStylesRight = document.querySelectorAll(".right");

  for (let i = 0; i < addStyleContain.length; i++) {
    addStyleContain[i].style.backgroundColor = "#C6B100";
  }
  for (let i = 0; i < addStylesRight.length; i++) {
    addStylesRight[i].style.backgroundColor = "#1A7600";
  }

  return;
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

  //Deleting div "errou"
  if (controlCleanWrong) {
    removeFunctionWrong();
    controlCleanWrong = false
  }

  if (doNotExist && key != "ENT") {
    document.getElementById("exist").remove();
    doNotExist = false;
  }
  
  //Deleting characters
  if (key === "DEL" && isRight === false) {
    deleteLetter();
  }
  //Enter
  if (key === "ENT" && controlWord ) {
    enterLetter();
  }  

  //Adding letters
  if (key != "ENT" && key != "DEL" && isRight === false ) {
    letter.textContent = key;
    lines[line][character] = key;
    character++;
  }
  //Verifying if the word exists
  for (let k = 0; k <= 5; k++) {
    if (wordsToWrite.includes(lines[y].join("").toLowerCase())) {
      y += 1;
      controlWord = true;
    }
    if (!wordsToWrite.includes(lines[y].join("").toLowerCase())  &&
      lines[y].join("").toLowerCase().length >= 5 && key ==="ENT"
    ) {
      doNotExist = true;
      if(k === 5 && !document.getElementById("exist")){
        functionExist();        
      }
    }
  }

  //Verifying accents 
  for (let k = 0; k <= 5; k++) {
    if (wordsToWrite.includes(lines[y].join("").toLowerCase())) {
      y += 1;
      controlWord = true;
    }
    if (k === 1) {
      for (let k = 0; k <= 5; k++) {
        let accent = lines[k].join("").toLowerCase();
        if (accent.length === 5) {
          if (wordsToWrite.includes(opcoesAcento[`${accent}`])) {
            controlWord = true;
          }
        }
      }
    }
  }
};
