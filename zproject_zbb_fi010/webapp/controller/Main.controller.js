sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment",
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Filter, Fragment, FilterOperator) {
    "use strict";

    return Controller.extend("zprojectzbbfi010.controller.Main", {
      onInit: function () {
        var oModel = new sap.ui.model.json.JSONModel({
          list: [
            { Accclass: "A", text: "자산" },
            { Accclass: "L", text: "부채" },
            { Accclass: "C", text: "자본" },
            { Accclass: "PR", text: "수익" },
            { Accclass: "LO", text: "비용" },
          ],
        });
        this.getView().setModel(oModel, "main");
        var oDataModel = this.getOwnerComponent().getModel();
        debugger;
      },
      onSearch: function () {
        var oTable = this.byId("idTable");
        var oInput1 = this.byId("idInput1");
        var oInput2 = this.byId("idInput2");
        var oInput3 = this.byId("idInput3");
        var oInput4 = this.byId("idInput4");
        var sInputValue1 = oInput1.getValue();
        var sInputValue2 = oInput2.getValue();
        var sInputValue3 = oInput3.getValue();
        var sInputValue4 = oInput4.getValue();
        var aFilters = [];

        if (sInputValue1) {
          aFilters.push(
            new Filter({
              path: "Accclass",
              operator: "EQ",
              value1: sInputValue1,
            })
          );
        }
        if (sInputValue2) {
          aFilters.push(
            new Filter({
              path: "Accclassnm",
              operator: "EQ",
              value1: sInputValue2,
            })
          );
        }
        if (sInputValue3) {
          aFilters.push(
            new Filter({
              path: "Accclassnm2",
              operator: "EQ",
              value1: sInputValue3,
            })
          );
        }
        if (sInputValue4) {
          aFilters.push(
            new Filter({
              path: "Acctdes",
              operator: "EQ",
              value1: sInputValue4,
            })
          );
        }

        oTable.getBinding("items").filter(aFilters);
      },
      onValueHelpRequest: function (oEvent) {
        var sInputValue = oEvent.getSource().getValue(),
          oView = this.getView();
        debugger;
        if (!this._pValueHelpDialog) {
          this._pValueHelpDialog = Fragment.load({
            id: oView.getId(),
            name: "zprojectzbbfi010.view.fragment.Accclass",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            return oDialog;
          });
        }
        this._pValueHelpDialog.then(function (oDialog) {
          // Create a filter for the binding
          oDialog
            .getBinding("items")
            .filter([new Filter("Accclass", FilterOperator.Contains, sInputValue)]);
          // Open ValueHelpDialog filtered by the input's value
          oDialog.open(sInputValue);
        });
      },
      // onValueHelpSearch: function (oEvent) {
      //   var sValue = oEvent.getParameter("value");
      //   var oFilter = new Filter("Name", FilterOperator.Contains, sValue);

      //   oEvent.getSource().getBinding("items").filter([oFilter]);
      // },
      onValueHelpClose: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("selectedItem");
        oEvent.getSource().getBinding("items").filter([]);

        if (!oSelectedItem) {
          return;
        }

        this.byId("idInput1").setValue(oSelectedItem.getTitle());
      },
    });
  }
);
