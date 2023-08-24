const dataMapper = require('../dataMapper.js');

const mainController = {
    homePage : async (req,res) => {
        try {
            const pokemons = await dataMapper.getAllPokemon();
            res.render('home', {pokemons : pokemons, title : 'Liste des Pokémons'});
        } catch (error) {
            console.error(error);
            res.status(500).render('error');
        }
    },
    pokemonDetails : async (req,res,next) => {
        try {
            const pokemonNumero = req.params.numero;

            const pokemon = await dataMapper.getOnePokemon(pokemonNumero);
            const pokemonTypes = await dataMapper.getPokemonType(pokemonNumero);
            // console.log(pokemonTypes);
            
            if (pokemon) {
                res.render('pokemon_details', {
                    pokemon : pokemon,
                    pokemonTypes : pokemonTypes,
                    // title : `Détails de ${pokemon}`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    },

    AllTypes : async (req,res) => {
        try {
            const types = await dataMapper.getAllTypes();
            res.render('types', {types});
        } catch (error) {
            console.error(error);
            res.status(500).render('error');
        }
    },

    pokemonTypePage: (request, response, next) => {

        console.debug('controller pokemonTypePage', request.params.typeId);

        const typeId = parseInt(request.params.typeId, 10);

        dataMapper.getPokemonByTypeId(typeId, (error, result) => {
            if (!!error) {
                response.status(500).send(error);
                console.trace(error);
                return;
            }

            if (!result.rows) {
                next();
                return;
            }
            // console.log(result.rows);
            response.render('pokemonTypes.ejs', { pokemons: result.rows });
        });

    },

    notFound: (request, response) => {
        
        console.debug('mainController notFound');

        response.status(404).render('error', { error: 404, message: 'Page introuvable' });
    }
};

module.exports = mainController;