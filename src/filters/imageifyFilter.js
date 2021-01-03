appFilters.filter('imageify', function () {
    return function (input, ext) {
        const url = `../assets/img/pokemons/${input.toLowerCase()}.${ext || 'jpg'}`;
        return url;
    };
});