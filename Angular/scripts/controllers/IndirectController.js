//this does not work yet, do not refer this

(function (angular) {
    'use strict';

    angular
        .module('DemoApp')
        .controller('IndirectController', IndirectController);

    IndirectController.$inject = ["$scope", "$interval", "$timeout", "persistanceService"];

    function IndirectController($scope, $interval, $timeout, persistanceService) {

        var self = this;
        self.$onInit = initialize;

        var timer;

        function initialize() {
            self.firstName = "John";
            self.lastName = "Doe";
            $timeout(function () {
                //get a copy of all the controls in the form
                self.originalControls = _.cloneDeep(self.demoForm.$$controls);
                //start the timer for persistance
                startTicker();
            });
        }

        function startTicker() {
            timer = $interval(function () {
                //save data by performing dirty checks on fields in the form
                persistanceService.persistDirtyFields(self.demoForm);
                //save data by checking for change in the values
                persistanceService.persistChangedFields(self.originalControls, self.demoForm);
            }, 2000);
        }

        function stopTicker() {
            if (angular.isDefined(timer)) {
                $interval.cancel(timer);
            }
        }

        $scope.$on('$destroy', function () {
            stopTicker();
        });

    }

})(angular);