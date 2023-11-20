sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/ui/core/mvc/Controller"],
  function (JSONModel, Controller) {
    "use strict";

    return Controller.extend("zbbproject030.controller.Detail", {
      onInit: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._patternMatched, this);
      },
      _patternMatched: function (oEvent) {
        debugger;
        var oParam = oEvent.getParameters().arguments; // paramOrder
        debugger;
        var oModel = this.getView().getModel("ZBB_MMT010_SRV"); // OData Model

        // this.getView().bindElemenrt(`/Order_Details(OrderID=${oParam.paramOder},ProductID=${oParam.param2})`); // ex) /Order_Details(OrderID=10248,ProductID=11)

        var sPath = oModel.createKey("/ZBB_MMT010Set", {
          MatCd: oParam.paramMatCd,
        }); // '/Order_Details(OrderID=10248,ProductID=11)'
        oModel.read(sPath, {
          success: function (oReturn) {
            var oModel = new sap.ui.model.json.JSONModel(oReturn);
            this.getView().setModel(oModel, "MatCdDetails");
          }.bind(this),
          error: function (oError) {},
        }); // Odata모델을 Json 모델로 다루는법
      },
    });
  }
);
