/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/components/Card.js

class Card {
  constructor() {
    this.cards = [];
    this.elememtInput = undefined;
    this.nameTitle = undefined;
    this.changeForm = this.changeForm.bind(this);
    this.blurForm = this.blurForm.bind(this);
    this.renameTitle = this.renameTitle.bind(this);
    this.crateCard = this.crateCard.bind(this);
    this.onCardEvent = this.onCardEvent.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.addForm = this.addForm.bind(this);
  }
  changeForm(wrapperElememtInput) {
    if (!this.elememtInput) return;
    if (!this.elememtInput.value) {
      wrapperElememtInput.textContent = this.nameTitle;
      this.nameTitle = undefined;
      this.elememtInput.style.opacity = "0";
      this.elememtInput.removeEventListener("change", this.changeForm);
      this.elememtInput = undefined;
      return;
    }
    wrapperElememtInput.textContent = this.elememtInput.value;
    this.elememtInput.value = "";
    this.elememtInput.style.opacity = "0";
    this.elememtInput.removeEventListener("change", this.changeForm);
    this.elememtInput = undefined;
  }
  blurForm(wrapperElememtInput) {
    if (!this.elememtInput) return;
    wrapperElememtInput.textContent = this.elememtInput.value;
    this.elememtInput.style.opacity = "0";
    this.elememtInput.removeEventListener("blur", this.blurForm);
    this.elememtInput = undefined;
  }
  renameTitle() {
    this.elememtInput = event.target;
    const parentElement = this.elememtInput.parentElement;
    const wrapperElememtInput = parentElement.querySelector(".list-header-name");
    this.elememtInput.style.opacity = "1";
    this.elememtInput.value = wrapperElememtInput.textContent;
    this.nameTitle = wrapperElememtInput.textContent;
    wrapperElememtInput.textContent = "";
    this.elememtInput.addEventListener("change", () => {
      this.changeForm(wrapperElememtInput);
    });
    this.elememtInput.addEventListener("blur", () => {
      this.blurForm(wrapperElememtInput);
    });
  }
  crateCard(parentElement, text) {
    if (!parentElement) return;
    const cardsContainer = parentElement.querySelector(".list-cards");
    const card = document.createElement("div");
    card.classList = "card";
    const cardText = document.createElement("div");
    cardText.classList = "card-text";
    cardText.textContent = text;
    const cardCloseBtn = document.createElement("div");
    cardCloseBtn.classList = "card-close-button";
    card.appendChild(cardText);
    card.appendChild(cardCloseBtn);
    cardsContainer.appendChild(card);
    this.cards.push(card);
    this.onCardEvent();
  }
  onCardEvent() {
    this.cards.forEach(el => el.addEventListener("mouseover", onMouseOver));
    this.cards.forEach(el => el.addEventListener("mouseout", onMouseOut));
    this.cards.forEach(el => el.addEventListener("click", () => {
      if (event.target.classList.contains("card-close-button")) {
        this.removeCard(el);
      }
    }));
  }
  removeCard(elementCard) {
    elementCard.remove();
  }
  openForm(formElement, parentElement, addCardElement) {
    if (!formElement) return;
    formElement.classList.add("active-form");
    let textarea = formElement.querySelector(".form-textarea");
    textarea.focus();
    const btnForm = formElement.querySelectorAll(".btn-form");
    const onClickBtnForm = () => {
      const curentBtnForm = event.target;
      if (curentBtnForm.classList.contains("btn-form-add")) {
        if (!textarea.value) return;
        this.addForm(formElement, parentElement);
        addCardElement.style.display = "";
        btnForm.forEach(el => el.removeEventListener("click", onClickBtnForm));
      } else {
        this.closeForm(formElement, addCardElement);
        addCardElement.style.display = "";
        btnForm.forEach(el => el.removeEventListener("click", onClickBtnForm));
      }
    };
    btnForm.forEach(el => el.addEventListener("click", onClickBtnForm));
  }
  addForm(formElement, parentElement) {
    let textarea = formElement.querySelector(".form-textarea");
    this.crateCard(parentElement, textarea.value);
    textarea.value = "";
    formElement.classList.remove("active-form");
  }
  closeForm(formElement) {
    let textarea = formElement.querySelector(".form-textarea");
    textarea.value = "";
    formElement.classList.remove("active-form");
  }
}
;// CONCATENATED MODULE: ./src/js/d&d.js

