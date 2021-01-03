
appControllers.controller('TabsController', function () {
    this.tab = 1;

    this.selectTab = function (tab) {
        this.tab = tab;
    };
})
