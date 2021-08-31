import { getRandomPokemon } from './utils.js';

// import functions and grab DOM elements
const pokeImg1 = document.querySelector('#poke-label-1 > img');
const pokeImg2 = document.querySelector('#poke-label-2 > img');
const pokeImg3 = document.querySelector('#poke-label-3 > img');

// initialize state

// set event listeners 
    // User clicks catch button
    // - increment: `pokeCaught++`
    // - We figure out the id of the pokemon that was captured.
    //     - call `catchPokemon(id)` with this id
    // - now, if `pokeCaught > 10`, redirect to the results page
    // - call `renderNewPokemon()`
function renderNewPokemon() {
    getRandomPokemon();
}