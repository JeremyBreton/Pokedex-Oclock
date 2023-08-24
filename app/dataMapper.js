const database = require('./database');

const dataMapper = {
    getAllPokemon: async () => {
        const allPokemonQuery = `SELECT * FROM pokemon;`;
        const allPokemonResult = await database.query(allPokemonQuery);
        return allPokemonResult.rows
    },
    getOnePokemon: async (numeroPokemon) => {
        const onePokemonQuery = `SELECT * FROM pokemon WHERE numero = $1;`
        const onePokemonResult = await database.query(onePokemonQuery, [numeroPokemon]);
        const onePokemon = onePokemonResult.rows[0];
        return onePokemon;
    },

    getPokemonType: async (id) => {
        const pokemonTypeQuery = {
            text: 
                `
                SELECT "pokemon".*, "type"."name", "type"."id" 
                FROM "pokemon"
                JOIN "pokemon_type" ON "pokemon_type"."pokemon_numero" = "pokemon"."numero"
                JOIN "type" ON "pokemon_type"."type_id" = "type"."id"
                WHERE "numero" = $1
                `,
            values: [id]
        }; 
        const pokemonTypeResult = await database.query(pokemonTypeQuery);
        return pokemonTypeResult.rows;
    },

    getPokemonByTypeId: (typeId, callback) => {

        const query = {
            text: `
                SELECT "pokemon".*, "type"."name" as "type_name"
                FROM "pokemon"
                JOIN "pokemon_type" ON "pokemon_type"."pokemon_numero" = "pokemon"."numero"
                JOIN "type" ON "pokemon_type"."type_id" = "type"."id"
                WHERE "type_id" = $1
            `,
            values: [typeId]
        };                

        database.query(query, (error, result) => {
            callback(error, result);
        });

    },

    getAllTypes: async () => {
        const allTypesQuery = `SELECT * FROM type;`;
        const allTypesResult = await database.query(allTypesQuery);
        return allTypesResult.rows;
    },

};

module.exports = dataMapper;