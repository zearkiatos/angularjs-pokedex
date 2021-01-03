appServices.factory("pokemonService", [
  "$http",
  "$q",
  "$filter",
  function ($http, $q, $filter) {
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
    return {
      getPokemons,
      getPokemon,
      getPokemonsByType,
    };
  },
]);
