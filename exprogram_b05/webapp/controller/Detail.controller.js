sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter) {
    "use strict";

    return Controller.extend("exam.exprogramb05.controller.Detail", {
      formatter: {
        // FLDATE 필드 "yyyy-MM-dd" 형태로 변환
        fnDateString: function (oDate) {
          if (oDate) {
            var oDateTimeInstance =
              sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd",
              });
            return oDateTimeInstance.format(oDate);
          }
        },
      },
      onInit: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._patternMatched, this);
      },
      _patternMatched: function (oEvent) {
        var oParam = oEvent.getParameters().arguments;
        var oModel = this.getView().getModel();
        var sPath = oModel.createKey("/carrierSet", {
          Carrid: oParam.paramOrder,
        });
        oModel.read(sPath, {
          urlParameters: {
            $expand: "to_Flight",
          },
          success: function (oReturn) {
            var oModel = new sap.ui.model.json.JSONModel(oReturn);
            this.getView().setModel(oModel, "toFlight");
          }.bind(this),
          error: function (oError) {}
        });
      },
      // 뒤로가기 버튼 
      onNavMain: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteMain");
      },
    });
  }
);
