(function (angular) {
    'use strict';

    angular
        .module('DemoApp')
        .factory('persistanceService', persistanceService);

    persistanceService.$inject = ["$localStorage", "utilityService"];


    function persistanceService($localStorage, utilityService) {

        var service = {
            persistDirtyFields: persistDirtyFields,
            persistChangedFields: persistChangedFields
        };

        return service;

        function persistDirtyFields(formToCheck) {
            var dirtyFields = utilityService.extractDirtyFields(formToCheck);
            //if there are dirty controls persist that data, else delete the persisted data
            if (_.isEmpty(dirtyFields)) {
                delete $localStorage.dirtyFields
            } else {
                $localStorage.dirtyFields = dirtyFields;
            }
        }

        function persistChangedFields(originalForm, changedForm) {
            var changedFields = utilityService.getDifference(originalForm, changedForm);
            //persist edited data and remove the existing saved data, if edited values are the same as the originals
            if (_.isEmpty(changedFields)) {
                delete $localStorage.dirtyFields
            } else {
                $localStorage.changedFields = changedFields;
            }
        }

    }
})(angular);