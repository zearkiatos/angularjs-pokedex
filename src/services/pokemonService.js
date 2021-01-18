appServices.factory("pokemonService", [
  "$http",
  "$q",
  "$filter",
  "$window",
  function ($http, $q, $filter, $window) {
    const localStorage = $window.localStorage;
    const normalize = $filter("normalize");
    function getPokemons() {
      const deferred = $q.defer();
      $http({
        method: "GET",
        url: "/db/mocks/pokemons.json",
      }).then(function (response) {
        deferred.resolve(response.data);
      });
      return deferred.promise;
    }

    function getPokemon(name) {
      const nameNormalized = normalize(name);
      const deferred = $q.defer();
      getPokemons().then(function (data) {
        const pokemon = data.find(
          (pokemon) => normalize(pokemon.name) === nameNormalized
        );
        if (Object.keys(pokemon).length > 0) {
          deferred.resolve(pokemon);
        } else {
          deferred.reject();
        }
      });
      return deferred.promise;
    }

    function getPokemonsByType(type) {
      const typeNormalized = normalize(type);
      const deferred = $q.defer();
      getPokemons().then(function (data) {
        const pokemons = data.filter((pokemon) =>
          pokemon.type.some((type) => normalize(type) === typeNormalized)
        );
        deferred.resolve(pokemons);
      });
      return deferred.promise;
    }

    function saveComment(pokemon, comment) {
      let comments = getComments(pokemon);

      comments.push(comment);

      localStorage.setItem(pokemon, JSON.stringify(comments));
    }

    function savePokemonRaiting(pokemonId, raiting) {
      let totalRaiting = raiting + getRaitings(pokemonId);

      localStorage.setItem(`raiting-${pokemonId}`, totalRaiting);
    }


    function savePokemonVotes(pokemonId) {
      let votes = getVotesQuantity(pokemonId) + 1;

      localStorage.setItem(`votes-${pokemonId}`, votes);
    }

    function getStart(pokemonId) {
      const raiting = getRaitings(pokemonId);
      const raitingThreeRules = raiting / 5;
      const start = parseInt((raitingThreeRules * 0.01) * 5);
      return start;
    }

    function getComments(pokemon) {
      let comments = localStorage.getItem(pokemon);

      if (!comments) {
        comments = [];
      }
      else {
        comments = JSON.parse(comments);
      }
      return comments;
    }

    function getRaitings(pokemonId) {
      let raiting = localStorage.getItem(`raiting-${pokemonId}`);

      if (!raiting) {
        raiting = 0;
      }

      return parseInt(raiting);

    }

    function getVotesQuantity(pokemonId) {
      let votes = localStorage.getItem(`votes-${pokemonId}`);

      if (!votes) {
        votes = 0;
      }

      return parseInt(votes)
    }

    return {
      getPokemons,
      getPokemon,
      getPokemonsByType,
      getRaitings,
      getVotesQuantity,
      saveComment,
      savePokemonRaiting,
      savePokemonVotes,
      getComments,
      getStart
    };
  },
]);
