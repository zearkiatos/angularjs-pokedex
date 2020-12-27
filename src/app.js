(function () {
    const app = angular.module('pokedex', []);
    app.controller('PokemonController', function () {
        this.pokemon = {
            id: '001',
            name: 'Bulbasaur',
            species: 'Seed Pokemon',
            type: ['Grass', 'Poison'],
            height: "2'4",
            weight: '15.2 lbs',
            abilities: ['Overgrow', 'Chlorophyll'],
            stats: {
                hp: 45,
                attack: 49,
                defense: 49,
                "sp.atk": 65,
                "sp.def": 65,
                speed: 45,
                total: 318
            },
            evolutions: ["Bulbasaur", "Ivysaur", "Venusaur"]
        };
    });

    app.controller('TabsController', function () {
        this.tab = 1;

        this.selectTab = function (tab) {
            this.tab = tab;
        };
    });

    app.controller('CommentController', function () {
        this.comments = [];
        this.comment = {
            anonymous: false,
            email: "",
            body: "",
            date: Date.now()
        };
        this.show = false;

        this.toggle = function () {
            this.show = !this.show;
        };

        this.anonymousChanged = function () {
            if (this.comment.anonymous) {
                this.comment.email = "";
            }
        };

        this.addComment = function() {
            this.comment.date = Date.now();
            this.comments.push(this.comment);
            this.comment = {};
        };
    });

    app.filter('imageify', function () {
        return function (input, ext) {
            const url = `assets/img/pokemons/${input.toLowerCase()}.${ext || 'jpg'}`;
            return url;
        };
    });

})();