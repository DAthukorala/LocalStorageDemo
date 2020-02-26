(function (angular) {
    'use strict';

    angular
        .module('DemoApp')
        .factory('utilityService', utilityService);

    function utilityService() {

        var service = {
            extractDirtyFields: extractDirtyFields,
            getDifference: getDifference
        };

        return service;

        function extractDirtyFields(formToCheck) {
            var dirtyFields = {};
            //iterate through all the controls in the form
            formToCheck['$$controls'].forEach(control => {
                if (control.$dirty) {
                    //if the control is dirty, return this data
                    dirtyFields[control.$name] = control.$modelValue;
                } else {
                    //if the control is not dirty remove this from the result
                    delete dirtyFields[control.$name];
                }
            });

            return dirtyFields;
        }

        function getDifference(original, edited) {
            var difference = {};
            //iterate through all the original controls and compare the initial value against the changed value
            for (var index = 0; index < original.length; index++) {
                var originalControl = original[index];
                var editedControl = edited['$$controls'][index];
                if (originalControl.$modelValue !== editedControl.$modelValue) {
                    //if the value has changed, return this data
                    difference[originalControl.$name] = editedControl.$modelValue;
                } else {
                    //if the value is the same as original value, remove this from the persisted object
                    delete difference[originalControl.$name];
                }
            }

            return difference;
        }
    }
})(angular);