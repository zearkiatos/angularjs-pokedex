appFilters.filter("imageify", [
  "$filter",
  function ($filter) {
    return function (input, ext) {
      const url = `/assets/img/pokemons/${$filter('normalize')(input)}.${
        ext || "jpg"
      }`;
      return url;
    };
  },
]);
