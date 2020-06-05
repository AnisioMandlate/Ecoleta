const buttonSearch = document.querySelector(".main-home main a");
const modal = document.querySelector("#modal");
const closeButton = document.querySelector("#modal .header a");

buttonSearch.addEventListener("click", (event) => {
  event.preventDefault();
  modal.classList.remove("hide");
});

closeButton.addEventListener("click", () => {
  modal.classList.add("hide");
});
