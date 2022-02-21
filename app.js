const main = document.querySelector(".main");
const keyboard = document.querySelector(".keyboard");

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

