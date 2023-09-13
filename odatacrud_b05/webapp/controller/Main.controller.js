sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("odatacrudb05.controller.Main", {
      onInit: function () {
        var oModel = this.getOwnerComponent().getModel(); // manifest 에 등록된 component 단의 기본 데이터를 가져옴

        // read   = GET 요청
        // create = POST 요청
        // update = PUT 요청
        // remove = DELETE 요청

        // JSONModel 이름 : view
        this.getView().setModel(new JSONModel(), "view");
      },
      onRead: function () {
        var oJSONModel = this.getView().getModel("view"); // JSONModel
        var oItem = this.byId("idMemberSetTable")
          .getSelectedContexts()[0]
          .getObject();
        // var oItem = this.byId("idMemberSetTable").getSelectedItem().getBindingContext().getObject();
        var oDataModel = this.getOwnerComponent().getModel(); // ODataModel
        var sValue = oItem.MB_ID;

        var sPath = oDataModel.createKey("/MemberSet", {
          MB_ID: sValue,
          // MB_ID: '10000001',
        }); // "/MemberSet('10000001')"  와 동일
        // 전체조회 (GET요청)
        debugger;
        oDataModel.read(sPath, {
          success: function (oReturn) {
            // 읽어온 데이터를 JSONModel에 세팅
            oJSONModel.setProperty("/", oReturn); // 전체 데이터를 oReturn 으로 변경
            // oJSONModel.getProperty("/");
          },
          error: function (oError) {
            console.log("Error 발생");
          },
        });
      },
      onCreate: function () {
        var oDataModel = this.getOwnerComponent().getModel();
        var oJSONModel = this.getView().getModel("view");
        var oBody = oJSONModel.getData();  // 생성할 데이터 구성
        // var oBody = oJSONModel.getProperty("/"); // 생성할 데이터 구성
        debugger;
        oDataModel.create("/MemberSet", oBody, {
          success: function (oReturn) {
            debugger;
          },
          error: function (oError) {},
        });
      },
      onUpdate: function () {},
      onDelete: function () {},
    });
  }
);
