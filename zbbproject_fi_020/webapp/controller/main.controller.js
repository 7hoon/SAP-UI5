sap.ui.define(
  ["sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment",
  "sap/ui/model/Filter"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Fragment, Filter) {
    "use strict";

    return Controller.extend("zbbprojectfi020.controller.main", {
      onInit: function () {
        this.getView().setModel(new JSONModel(), "view");
      },
      onPressOpenPopover: function (oEvent) {
        var oView = this.getView(),
          oSourceControl = oEvent.getSource();

        if (!this._pPopover) {
          this._pPopover = Fragment.load({
            id: oView.getId(),
            name: "zbbprojectfi020.view.fragment.Card",
          }).then(function (oPopover) {
            oView.addDependent(oPopover);
            return oPopover;
          });
        }

        this._pPopover.then(function (oPopover) {
          oPopover.openBy(oSourceControl);
        });
      },
      OnselectData: function(oEvent) {
        var oTable = this.byId("idTable")
        var oJSONModel = this.getView().getModel("view");
        var oModel = this.getOwnerComponent().getModel('FIT020');

        // oJSONModel.setProperty("/", oModel);
        var oPostpe = oEvent.getParameters().data[0].data.월;
        var aFilters = [];
    

        if (oPostpe){
            aFilters.push(
              new Filter({
                path: "Postpe",
                operator: "EQ",
                value1: oPostpe,
              }))
            }
            // oTable.getBinding("rows").filter(aFilters);
            // var sPath = oModel.createKey("/ZBB_FIT020Set", {
            //   });
            oModel.read("/ZBB_FIT020Set", {
                // filters: aFilters,
                success: function (oReturn) {
                    oJSONModel.setProperty("/", oReturn); 
                    // oJSONModel.setData(oReturn); 
                // or oModelJson.setData(oData.results); 
                },
                error: function (oError) {
                    console.log("Error 발생");
                  },
                })   
                debugger;
      },
    });
  }
);
