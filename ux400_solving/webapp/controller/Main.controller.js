sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("sap.btp.ux400solving.controller.Main", {
      formatter: {
        transformDiscontinued: function (Discontinued) {
          if (Discontinued) {
            return "Yes";
          } else {
            return "No";
          }
        },
      },
      onInit: function () {
        var oDatas = { list: [] };
        var oModel = new JSONModel(oDatas);
        this.getView().setModel(oModel, "list");
      },
      onRandomPress: function () {
        var randomNumber = Math.floor(Math.random() * 100) + 1;
        var oInput = this.byId("idInput");

        oInput.setValue(randomNumber);
        oInput.setValueState("None");

        this.onAdd({ num: randomNumber });
      },
      onAdd: function (nNum) {
        var oModel = this.getView().getModel("list");
        var alist = oModel.getProperty("/list");
        
        alist.push({
          value: nNum.num,
        });
        oModel.setProperty("/list", alist);
      },
      onOpenProduct: function () {
        var oDialog = sap.ui.getCore().byId("idDialog");
        var oModel = this.getView().getModel("oData");
        if (oDialog) {
          oDialog.open();
        } else {
          Fragment.load({
            name: "sap.btp.ux400solving.view.fragment.Products",
            type: "XML",
            controller: this,
          }).then(function (oDialog) {
            oDialog.setModel(oModel, "oData");
            oDialog.open();
          });
        }
      },
      onClose: function (oEvent) {
        var oButton = oEvent.getSource();
        var oDialog = oButton.getParent();

        oDialog.close();
      },
      onValueChange: function () {
        var oInput = this.byId("idInput");
        var nNum = oInput.getValue();
        if (nNum <= 100 && nNum >= 1) {
          this.onAdd({ num: nNum });
          oInput.setValueState("None");
        } else {
          oInput.setValueState("Error");
          oInput.setValueStateText("1이상 100이하의 숫자를 입력하세요");
        }
      },
    });
  }
);
