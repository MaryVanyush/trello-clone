import Card from "../components/Card";
import dragAndDrop from "./d&d";

const card = new Card();
const addCardBtn = document.querySelectorAll(".add-card-button");
const listHeader = document.querySelectorAll(".list-header");
const inputHeader = document.querySelectorAll(".overlapped");

const onMouseOver = () => {
  const parentElement = event.currentTarget;
  if (parentElement.classList.contains("card")) {
    const cardCloseBtn = parentElement.querySelector(".card-close-button");
    cardCloseBtn.classList.add("active_card-close-button");
  }
  parentElement.style.backgroundColor = "rgba(0, 0, 0, .2)";
  parentElement.style.borderRadius = "5px";
};

const onMouseOut = () => {
  const parentElement = event.currentTarget;
  if (parentElement.classList.contains("card")) {
    const cardCloseBtn = parentElement.querySelector(".card-close-button");
    cardCloseBtn.classList.remove("active_card-close-button");
  }
  parentElement.style.backgroundColor = "";
};

export { onMouseOver, onMouseOut };
// выделение элементов

addCardBtn.forEach((el) => el.addEventListener("mouseover", onMouseOver));
listHeader.forEach((el) => el.addEventListener("mouseover", onMouseOver));

addCardBtn.forEach((el) => el.addEventListener("mouseout", onMouseOut));
listHeader.forEach((el) => el.addEventListener("mouseout", onMouseOut));

// добавление карты

addCardBtn.forEach((el) =>
  el.addEventListener("click", (e) => {
    const addCardElement = e.target.closest(".add-card-button");
    const parentElement = addCardElement.closest(".list");
    const elementForm = parentElement.querySelectorAll(".form")[0];
    card.openForm(elementForm, parentElement, addCardElement);
    el.style.display = "none";
  }),
);

//_________________renameTitle
inputHeader.forEach((el) => {
  el.addEventListener("click", card.renameTitle);
});

//_________________d&d
dragAndDrop();
//
//
//
//_________________lokalstorage
window.addEventListener("beforeunload", () => {
  const data = { listLeft: [], listCenter: [], listRight: [] };
  const cards = document.querySelectorAll(".card");
  cards.forEach((el) => {
    if (el.parentElement.parentElement.classList.contains("list-left")) {
      data.listLeft.push(el.firstChild.textContent);
    } else if (
      el.parentElement.parentElement.classList.contains("list-center")
    ) {
      data.listCenter.push(el.firstChild.textContent);
    } else if (
      el.parentElement.parentElement.classList.contains("list-right")
    ) {
      data.listRight.push(el.firstChild.textContent);
    }
  });
  localStorage.setItem("data", JSON.stringify(data));
});

document.addEventListener("DOMContentLoaded", () => {
  const json = localStorage.getItem("data");
  const data = JSON.parse(json);
  const leftContainer = document.querySelector(".list-left");
  const centerContainer = document.querySelector(".list-center");
  const rightContainer = document.querySelector(".list-right");
  data.listLeft.forEach((el) => card.crateCard(leftContainer, el));
  data.listCenter.forEach((el) => card.crateCard(centerContainer, el));
  data.listRight.forEach((el) => card.crateCard(rightContainer, el));
});

// почему не устанавливается курсор grabbing

// при двойном щелчке по инпуту стирается имя - в blurForm
