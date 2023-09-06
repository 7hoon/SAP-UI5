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

    return Controller.extend("practiceb0501.controller.Main", {
      onInit: function () {
        // var oData = {
        //   SelectedProduct: "PLUS",
        //   ProductCollection: [
        //     {
        //       ProductId: "PLUS",
        //       Name: "+",
        //     },
        //     {
        //       ProductId: "MINUS",
        //       Name: "-",
        //     },
        //     {
        //       ProductId: "MULTIPLE",
        //       Name: "*",
        //     },
        //     {
        //       ProductId: "DIVISION",
        //       Name: "/",
        //     },
        //   ],
        //   list: [],
        //   iresult: "",
        //   Editable: true,
        //   Enabled: true,
        // };

        // var oModel = new JSONModel(oData);

        var oModel = new JSONModel(); // json data 를 포함한 json model 생성
        // oModel.loadData('/controller/viewData.json', true);         
        oModel.loadData("../model/viewData.json", {}, false); //  false 는 동기 처리, true는 비동기 처리
        this.getView().setModel(oModel, "main");
        console.log(oModel.getData());
      },
      onClick: function () {
        var oModel = this.getView().getModel("main"),
          oInput1 = Number(this.byId("idInput1").getValue()),
          oInput2 = Number(this.byId("idInput2").getValue()),
          operator = this.byId("idSelect").getSelectedItem().getText(),
          aList = oModel.getData().list,
          oresult = 0;

        switch (operator) {
          case "+":
            oresult = oInput1 + oInput2;
            break;
          case "-":
            oresult = oInput1 - oInput2;
            break;
          case "*":
            oresult = oInput1 * oInput2;
            break;
          case "/":
            oresult = oInput1 / oInput2;
            break;
        }
        //    aList = [{"nNum1": oInput1,
        //      "nNum2": oInput2,
        //      "oper": operator,
        //      "result": oresult}];
        //      aList.push({})
        // aList.unshift({"nNum1": oInput1,
        //          "nNum2": oInput2,
        //          "oper": operator,
        //          "result": oresult});
        aList.push({
          nNum1: oInput1,
          nNum2: oInput2,
          oper: operator,
          result: oresult,
        });
        oModel.setProperty("/iresult", oresult);

        oModel.setProperty("/list", aList);
      },
      onDelete: function () {
        var oModel = this.getView().getModel("main"),
          aModelData = oModel.getProperty("/list"),
          aIndex = this.getView().byId("idTable").getSelectedIndices();

        for (let index = aIndex.length - 1; index >= 0; index--) {
          aModelData.splice(aIndex[index], 1);
        }

        oModel.setProperty("/list", aModelData);
      },
      onRowActionDel: function (oEvent) {
        var nSelectedIndex = oEvent.getParameters().row.getIndex();
        var aList = this.getView().getModel("main").getData().list;

        aList.splice(nSelectedIndex, 1);

        this.getView().getModel("main").setProperty("/list", aList);
      },

      onOpenDialog: function () {
        // var oDialog = sap.ui.getCore().byId("idDialog");

        // if (oDialog) {
        //     oDialog.open();
        //     return;  // 함수 종료
        // }

        // if (oDialog) {
        //   oDialog.open();
        // } else {
        //   Fragment.load({
        //     name: "practiceb0501.fragment.HelloDialog",
        //     type: "XML",
        //     controller: this,
        //   }).then(function (oDialog) {
        //     oDialog.open();
        //   });
        // }

        /////////////////////////////////////////////////////////////////////////////

        var oDialog = this.byId("idDialog");

        if (oDialog) {
          oDialog.open();
        } else {
          this.loadFragment({
            name: "practiceb0501.fragment.HelloDialog",
            type: "XML"
          }).then(
            function (oDialog) {
              oDialog.open();
            }.bind(this)
          );
        }
      },
      onClose: function (oEvent) {
        /*
          getSource() : 이벤트를 일으킨 객체
          getParameters() : 이벤트 관련 정보
        */
        // var oDialog = sap.ui.getCore().byId("idDialog");
        // var oDialog = this.byId("idDialog");
        var oButton = oEvent.getSource();
        var oDialog = oButton.getEventingParent();
        // debugger;
        oDialog.close();
      },
      onOpenDialog2: function () {
        if (this.byId('idDialogView')) {
          this.byId('idDialogView').open();
        }
      }
    });
  }
);
