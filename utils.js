import pokemon from './data.js';

function getRandomIndex() {
    return Math.floor(Math.random() * pokemon.length);
}

export function getRandomPokemon() {
    let randomIndex1 = getRandomIndex();
    let randomIndex2 = getRandomIndex();
    let randomIndex3 = getRandomIndex();

    while (
        randomIndex1 === randomIndex2 
        || randomIndex2 === randomIndex3 
        || randomIndex1 === randomIndex3) {
        randomIndex1 = getRandomIndex();
        randomIndex2 = getRandomIndex();
        randomIndex3 = getRandomIndex();
    }

    return [
        pokemon[randomIndex1], 
        pokemon[randomIndex2], 
        pokemon[randomIndex3]
    ];
}

// renderNewPokemon()
// - We need to find three unique pokemon to show the user
//     - getRandomPokemon()
//     - Whenever we find 3 new pokemon, we need to track that they have now been "seen"
//     - call encounterPokemon() on all 3 new pokemon

// getRandomPokemon()
// - does the hard work of finding three unique and random pokemon from our raw data
// - returns an array of three random pokemon

// setPokedex(pokedex)
// - takes in a pokedex, stringifies it and puts it into local storage

// getPokedex()
// - retrieves and parses the pokedex in local storage

// encounterPokemon(id)
// - getPokedex
// - If the pokemon has been previously seen, just increment the times seen
// - If this is the first time, make a new object with `{ id: 5, encoutered: 1, caught: 0 }`
// - setPokedex

// catchPokemon(id)
// - getPokedex
// - no need to check if it's been encountered. If you got this far, it _has_ been encountered.
// - Increment the `caught` of this pokemon in local storage
// - setPokedex
