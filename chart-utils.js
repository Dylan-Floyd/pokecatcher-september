import { getPokedexData } from './pokedex.js';
import { findPokemonById } from './utils.js';

//returns { labels: ~labeldata~, data: ~datapoints~ }
export function getEncounterChartData() {
    const labels = [];
    const data = [];
    const pokedexData = getPokedexData();
    const keys = Object.keys(pokedexData);
    for (let i = 0; i < keys.length; i++) {
        const pokedexEntry = pokedexData[keys[i]];
        const name = findPokemonById(pokedexEntry.id).pokemon;
        labels.push(name);
        data.push(pokedexEntry.encounters);
    }
    return { labels, data };
}

export function getCatchesChartData() {
    const labels = [];
    const data = [];
    const pokedexData = getPokedexData();
    const keys = Object.keys(pokedexData);
    for (let i = 0; i < keys.length; i++) {
        const pokedexEntry = pokedexData[keys[i]];
        const name = findPokemonById(pokedexEntry.id).pokemon;
        if (pokedexEntry.catches > 0) {
            labels.push(name);
            data.push(pokedexEntry.catches);
        }
    }
    return { labels, data };
}

/*
 * Example return data format for (getPokedex, 'type_1', 'NA'):
 *  {
 *      values: ['grass', 'poison'],
 *      counts: [1, 3]
 *  }
 */
export function countValuesForKey(arrayOfObjects, key, ignoreValue) {
    const valuesData = {
        values: [],
        counts: []
    };
    for (const currKey of Object.keys(arrayOfObjects)) {
        const pokemonData = findPokemonById(arrayOfObjects[currKey].id);
        const value = pokemonData[key];
        //don't count the value it's equal to ignoreValue and
        //do count the value if ignoreValue wasn't specified.
        if (value === ignoreValue && typeof ignoreValue !== 'undefined') {
            continue;
        }

        for (let i = 0; i < valuesData.values.length; i++) {
            if (valuesData.values[i] === value) {
                valuesData.counts[i] += 1;
                break;
            }
        }
        //If this code runs, the for loop didn't find an entry
        //for the newType, so add it and set the count;
        valuesData.values.push(value);
        valuesData.counts.push(1);
    }
    return valuesData;
}

export function attachEncountersChart(targetCanvas) {
    const encountersData = getEncounterChartData();
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
    const catchesData = getCatchesChartData();
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

export function attachType1Chart(targetCanvas) {
    const type1Data = countValuesForKey(getPokedexData(), 'type_1', 'NA');
    // eslint-disable-next-line no-undef
    new Chart(targetCanvas, {
        type: 'bar',
        data: {
            labels: type1Data.values,
            datasets: [{
                label: '# of Catches',
                data: type1Data.counts,
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

export function attachValueCountChart(targetCanvas, key, ignoreValue, chartLabel) {
    const type1Data = countValuesForKey(getPokedexData(), key, ignoreValue);
    // eslint-disable-next-line no-undef
    new Chart(targetCanvas, {
        type: 'bar',
        data: {
            labels: type1Data.values,
            datasets: [{
                label: chartLabel,
                data: type1Data.counts,
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
