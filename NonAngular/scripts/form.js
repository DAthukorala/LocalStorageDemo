$(function () {
    //initialize persistence service
    var service = new persistenceService("sampleForm", "dummy_passphrase");

    //fetch and show saved data
    $("#btnShowData").click(function () {
        var data = service.readData();
        $("#lblSavedData").text(JSON.stringify(data));
    });
})