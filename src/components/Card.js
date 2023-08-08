import { onMouseOver, onMouseOut } from "../js/app";

export default class Card {
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
    const wrapperElememtInput =
      parentElement.querySelector(".list-header-name");
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
    this.cards.forEach((el) => el.addEventListener("mouseover", onMouseOver));
    this.cards.forEach((el) => el.addEventListener("mouseout", onMouseOut));

    this.cards.forEach((el) =>
      el.addEventListener("click", () => {
        if (event.target.classList.contains("card-close-button")) {
          this.removeCard(el);
        }
      }),
    );
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
        btnForm.forEach((el) =>
          el.removeEventListener("click", onClickBtnForm),
        );
      } else {
        this.closeForm(formElement, addCardElement);
        addCardElement.style.display = "";
        btnForm.forEach((el) =>
          el.removeEventListener("click", onClickBtnForm),
        );
      }
    };
    btnForm.forEach((el) => el.addEventListener("click", onClickBtnForm));
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
