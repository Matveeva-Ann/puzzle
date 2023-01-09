const img = document.querySelectorAll(".puzzle");
const imgDataAttr = Array.from(img).map((el) => el.dataset.item);
const btnSort = document.querySelector(".btn-sort");
const cell = document.querySelectorAll(".cell");
const btnCheck = document.querySelector(".btn-check");
const btnStart = document.querySelector(".btn-start");
const timer = document.querySelector(".timer");
const btnRset = document.querySelector(".btn-reset");
const informationWindow = document.querySelector('.informationWindow')
const x = document.querySelector('.x')

let time = 60;
x.addEventListener('click', ()=> informationWindow.style.display = 'none')
function dragAndDrop() {
  const jsClass = document.querySelectorAll(".js-class");
  let dragedItem = null;

  img.forEach((el) => {
    el.addEventListener("dragstart", function (event) {
      dragedItem = this;
      setTimeout(() => {
        el.classList.add("displayNone");
      }, 0);
      event.dataTransfer.setData("data", this.dataset.item);
    });
    el.addEventListener("dragend", function (event) {
      el.classList.remove("displayNone");
      dragedItem = null;
    });
    el.addEventListener("drag", function (event) {});
  });

  function dragover(event) {
    event.preventDefault();
  }
  function dragleave(event) {
    this.classList.remove("hoverEffect");
  }
  function dragenter(event) {
    this.classList.add("hoverEffect");
    event.preventDefault();
  }
  function drop(event) {
    this.classList.remove("hoverEffect");
    this.append(dragedItem);
  }

  jsClass.forEach((elem) => {
    elem.addEventListener("dragover", dragover);
    elem.addEventListener("dragleave", dragleave);
    elem.addEventListener("dragenter", dragenter);
    elem.addEventListener("drop", drop);
  });
}

function sortArray(array) {
  array.sort(() => Math.random() - 0.5);
}

function sortElem() {
  informationWindow.style.display = 'none';
  sortArray(imgDataAttr);
  for (let i = 0; i < imgDataAttr.length; i++) {
    let newIndex = imgDataAttr[i];
    cell[i].appendChild(img[newIndex - 1]);
  }
}

btnSort.addEventListener("click", sortElem);

let setInt;
btnStart.addEventListener("click", function () {
  informationWindow.style.display = 'none';

dragAndDrop();
  btnStart.setAttribute("disabled", "disabled");
  setInt = setInterval(function () {
    time--;
    if (time >= 10) {
      timer.innerHTML = `00:${time}`;
    } else if (time < 10 && time >= 1) {
      timer.innerHTML = `00:0${time}`;
    } else if (time == 0) {
      timer.innerHTML = `00:00`;
      document.querySelector(".false").style.display = "block";
      document.querySelector(".false").textContent = `Time is up. Please click "Reset"`;
      btnStart.setAttribute("disabled", "disabled");
      btnCheck.setAttribute("disabled", "disabled");
      btnSort.setAttribute("disabled", "disabled");
    }
  }, 1000);
});

btnCheck.addEventListener("click", function () {
  const secondBlocksChildren = document.querySelector(".secondBlock").children;
  const correctArray = ["1", "2", "3", "4", "5", "6"];

  let newD = Array.from(secondBlocksChildren).map(
    (el) => el.firstChild.attributes["data-item"].textContent
  );
  let audit = [];
  for (let i = 0; i < newD.length; i++) {
    newD[i] === correctArray[i] ? audit.push(true) : audit.push(false);
  }
  if (audit.includes(false)) {
    document.querySelector(".false").style.display = "block";
    document.querySelector("#load").style.display = "none";
    document.querySelector("canvas").style.display = "none";
    btnSort.setAttribute("disabled", "disabled");

  } else {
    clearInterval(setInt);
    if (time >= 10) {
      timer.innerHTML = `00:${time}`;
    btnSort.setAttribute("disabled", "disabled");

    } else if (time < 10 && time >= 1) {
      timer.innerHTML = `00:0${time}`;
    btnSort.setAttribute("disabled", "disabled");

    }
    document.querySelector(".false").style.display = "none";
    document.querySelector("#load").style.display = "block";
    document.querySelector("canvas").style.display = "block";
    btnSort.setAttribute("disabled", "disabled");

    setTimeout(() => {
      document.querySelector("#load").style.display = "none";
      document.querySelector("canvas").style.display = "none";
    }, 5000);
  }
});

btnRset.addEventListener("click", () => {
  btnCheck.removeAttribute("disabled", "disabled");
  btnSort.removeAttribute("disabled", "disabled");
  informationWindow.style.display = 'none';
  document.querySelector(".false").style.display = "none";
  sortElem();
  clearInterval(setInt);
  timer.innerHTML = `00:00`;
  time = 60;
  btnStart.removeAttribute("disabled");
});
