import { attachCatchesChart, attachEncountersChart, attachValueCountChart } from '../chart-utils.js';
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

    const pokemon = findPokemonById(pokedexItem.id);
    nameTD.textContent = pokemon.pokemon;
    encountersTD.textContent = pokedexItem.encounters;
    catchesTD.textContent = pokedexItem.catches;

    row.append(nameTD, encountersTD, catchesTD);
    return row;
}

//Render the table
const pokedexData = getPokedexData();
for (const key of Object.keys(pokedexData)) {
    tableBody.appendChild(renderTableRow(pokedexData[key]));
}
encountersTotalTd.textContent = '' + getTotalEncounters();
catchesTotalTd.textContent = '' + getTotalCaught();

againButton.addEventListener('click', () => {
    storePokedexData({});
    window.location.href = '../';
});

//Render charts
const chartCanvas1 = document.querySelector('#chart-canvas-1');
attachEncountersChart(chartCanvas1);

const chartCanvas2 = document.querySelector('#chart-canvas-2');
attachCatchesChart(chartCanvas2);

//Render strech charts
const chartCanvas3 = document.querySelector('#chart-canvas-3');
attachValueCountChart(chartCanvas3, 'type_1', undefined, 'Occurrences of Type');

const chartCanvas4 = document.querySelector('#chart-canvas-4');
attachValueCountChart(chartCanvas4, 'type_2', 'NA', 'Occurrences of Secondary Type');

const chartCanvas5 = document.querySelector('#chart-canvas-5');
attachValueCountChart(chartCanvas5, 'ability_1', undefined, 'Occurrences of Main Ability');

const chartCanvas6 = document.querySelector('#chart-canvas-6');
attachValueCountChart(chartCanvas6, 'ability_2', 'NA', 'Occurrences of Secondary Ability');

const chartCanvas7 = document.querySelector('#chart-canvas-7');
attachValueCountChart(chartCanvas7, 'height', undefined, 'Occurrences of Height');

const chartCanvas8 = document.querySelector('#chart-canvas-8');
attachValueCountChart(chartCanvas8, 'weight', undefined, 'Occurrences of Weight');

const chartCanvas9 = document.querySelector('#chart-canvas-9');
attachValueCountChart(chartCanvas9, 'pokebase', undefined, 'Occurrences of Base Evolution');

const chartCanvas10 = document.querySelector('#chart-canvas-10');
attachValueCountChart(chartCanvas10, 'attack', undefined, 'Occurrences of Attack Level');
