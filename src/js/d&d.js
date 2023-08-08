import { onMouseOver, onMouseOut } from "./app";

export default function dragAndDrop() {
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

  const onMouseOverDAndDElement = (e) => {
    let parent = e.target.closest(".list");
    if (!parent) return;
    const { y, height } = e.target.getBoundingClientRect();
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

  const onMouseUp = (e) => {
    if (!e.target.parentElement || !e.target.closest(".list")) {
      dragAndDropElement.classList.remove("dragged");
      dragAndDropElement.style = "";
      dragAndDropElement = undefined;
      placeholder.remove();
      document.documentElement.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener(
        "mouseover",
        onMouseOverDAndDElement,
      );
      return;
    }
    let eventElementContainer = e.target.closest(".list-cards")
      ? e.target.closest(".list-cards")
      : e.target.querySelector(".list-cards");
    let parentElTarget;
    if (elTarget) {
      parentElTarget = elTarget.closest(".list-cards");
    }
    if (!eventElementContainer) {
      eventElementContainer = e.target
        .closest(".list")
        .querySelector(".list-cards");
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
    document.documentElement.removeEventListener(
      "mouseover",
      onMouseOverDAndDElement,
    );
  };

  listCards.forEach((el) =>
    el.addEventListener("mousedown", (e) => {
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
      document.documentElement.addEventListener(
        "mouseover",
        onMouseOverDAndDElement,
      );
    }),
  );
}