function dragAndDrop() {
  const listCards = document.querySelectorAll(".list-cards");
  let dragAndDropElement = undefined;
  let appendPosition = undefined;
  let elTarget = undefined;
  const createPlaceholder = () => {
    const placeholder = document.createElement("div");
    placeholder.style.backgroundColor = "rgba(0,0,0,0)";
    placeholder.style.pointerEvents = "none";
    return placeholder;
  };
  let placeholder = createPlaceholder();
  const onMouseOverDAndDElement = e => {
    let parent = e.target.closest(".list");
    if (!parent) return;
    const {
      y,
      height
    } = e.target.getBoundingClientRect();
    appendPosition = y + height / 2 > e.clientY ? "beforebegin" : "afterend";
    let eventElementContainer = parent.querySelector(".list-cards");
    dragAndDropElement.style.top = e.clientY + "px";
    dragAndDropElement.style.left = e.clientX + "px";
    placeholder.style.width = dragAndDropElement.style.width;
    placeholder.style.height = dragAndDropElement.style.height;
    if (e.target.closest(".card")) {
      elTarget = e.target.closest(".card");
      elTarget.insertAdjacentElement(appendPosition, placeholder);
    } else {
      eventElementContainer.append(placeholder);
    }
  };
  const onMouseUp = e => {
    if (!e.target.parentElement || !e.target.closest(".list")) {
      dragAndDropElement.classList.remove("dragged");
      dragAndDropElement.style = "";
      dragAndDropElement = undefined;
      placeholder.remove();
      document.documentElement.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseover", onMouseOverDAndDElement);
      return;
    }
    let eventElementContainer = e.target.closest(".list-cards") ? e.target.closest(".list-cards") : e.target.querySelector(".list-cards");
    let parentElTarget;
    if (elTarget) {
      parentElTarget = elTarget.closest(".list-cards");
    }
    if (!eventElementContainer) {
      eventElementContainer = e.target.closest(".list").querySelector(".list-cards");
    }
    if (parentElTarget === eventElementContainer) {
      elTarget.insertAdjacentElement(appendPosition, dragAndDropElement);
    } else {
      eventElementContainer.append(dragAndDropElement);
    }
    appendPosition = undefined;
    elTarget = undefined;
    dragAndDropElement.classList.remove("dragged");
    dragAndDropElement.style = "";
    dragAndDropElement = undefined;
    placeholder.remove();
    document.documentElement.removeEventListener("mouseup", onMouseUp);
    document.documentElement.removeEventListener("mouseover", onMouseOverDAndDElement);
  };
  listCards.forEach(el => el.addEventListener("mousedown", e => {
    e.preventDefault();
    if (e.target.closest(".card-close-button")) {
      return;
    }
    dragAndDropElement = e.target.closest(".card");
    dragAndDropElement.style.height = e.target.clientHeight + "px";
    dragAndDropElement.style.width = e.target.clientWidth + "px";
    dragAndDropElement.classList.add("dragged");
    dragAndDropElement.style.pointerEvents = "none";
    document.documentElement.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseover", onMouseOverDAndDElement);
  }));
}
;// CONCATENATED MODULE: ./src/js/app.js


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

// выделение элементов

addCardBtn.forEach(el => el.addEventListener("mouseover", onMouseOver));
listHeader.forEach(el => el.addEventListener("mouseover", onMouseOver));
addCardBtn.forEach(el => el.addEventListener("mouseout", onMouseOut));
listHeader.forEach(el => el.addEventListener("mouseout", onMouseOut));

// добавление карты

addCardBtn.forEach(el => el.addEventListener("click", e => {
  const addCardElement = e.target.closest(".add-card-button");
  const parentElement = addCardElement.closest(".list");
  const elementForm = parentElement.querySelectorAll(".form")[0];
  card.openForm(elementForm, parentElement, addCardElement);
  el.style.display = "none";
}));

//_________________renameTitle
inputHeader.forEach(el => {
  el.addEventListener("click", card.renameTitle);
});

//_________________d&d
dragAndDrop();
//
//
//
//_________________lokalstorage
window.addEventListener("beforeunload", () => {
  const data = {
    listLeft: [],
    listCenter: [],
    listRight: []
  };
  const cards = document.querySelectorAll(".card");
  cards.forEach(el => {
    if (el.parentElement.parentElement.classList.contains("list-left")) {
      data.listLeft.push(el.firstChild.textContent);
    } else if (el.parentElement.parentElement.classList.contains("list-center")) {
      data.listCenter.push(el.firstChild.textContent);
    } else if (el.parentElement.parentElement.classList.contains("list-right")) {
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
  data.listLeft.forEach(el => card.crateCard(leftContainer, el));
  data.listCenter.forEach(el => card.crateCard(centerContainer, el));
  data.listRight.forEach(el => card.crateCard(rightContainer, el));
});

// почему не устанавливается курсор grabbing

// при двойном щелчке по инпуту стирается имя - в blurForm
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;
//# sourceMappingURL=main.js.map