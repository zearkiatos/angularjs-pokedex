const appFilters = angular.module('pokedex.filters', []);
appFilters.filter("imageify", [
  "$filter",
  function ($filter) {
    return function (input, ext) {
      if(input) {
        const url = `../assets/img/pokemons/${$filter('normalize')(input)}.${
          ext || "jpg"
        }`;
        return url;
      }
      return '';
    };
  },
]);

appFilters.filter("normalize", function () {
  return function (input) {
    let normalized = input;
    if (normalized) {
      normalized = normalized.replace("♀", "f").replace("♂", "m").replace(/\W+/g, "");
      return normalized.toLowerCase();
    }

    return input
  };
});
