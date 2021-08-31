/*
Data format:
{
    id1: {
        id: 1,
        encounters: 3,
        catches: 2
    },
    id2: {
        id: 2,
        encounters: 4,
        catches: 1
    },
    id3: {
        id: 3,
        encounters: 5,
        catches: 0
    },
}

*/


export function getPokedexData() {
    return (JSON.parse(localStorage.getItem('POKEDEX')) || {});
}

export function storePokedexData(data) {
    localStorage.setItem('POKEDEX', JSON.stringify(data));
}

//increments the encounters for the specified id and updates localStorage
export function encounterPokemon(id) {
    if (!id || typeof id !== 'number') {
        throw 'encounterPokemon(id) requires an argument of type number';
    }
    let data = getPokedexData();
    let item = data['id' + id];
    if (item) {
        item.encounters++;
    } else {
        item = {
            id: id,
            encounters: 1,
            catches: 0
        };
    }
    data['id' + id] = item;
    storePokedexData(data);
}

//increments the catches for the specified id and updates localStorage
export function catchPokemon(id) {
    if (!id || typeof id !== 'number') {
        throw 'catchPokemon(id) requires an argument of type number';
    }
    let data = getPokedexData();
    let item = data['id' + id];
    if (item) {
        item.catches++;
    } else {
        //this isn't necessary but it's nice to have in case encounterPokemon breaks.
        item = {
            id: id,
            encounters: 1,
            catches: 1
        };
    }
    data['id' + id] = item;
    storePokedexData(data);
}

export function getTotalCaught() {
    let data = getPokedexData();
    return Object.keys(data).reduce((acc, curr) => {
        acc += data[curr].catches;
        return acc;
    }, 0);
}

export function getTotalEncounters() {
    let data = getPokedexData();
    return Object.keys(data).reduce((acc, curr) => {
        acc += data[curr].encounters;
        return acc;
    }, 0);
}