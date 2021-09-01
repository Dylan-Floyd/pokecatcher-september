import { catchPokemon, encounterPokemon, getPokedexData, getTotalCaught, storePokedexData } from '../pokedex.js';

const test = QUnit.test;


function storageMock() {
    var storage = {};

    return {
        setItem: function(key, value) {
            storage[key] = value || '';
        },
        getItem: function(key) {
            return key in storage ? storage[key] : null;
        },
        removeItem: function(key) {
            delete storage[key];
        },
        get length() {
            return Object.keys(storage).length;
        },
        key: function(i) {
            var keys = Object.keys(storage);
            return keys[i] || null;
        }
    };
}

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
    storePokedexData({});
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

test('getTotalCaught should return an accurate total', expect => {
    resetStorage();

    const mockData = {
        id1: {
            id: 1,
            encounters: 1,
            catches: 2
        },
        id2: {
            id: 2,
            encounters: 1,
            catches: 5
        }
    };
    storePokedexData(mockData);

    const expected = 7;
    const actual = getTotalCaught();
    expect.equal(actual, expected);

    resetStorage();
});