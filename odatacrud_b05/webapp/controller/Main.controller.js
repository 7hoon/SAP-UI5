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

      // GET : /EntitySetName('keyValue')
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

      // POST : /EntitySetName + BODY정보(JSON Data)
      onCreate: function () {
        var oDataModel = this.getOwnerComponent().getModel();
        var oJSONModel = this.getView().getModel("view");
        
        
        var oBody = oJSONModel.getData(); // 생성할 데이터 구성
        var oBody = oJSONModel.getProperty("/"); // 생성할 데이터 구성
     
        oDataModel.create("/MemberSet", oBody, {
          success: function (oReturn) {
            sap.m.MessageToast.show("데이터 생성 완료");
          },
          error: function (oError) {},
        });
        // for (let i = 30; i < 41; i++) {
        //     var oInput = this.byId("idInput");
        //     oInput.setValue(i);
        //     var oDataModel = this.getOwnerComponent().getModel();
        //     var oJSONModel = this.getView().getModel("view");
        //     var oBody = oJSONModel.getData();
        //     oDataModel.create("/MemberSet", oBody, {success: function (oReturn) {
        //             sap.m.MessageToast.show("데이터 생성 완료");
        //           }
        //       });
        // }
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

        oDataModel.update(`/MemberSet('${oBody.MB_ID}')`, oBody, {
          success: function (oReturn) {
            sap.m.MessageToast.show("데이터 변경 완료");
          },
          error: function (oError) {},
        });
      },

      // DELETE : /EntitySetName('keyValue')
      onDelete: function () {
        var oDataModel = this.getView().getModel();
        var oTable = this.byId("idMemberSetTable");
        var sValue = oTable.getSelectedContexts()[0].getObject().MB_ID;
        
        var sPath = oDataModel.createKey("/MemberSet", {
            MB_ID : sValue
        });

        oDataModel.remove(sPath,{
            success: function (oReturn) {
                sap.m.MessageToast.show("데이터가 삭제되었습니다.");
                oDataModel.refresh(true);   // optional) 모델 리프레시
              },
              error: function (oError) {}
        })
      },
    });
  }
);
