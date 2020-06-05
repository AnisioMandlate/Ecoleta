function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`;
      }
    });
}

populateUfs();

document.querySelector("select[name=uf]").addEventListener("change", getCities);
function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");
  console.log(event.target.value);
  const ufValue = event.target.value;

  const indexOfState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfState].text;
  console.log(stateInput.value);
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`;
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (city of cities) {
        citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

/**Selected items */
const itemsList = document.querySelectorAll(".items-grid li");
const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

for (const item of itemsList) {
  item.addEventListener("click", (handleSelectedItem) => {
    const itemLi = event.target;
    itemLi.classList.toggle("selected");
    const itemId = itemLi.dataset.id;
    /**Check for selected items, if already on the array, remove, if not add to the array*/
    const alreadySelected = selectedItems.findIndex((item) => {
      const itemFound = item == itemId;
      return itemFound;
    });
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => {
        const itemIsDifferent = item != itemId;
        return itemIsDifferent;
      });
      selectedItems = filteredItems;
    } else {
      selectedItems.push(itemId);
    }
    console.log(selectedItems);
    collectedItems.value = selectedItems;
  });
}
