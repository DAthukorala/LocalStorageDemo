function modelService(formId) {
    var self = this;

    self.data = {};

    //update data using the latest values from the changed control
    self.updateData = function (control) {
        var value = $(control).val();
        //if the control is a check box and if it is unchecked we need to clear the value
        if ($(control).attr('type') === "checkbox" && !$(control).is(":checked")) {
            value = "";
        }
        self.data[$(control).attr('name')] = value;
    }

    initializeDataModel(formId);

    //initialize the data model based on the name attributes of inputs in the form
    function initializeDataModel(formId) {
        $("#" + formId + " :input").each(function (i, control) {
            self.data[$(control).attr('name')] = "";
        })
    }

}