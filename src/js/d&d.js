import { onMouseOver, onMouseOut } from "./app";

export default function dragAndDrop() {
  const listCards = document.querySelectorAll(".list-cards");
  let dragAndDropElement = undefined;
  let eventListCards = undefined;

  const createPlaceholder = () => {
    const placeholder = document.createElement("div");
    placeholder.style.backgroundColor = "rgba(0,0,0,0)";
    return placeholder;
  };

  let placeholder = createPlaceholder();

  const onMouseOverDAndDElement = (e) => {
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

  const onMouseUp = (e) => {
    let eventElementCard = e.target.closest(".card");
    let eventElementContainer =
      e.target.parentElement.querySelector(".list-cards");
    if (!eventElementContainer) {
      eventElementContainer = e.target.closest(".list-cards");
    }
    if (!eventElementContainer) {
      eventElementContainer = eventListCards;
    }

    if (eventElementCard) {
      dragAndDropElement.parentElement.insertBefore(
        eventElementCard,
        dragAndDropElement,
      );
    } else {
      eventElementContainer.append(dragAndDropElement);
    }

    dragAndDropElement.classList.remove("dragged");
    dragAndDropElement.style = "";
    dragAndDropElement = undefined;
    placeholder.remove();
    document.documentElement.removeEventListener("mouseup", onMouseUp);
    document.documentElement.removeEventListener(
      "mouseover",
      onMouseOverDAndDElement,
    );
  };

  listCards.forEach((el) =>
    el.addEventListener("mousedown", (e) => {
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
      document.documentElement.addEventListener(
        "mouseover",
        onMouseOverDAndDElement,
      );
    }),
  );
}
