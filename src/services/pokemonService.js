appServices.factory("pokemonService", [
  "$http",
  "$q",
  "$filter",
  "config",
  function ($http, $q, $filter, config) {
    const { POKEMON_BASE_API } = config;
    const normalize = $filter("normalize");
    function getPokemons() {
      const deferred = $q.defer();
      $http({
        method: "GET",
        url: `${POKEMON_BASE_API}pokemon`,
      }).then(function (response) {
        deferred.resolve(response.data.data);
      });
      return deferred.promise;
    }

    function getPokemon(name) {
      const nameNormalized = normalize(name);
      const deferred = $q.defer();
      $http({
        method: "GET",
        url: `${POKEMON_BASE_API}pokemon/${nameNormalized}`,
      }).then(function (response) {
        deferred.resolve(response.data.data);
      });
      return deferred.promise;
    }

    function getPokemonEvolution(id) {
      const deferred = $q.defer();
      $http({
        method: "GET",
        url: `${POKEMON_BASE_API}pokemon/${id}/evolution`,
      }).then(function (response) {
        deferred.resolve(response.data.data);
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

    function saveComment(pokemonId, comment) {
      const deferred = $q.defer();
      const payload = {
        pokemonId,
        comment: comment.comment,
        user: comment.user,
        anonymous: comment.anonymous,
        date: comment.date
      }
      $http({
        method: "POST",
        url: `${POKEMON_BASE_API}comment`,
        data: payload
      }).then(function (response) {
        deferred.resolve(response.data.data);
      });
      return deferred.promise;
    }

    function savePokemonRating(pokemonId, rating) {
      const deferred = $q.defer();
      const payload = {
        pokemonId,
        rating
      }
      $http({
        method: "POST",
        url: `${POKEMON_BASE_API}rating`,
        data: payload
      }).then(function (response) {
        deferred.resolve(response.data.data);
      });
      return deferred.promise;
    }

    async function getTotalRating(pokemonId) {
      const totalRating = await getRatings(pokemonId).then(function (data) {
        let ratingCount = 0;
        if (data) {
          for (let item of data) {
            ratingCount += item.rating;
          }
        }
        return ratingCount;
      });
      return totalRating;
    }

    async function getStart(pokemonId) {
      let rating = 0;
      rating = await getTotalRating(pokemonId);
      const ratingThreeRules = rating / 5;
      const start = parseInt((ratingThreeRules * 0.01) * 5);
      return start;
    }

    function getComments(pokemonId) {
      const deferred = $q.defer();
      $http({
        method: "GET",
        url: `${POKEMON_BASE_API}comment?pokemonId=${pokemonId}`,
      }).then(function (response) {
        deferred.resolve(response.data.data);
      });
      return deferred.promise;
    }

    function getRatings(pokemonId) {
      const deferred = $q.defer();
      $http({
        method: "GET",
        url: `${POKEMON_BASE_API}rating?pokemonId=${pokemonId}`,
      }).then(function (response) {
        deferred.resolve(response.data.data);
      });
      return deferred.promise;

    }

    function getVotesQuantity(pokemonId) {
      const deferred = $q.defer();
      $http({
        method: "GET",
        url: `${POKEMON_BASE_API}rating?pokemonId=${pokemonId}`,
      }).then(function (response) {
        deferred.resolve(response.data.data.length);
      });
      return deferred.promise;
    }

    function getPokemonsTopTen(limit) {
      const deferred = $q.defer();
      $http({
        method: "GET",
        url: `${POKEMON_BASE_API}rating/top?limit=${limit}`,
      }).then(function (response) {
        deferred.resolve(response.data.data);
      });
      return deferred.promise;
    }

    return {
      getPokemons,
      getPokemon,
      getPokemonsByType,
      getRatings,
      getVotesQuantity,
      saveComment,
      savePokemonRating,
      getComments,
      getStart,
      getPokemonsTopTen,
      getPokemonEvolution
    };
  },
]);
