function persistenceService(formId, password) {
    var self = this;
    var options = {
        namespace: 'EMR',
        storage: 'local',
        expireDays: 31
    }

    self.basil = new Basil(options)
    self.storageOptions;
    self.db;
    self.formId;

    self.saveData = function () {
        self.basil.set(self.formId, self.db.data);
    }

    self.readData = function () {
        return self.basil.get(self.formId);
    }

    function initialize(formId, password) {
        self.formId = formId;
        //initialize model service and data model
        self.db = new modelService(formId);

        //listen for change in form inputs
        $("#" + formId + "").on('keyup change paste', ':input', function () {
            self.db.updateData($(this));
            self.saveData();
        });
    }

    initialize(formId, password);
}