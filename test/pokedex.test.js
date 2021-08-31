import { catchPokemon, encounterPokemon, getPokedexData, storePokedexData } from '../pokedex.js';

const test = QUnit.test;

function resetStorage() {
    Object.defineProperty(window, 'localStorage', {
        value: storageMock(),
    });
}

test('getPokedexData should return an empty object if the data doesn\'t exist', expect => {
    resetStorage();
    const expected = {};
    const actual = getPokedexData();
    expect.deepEqual(actual, expected);
    resetStorage();
});

test('storePokedexData and getPokedexData should return the same object', expect => {
    resetStorage();
    const expected = {
        id: 1,
        name: 'bob'
    };
    storePokedexData(expected);
    const actual = getPokedexData();
    expect.deepEqual(actual, expected);
    resetStorage();
});

test('encounterPokemon should add an entry to the pokedex data for the id if it doesn\'t exit', expect => {
    resetStorage();
    const expected = {
        id1: {
            id: 1,
            encounters: 1,
            catches: 0
        }
    };
    encounterPokemon(1);
    const actual = getPokedexData();
    expect.deepEqual(actual, expected);
    resetStorage();
});

test('encounterPokemon should increment the encounters for an id if it already exits in the data', expect => {
    resetStorage();

    const mockData = {
        id1: {
            id: 1,
            encounters: 1,
            catches: 0
        }
    };
    storePokedexData(mockData);

    const expected = {
        id1: {
            id: 1,
            encounters: 2,
            catches: 0
        }
    };
    encounterPokemon(1);
    const actual = getPokedexData();
    expect.deepEqual(actual, expected);

    resetStorage();
});

test('catchPokemon should increment the catches for an id', expect => {
    resetStorage();

    const mockData = {
        id1: {
            id: 1,
            encounters: 1,
            catches: 0
        }
    };
    storePokedexData(mockData);

    const expected = {
        id1: {
            id: 1,
            encounters: 1,
            catches: 1
        }
    };
    catchPokemon(1);
    const actual = getPokedexData();
    expect.deepEqual(actual, expected);

    resetStorage();
});