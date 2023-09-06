sap.ui.define(
  ["sap/ui/core/mvc/Controller"
   ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("projectb0501.controller.Main", {
      onInit: function () {
      },
      onClick: function () {
        //   alert('버튼 클릭하였습니다.');
        // var oText = this.byId('idText'); // Text 객체 가져옴
        // var sText = oText.getText();  // Text 객체에서 text property 값을 가져옴
        // alert(sText);

        var oInput = this.byId("idInput");
        var sUserText = oInput.getValue();
        var oText = this.byId("idText");
        oText.setText(sUserText);
      },
    });
  }
);
