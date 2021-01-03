appDirectives.directive("pokemonComments", function () {
    return {
        restrict: 'E',
        templateUrl: '../partials/pokemon-comments.html',
        controller: function () {
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

            this.addComment = function () {
                this.comment.date = Date.now();
                this.comments.push(this.comment);
                this.comment = {};
            };
        },
        controllerAs: 'cmtCtrl'
    };
});