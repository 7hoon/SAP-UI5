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

    return Controller.extend("projectb0506.controller.Main", {
      formatter: {
        // formatter 객체 안에다 format function 들을 넣고 관리
        fnDateString: function (oDate) {
          // fnDateString => 날짜 객체를 yyyy-MM-dd 형태로 변경
          if (oDate) {
            var oDateTimeInstance =
              sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd",
              });

            return oDateTimeInstance.format(oDate);
          }
        }
      },
      onInit: function () {
        // var oDatas = {
        //   list: [{ Name: 12, Address: "test", Phone: 13, Department: 0 }],
        // };
        // var oModel = new JSONModel(oDatas);
        // sap.ui.getCore().setModel(oModel);
      },
      onValueHelp: function () {
        var oDialog = this.byId("idDialog");
        if (!oDialog) {
          this.loadFragment({
            name: "projectb0506.view.fragment.Order",
            type: "XML",
          }).then(
            function (oDialog) {
              oDialog.open();
            }.bind(this)
          );
        } else {
          oDialog.open();
        }

        // var oDialog = sap.ui.getCore().byId("idDialog");
        // var oModel = this.getView().getModel();
        // if (oDialog) {
        //   oDialog.open();
        // } else {
        //   Fragment.load({
        //     name: "projectb0506.view.fragment.Order",
        //     type: "XML",
        //     controller: this,
        //   }).then(function (oDialog) {
        //     oDialog.setModel(oModel);
        //     // sap.ui.getCore().setModel(oModel);
        //     oDialog.open();
        //   });
        // }
      },
      onClose: function (oEvent) {
        var oButton = oEvent.getSource();
        var oDialog = oButton.getParent();

        oDialog.close();
      },
    });
  }
);
