sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter) {
    "use strict";

    return Controller.extend("sap.btp.ux410solving.controller.Main", {
      onInit: function () {
        var oDatas = {
          typeList: [
            { type: "bar" },
            { type: "column" },
            { type: "line" },
            { type: "donut" },
          ],
        };
        var oModel = new JSONModel(oDatas);
        this.getView().setModel(oModel, "typeList");
      },
      onSearch: function () {
        var oColChart = this.getView().byId("idChart");
        var oComboBox2 = this.byId("idComboBox2");
        var oSelectComboBox2 = oComboBox2.getSelectedKey();
        var oComboBox = this.byId("idComboBox").getSelectedKey();
        if (oComboBox) {
          var oFilter = new Filter({
            path: "OrderID",
            operator: "EQ",
            value1: oComboBox,
          });
        }
        var oFlattenedDataset = this.byId("idFlattenedDataset");

        if (
          oSelectComboBox2 == "bar" ||
          oSelectComboBox2 == "column" ||
          oSelectComboBox2 == "line" ||
          oSelectComboBox2 == "donut"
        ) {
          oComboBox2.setValueState("None");
          oFlattenedDataset.getBinding("data").filter(oFilter);
          oColChart.setVizType(oSelectComboBox2);
        } else {
          oComboBox2.setValueState("Error");
        }
        
      },
      OnselectData: function(oEvent) {
        var sPath = oEvent.getParameters().data[0].data;
        var oRouter = this.getOwnerComponent().getRouter();

        oRouter.navTo("RouteDetail", {
          paramOrder: sPath.OrderID,
          param2 : sPath.ProductID
        });
      }
    });
  }
);
