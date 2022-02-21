let data = [
  {
    1: { 1: "a", 2: "b", 3: "c", 4: "d", 5: "e" },
    2: { 1: "", 2: "", 3: "", 4: "", 5: "" },
    3: { 1: "", 2: "", 3: "", 4: "", 5: "" },
    4: { 1: "", 2: "", 3: "", 4: "", 5: "" },
    5: { 1: "", 2: "", 3: "", 4: "", 5: "" },
    6: { 1: "", 2: "", 3: "", 4: "", 5: "" },
  },
];

let x = 1;
let y = 1;

const KeyQ = () => {  
  if (x >= 5) {
    data[0][x][y] = "Q";
    x = 1;
    y++;
  }
  y++
  data[0][x][y] = "Q";  
  document.getElementById("11").innerHTML = `${data[0][x][y]}`
  console.log(y);
};


const KeyW = () => {  
  if (x >= 5) {
    data[0][x][y] = "W";
    x = 1;
    y++;
  }
  y++;
  data[0][x][y] = "W";
  document.getElementById("12").innerHTML = `${data[0][x][y]}`;
  console.log(y);
};

const KeyE = () => {  
  if (x >= 5) {
    data[0][x][y] = "E";
    x = 1;
    y++;
  }
  y++;
  data[0][x][y] = "E";
  document.getElementById("13").innerHTML = `${data[0][x][y]}`;
  console.log(data[0][x][y]);
};



let obj = [{ 1: "a", 2: "b", 3: "c", 4: "d", 5: "e" }];

document.getElementById("test1").innerHTML = data
  .map(
    (e) =>
      `<div class="container_input">
        <div class="input" id="11">${e[1][1]}</div>
        <div class="input id="12"">${e[1][2]}</div>
        <div class="input" id="13">${e[1][3]}</div>
        <div class="input">${e[1][4]}</div>
        <div class="input">${e[1][5]}</div>
      </div>`
  )
  .join("");
