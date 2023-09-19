sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("zprojectb0509.controller.Main", {
            onInit: function () {

            },
            onValueHelp: function () {
                var oDialog = sap.ui.getCore().byId("idDialog");
                var oModel = this.getView().getModel('scarr');
                if (oDialog) {
                  oDialog.open();
                } else {
                  Fragment.load({
                    name: "zprojectb0509.view.fragment.Scarr",
                    type: "XML",
                    controller: this,
                  }).then(function (oDialog) {
                    oDialog.setModel(oModel, 'scarr');
                    oDialog.open();
                  });
                }
              },
              onClose: function (oEvent) {
                var oButton = oEvent.getSource();
                var oDialog = oButton.getEventingParent();
        
                oDialog.close();
              }
        });
    });
