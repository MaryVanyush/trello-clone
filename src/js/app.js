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

// переименовывание

inputHeader.forEach((el) => {
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
