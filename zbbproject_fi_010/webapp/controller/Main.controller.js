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

    return Controller.extend("zbbprojectfi010.controller.Main", {
      onInit: function () {
        // var oModel = this.getOwnerComponent().getModel();
        this.getView().setModel(new JSONModel(), "view");

      },
      onSearch: function () {
        var oTable = this.byId("idTable");
        var oInput1 = this.byId("idInput1");
        var oInput2 = this.byId("idInput2");

        var sInputValue1 = oInput1.getValue();
        var sInputValue2 = oInput2.getValue();

        var aFilters = [];

        if (sInputValue1) {
          aFilters.push(
            new Filter({
              path: "Dptid",
              operator: "Contains",
              value1: sInputValue1,
            })
          );
        }
        if (sInputValue2) {
          aFilters.push(
            new Filter({
              path: "Dptnm",
              operator: "Contains",
              value1: sInputValue2,
            })
          );
        }
        oTable.getBinding("items").filter(aFilters);
      },
      onCreate: function () {
        var oDataModel = this.getOwnerComponent().getModel();
        var oJSONModel = this.getView().getModel("view");

        var oBody = oJSONModel.getData(); // 생성할 데이터 구성
        // var oBody = oJSONModel.getProperty("/"); // 생성할 데이터 구성

        oDataModel.create("/ZBB_FIT060Set", oBody, {
          success: function (oReturn) {
            sap.m.MessageToast.show("데이터 생성 완료");
          },
          error: function (oError) {},
        });
      },

      // PUT : /EntitySetName('keyValue') + Body
      onUpdate: function () {
        var oDataModel = this.getOwnerComponent().getModel();
        var oJSONModel = this.getView().getModel("view");
        var oBody = oJSONModel.getData(); // 생성할 데이터 구성

        // 아래와 같이 별도 구성해도 됨.
        // var obj = {
        //   MB_NM: oBody.MB_NM,
        //   TELNO: oBody.TELNO,
        //   EMAIL: oBody.EMAIL,
        //   MB_ST: 'A'
        // };

        oDataModel.update(`/ZBB_FIT060Set('${oBody.Dptid}')`, oBody, {
          success: function (oReturn) {
            sap.m.MessageToast.show("데이터 변경 완료");
          },
          error: function (oError) {},
        });
        debugger;
      },

      // DELETE : /EntitySetName('keyValue')
      // onDelete: function () {
      //   var oDataModel = this.getView().getModel();
      //   var oTable = this.byId("idTable");
      //   var sValue = oTable.getSelectedContexts()[0].getObject().Dptid;

      //   var sPath = oDataModel.createKey("/ZBB_FIT060Set", {
      //     Dptid : sValue
      //   });

      //   oDataModel.remove(sPath,{
      //       success: function (oReturn) {
      //           sap.m.MessageToast.show("데이터가 삭제되었습니다.");
      //           oDataModel.refresh(true);   // optional) 모델 리프레시
      //         },
      //         error: function (oError) {}
      //   })
      // }
      onDelete: function () {
        var oDataModel = this.getOwnerComponent().getModel();
        var oTable = this.byId("idTable");
        var object = oTable.getSelectedContexts()[0].getObject();
        var oJSONModel = this.getView().getModel("view");
        var oBody = oJSONModel.getData(); // 생성할 데이터 구성

        oBody = {
          Dptid: object.Dptid,
          Dptnm: object.Dptnm,
          Delet: "D",
        };
        debugger;
        oDataModel.update(`/ZBB_FIT060Set('${oBody.Dptid}')`, oBody, {
          success: function (oReturn) {
            sap.m.MessageToast.show("데이터 변경 완료");
          },
          error: function (oError) {},
        });
      },
    });
  }
);
