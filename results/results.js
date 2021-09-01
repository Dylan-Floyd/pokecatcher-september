import { attachCatchesChart, attachEncountersChart } from '../chart-utils.js';
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

//Render the table
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

//Render chart 1
const chartCanvas1 = document.querySelector('#chart-canvas-1');
attachEncountersChart(chartCanvas1);

//Render chart 2:
const chartCanvas2 = document.querySelector('#chart-canvas-2');
attachCatchesChart(chartCanvas2);
