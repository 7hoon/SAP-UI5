sap.ui.define([
    "sap/ui/core/mvc/Controller"
    ,
    "sap/ui/model/Filter",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter) {
        "use strict";

        return Controller.extend("zbbprojectfi010.controller.Main", {
            onInit: function () {

            },
            onSearch: function () {
                var oTable = this.byId("idTable");
                var oInput1 = this.byId("idInput1");
                var oInput2 = this.byId("idInput2");
                
                var sInputValue1 = oInput1.getValue();
                var sInputValue2 = oInput2.getValue();
                
                var aFilters = [];
        
                if (sInputValue1) { 
                  aFilters.push(
                    new Filter({
                      path: "Dptid",
                      operator: "EQ",
                      value1: sInputValue1,
                    })
                  );
                }
                if (sInputValue2) {
                  aFilters.push(
                    new Filter({
                      path: "Dptnm",
                      operator: "EQ",
                      value1: sInputValue2,
                    })
                  );
                }
                oTable.getBinding("items").filter(aFilters);
              }
        });
    });
