sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
      "use strict"; 
  
      return Controller.extend("sap.btp.ux410solving.controller.Detail", {
        onInit: function () {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter
            .getRoute("RouteDetail")
            .attachPatternMatched(this._patternMatched, this);
        },
        _patternMatched: function (oEvent) {
          var oParam = oEvent.getParameters().arguments; // paramOrder
          var oModel = this.getView().getModel(); // OData Model

        // this.getView().bindElement(`/Order_Details(OrderID=${oParam.paramOrder},ProductID=${oParam.param2})`); // ex) /Orders(10248)
         
          var sPath = oModel.createKey("/Order_Details", {
            'OrderID' : oParam.paramOrder,
            'ProductID' : oParam.param2
          }); // '/Order_Details(OrderID=10248,ProductID=11)'
          oModel.read(sPath, {
            success: function (oReturn) {
              var oModel = new sap.ui.model.json.JSONModel(oReturn);
              this.getView().setModel(oModel, "OrdersDetails");
            }.bind(this),
            error: function (oError) {},
          });
        }
      });
    }
  );
  