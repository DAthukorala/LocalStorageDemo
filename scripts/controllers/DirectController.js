(function (angular) {
    'use strict';

    angular
        .module('DemoApp')
        .controller('DirectController', DirectController);

    function DirectController() {
        var self = this;
        self.localStorage={};
    }

})(angular);