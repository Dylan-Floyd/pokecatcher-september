import { catchPokemon, encounterPokemon, getTotalCaught } from './pokedex.js';
import { getRandomPokemon } from './utils.js';

// import functions and grab DOM elements
const pokeImg1 = document.querySelector('#poke-label-1 > img');
const pokeImg2 = document.querySelector('#poke-label-2 > img');
const pokeImg3 = document.querySelector('#poke-label-3 > img');
const countSpan = document.querySelector('#pokemon-count-span');
const catchButton = document.querySelector('#catch-button');

// initialize state
let pokemon = [];

// set event listeners 
    // User clicks catch button
    // - increment: `pokeCaught++`
    // - We figure out the id of the pokemon that was captured.
    //     - call `catchPokemon(id)` with this id
    // - now, if `pokeCaught > 10`, redirect to the results page
    // - call `renderNewPokemon()`

function renderNewPokemon() {
    pokemon = getRandomPokemon();
    pokeImg1.src = pokemon[0].url_image;
    pokeImg2.src = pokemon[1].url_image;
    pokeImg3.src = pokemon[2].url_image;
    for (let singlePokemon of pokemon) {
        encounterPokemon(singlePokemon.id);
    }
}

catchButton.addEventListener('click', () => {
    let checkedPokemon = document.querySelector('input[name="poke-select"]:checked');
    if (!checkedPokemon) {
        return;
    }
    checkedPokemon.checked = false;
    let caughtPokemonIndex = checkedPokemon.value;
    catchPokemon(pokemon[caughtPokemonIndex].id);
    let total = getTotalCaught();
    if (total >= 10) {
        window.location.href = './results';
    } else {
        countSpan.textContent = '' + total;
        renderNewPokemon();
    }
});

//Everything's set up, render the initial pokemon.
renderNewPokemon();
