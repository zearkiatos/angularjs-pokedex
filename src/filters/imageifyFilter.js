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
