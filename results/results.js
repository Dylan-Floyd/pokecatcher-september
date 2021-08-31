import { getPokedexData, getTotalCaught, getTotalEncounters, storePokedexData } from '../pokedex.js';
import { findPokemonById } from '../utils.js';

const tableBody = document.querySelector('#table-body');
const encountersTotalTd = document.querySelector('#encounters-total-td');
const catchesTotalTd = document.querySelector('#catches-total-td');
const againButton = document.querySelector('#again-button');

function renderTableRow(pokedexItem) {
    const row = document.createElement('tr');
    const nameTD = document.createElement('td');
    const encountersTD = document.createElement('td');
    const catchesTD = document.createElement('td');

    let pokemon = findPokemonById(pokedexItem.id);
    nameTD.textContent = pokemon.pokemon;
    encountersTD.textContent = pokedexItem.encounters;
    catchesTD.textContent = pokedexItem.catches;

    row.append(nameTD, encountersTD, catchesTD);
    return row;
}

let pokedexData = getPokedexData();
for (let key of Object.keys(pokedexData)) {
    tableBody.appendChild(renderTableRow(pokedexData[key]));
}
encountersTotalTd.textContent = '' + getTotalEncounters();
catchesTotalTd.textContent = '' + getTotalCaught();

againButton.addEventListener('click', () => {
    storePokedexData({});
    window.location.href = '../';
});