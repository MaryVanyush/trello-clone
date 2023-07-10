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
    const cardsContainer = parentElement.querySelectorAll(".list-cards")[0];
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
        this.addForm(formElement, parentElement, addCardElement);
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
  let eventListCards = undefined;
  const createPlaceholder = () => {
    const placeholder = document.createElement("div");
    placeholder.style.backgroundColor = "rgba(0,0,0,0)";
    return placeholder;
  };
  let placeholder = createPlaceholder();
  const onMouseOverDAndDElement = e => {
    let eventElementContainer = e.target.querySelector(".list-cards");
    dragAndDropElement.style.top = e.clientY + "px";
    dragAndDropElement.style.left = e.clientX + "px";
    dragAndDropElement.style.cursor = "grabbing";
    if (eventElementContainer) {
      placeholder.style.width = dragAndDropElement.style.width;
      placeholder.style.height = dragAndDropElement.style.height;
      eventElementContainer.append(placeholder);
    }
  };
  const onMouseUp = e => {
    let eventElementCard = e.target.closest(".card");
    let eventElementContainer = e.target.parentElement.querySelector(".list-cards");
    if (!eventElementContainer) {
      eventElementContainer = e.target.closest(".list-cards");
    }
    if (!eventElementContainer) {
      eventElementContainer = eventListCards;
    }
    if (eventElementCard) {
      dragAndDropElement.parentElement.insertBefore(eventElementCard, dragAndDropElement);
    } else {
      eventElementContainer.append(dragAndDropElement);
    }
    dragAndDropElement.classList.remove("dragged");
    dragAndDropElement.style = "";
    dragAndDropElement = undefined;
    placeholder.remove();
    document.documentElement.removeEventListener("mouseup", onMouseUp);
    document.documentElement.removeEventListener("mouseover", onMouseOverDAndDElement);
  };
  listCards.forEach(el => el.addEventListener("mousedown", e => {
    e.preventDefault();
    const cardCloseBtn = el.querySelector(".card-close-button");
    if (e.target === cardCloseBtn) {
      return;
    }
    eventListCards = el;
    dragAndDropElement = e.target.closest(".card");
    dragAndDropElement.style.height = e.target.clientHeight + "px";
    dragAndDropElement.style.width = e.target.clientWidth + "px";
    dragAndDropElement.classList.add("dragged");
    dragAndDropElement.style.cursor = "grabbing";
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

// переименовывание

inputHeader.forEach(el => {
  el.addEventListener("click", card.renameTitle);
});

//  d&d

dragAndDrop();

// почему не устанавливается курсор grabbing
// Перемещение между колонками: если попаст на карту, а не на контейнер, то улетает обратно в предыдущую колонку

// при перемещении между колонками они меняют размер при больших карточках
// не встает карточка на самую первую позицию

// при двойном щелчке по инпуту стирается имя - в blurForm

// при потере фокуса текстэрии скрывать форму
// вывести крестик в верхний край поля карты

// создать хранение в lokalstorage
// если добавили карту или удалили или переименовали - обновлять lokalstorage
// Перемещать карточки как внутри колонки, так и между колонками
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;
//# sourceMappingURL=main.js.map