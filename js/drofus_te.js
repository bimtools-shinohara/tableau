(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Setup Basic Authentication Header
    $.ajaxSetup({
        headers: {'Authorization': "Basic " + btoa("te_building/01/ayam/en" + ":" + "s540918A")}
    });

    // Setup tableau Basic Authentication
    myConnector.init = function(initCallback) {

        tableau.authType = tableau.authTypeEnum.basic;
        initCallback();
        tableau.username = btoa("te_building/01/ayam/en");
        tableau.password = btoa("s540918A");
        
    };

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "room_func_no",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "architect_no",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "note",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "drawing_no",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "user_room_no",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "drawing_name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "deleted",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "programmed_area",
            dataType: tableau.dataTypeEnum.float
        }, {           
            id: "designed_area",
            dataType: tableau.dataTypeEnum.float
        }, {           
            id: "perimeter",
            dataType: tableau.dataTypeEnum.float
        }, {           
            id: "ceiling_height",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "room_function_id",
            dataType: tableau.dataTypeEnum.string
        }, {                              
            id: "created",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "drofus_te_bldg",
            alias: "Rofus TE Bulding Rooms",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    
    // Download the data
    myConnector.getData = function(table, doneCallback) {
      
        $.getJSON("https://api-au.drofus.com/api/rooms", function(resp) { 

            var resp2 = JSON.parse(JSON.stringify(resp)),
            tableData = [];

            // Iterate over the JSON object 
            console.log(resp2.length);
            for (var i = 0, len = resp2.length; i < len; i++) {
                tableData.push({
                    "id":               resp2[i].id,
                    "room_func_no":     resp2[i].room_func_no,
                    "architect_no":     resp2[i].architect_no,
                    "name":             resp2[i].name,
                    "description":      resp2[i].description,
                    "note":             resp2[i].note,
                    "drawing_no":       resp2[i].drawing_no,
                    "user_room_no":     resp2[i].user_room_no,
                    "drawing_name":     resp2[i].drawing_name,
                    "deleted":          resp2[i].deleted,
                    "programmed_area":  resp2[i].programmed_area,
                    "designed_area":    resp2[i].designed_area,
                    "perimeter":        resp2[i].perimeter,
                    "ceiling_height":   resp2[i].ceiling_height,
                    "room_function_id": resp2[i].room_function_id,
                    "created":          resp2[i].created
                });
            }
            table.appendRows(tableData);
            doneCallback();
        }); 
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionData = null;
            tableau.connectionName = "dRofus TE Bulding Rooms"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
