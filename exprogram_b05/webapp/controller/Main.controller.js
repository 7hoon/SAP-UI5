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

    return Controller.extend("exam.exprogramb05.controller.Main", {
      onInit: function () {
        var list = {
          currencyList: [{ code: "USD" }, { code: "EUR" }, { code: "KRW" }],
        };
        var oModel = new JSONModel(list);
        this.getView().setModel(oModel, "currencyList");
      },
      // Search 버튼 구현
      onSearch: function () {                                 
        var oTable = this.byId("idTable");
        var oComboBox = this.byId("idComboBox");
        var oInput = this.byId("idInput");
        var sInputValue = oInput.getValue();
        var oSelectKey = oComboBox.getSelectedKey();
        var aFilters = [];

        if (oSelectKey) {
          aFilters.push(
            new Filter({
              path: "Currcode",
              operator: "EQ",
              value1: oSelectKey,
            })
          );
        }
        if (sInputValue) {
          aFilters.push(
            new Filter({
              path: "Carrname",
              operator: "Contains",
              value1: sInputValue,
            })
          );
        }

        oTable.getBinding("items").filter(aFilters);
      },
      // 예약 현황 버튼 구현
      onDialog: function (oEvent) {
        var oParam = oEvent.getParameter("id").substr(73, 3);
        // oEvent.getSource().getBindingContext().getPath();   이렇게 하면 버튼값의 path 값을 구할 수 있다.
        var oTable = this.byId("idTable");
        var sPath = oTable.getItems()[oParam].getBindingContext().getPath();
        var oModel = this.getView().getModel();
        var oDialog = this.byId("idDialog");

        if (!oDialog) {
          this.loadFragment({
            name: "exam.exprogramb05.view.fragment.Connid",
            type: "XML",
          }).then(
            function (oDialog) {
              oDialog.open();
            }.bind(this)
          );
        } else {
          oDialog.open();
        }
        oModel.read(sPath, {
          urlParameters: {
            $expand: "to_Item",
          },
          success: function (oReturn) {
            console.log(oReturn);
            console.log(oReturn.to_Item);
            var oModel = new sap.ui.model.json.JSONModel(oReturn);
            this.getView().setModel(oModel, "toItem");
          }.bind(this),
          error: function (oError) {}
        });
      },
      // dialog 닫기 버튼
      onClose: function (oEvent) {
        var oButton = oEvent.getSource();
        var oDialog = oButton.getEventingParent();

        oDialog.close();
      },
      // 항공편 예약 상세 버튼 구현
      onNavto: function () {
        var oTable = this.byId("idTable");
        // oTable.getSelectedItem().getBindingContext().getObject()
        var oData = oTable.getSelectedContexts()[0].getProperty();
        var oRouter = this.getOwnerComponent().getRouter();

        oRouter.navTo("RouteDetail", {
          paramOrder: oData.Carrid,
        });
      },
    });
  }
);
