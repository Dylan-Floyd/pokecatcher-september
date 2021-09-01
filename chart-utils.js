import { getPokedexData } from './pokedex.js';
import { findPokemonById } from './utils.js';

//returns { labels: ~labeldata~, data: ~datapoints~ }
export function getEncounterChartData() {
    let labels = [];
    let data = [];
    let pokedexData = getPokedexData();
    let keys = Object.keys(pokedexData);
    for (let i = 0; i < keys.length; i++) {
        let pokedexEntry = pokedexData[keys[i]];
        let name = findPokemonById(pokedexEntry.id).pokemon;
        labels.push(name);
        data.push(pokedexEntry.encounters);
    }
    return { labels, data };
}

export function getCatchesChartData() {
    let labels = [];
    let data = [];
    let pokedexData = getPokedexData();
    let keys = Object.keys(pokedexData);
    for (let i = 0; i < keys.length; i++) {
        let pokedexEntry = pokedexData[keys[i]];
        let name = findPokemonById(pokedexEntry.id).pokemon;
        if (pokedexEntry.catches > 0) {
            labels.push(name);
            data.push(pokedexEntry.catches);
        }
    }
    return { labels, data };
}

export function attachEncountersChart(targetCanvas) {
    let encountersData = getEncounterChartData();
    // eslint-disable-next-line no-undef
    new Chart(targetCanvas, {
        type: 'bar',
        data: {
            labels: encountersData.labels,
            datasets: [{
                label: '# of Encounters',
                data: encountersData.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

export function attachCatchesChart(targetCanvas) {
    let catchesData = getCatchesChartData();
    // eslint-disable-next-line no-undef
    new Chart(targetCanvas, {
        type: 'bar',
        data: {
            labels: catchesData.labels,
            datasets: [{
                label: '# of Catches',
                data: catchesData.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}