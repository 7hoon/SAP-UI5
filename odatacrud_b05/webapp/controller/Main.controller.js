sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("odatacrudb05.controller.Main", {
            onInit: function () {
                var oModel = this.getOwnerComponent().getModel();             // manifest 에 등록된 component 단의 기본 데이터를 가져옴 
                
                // read   = GET 요청
                // create = POST 요청
                // update = PUT 요청
                // remove = DELETE 요청 
            },
            onRead: function () {
                
                var oEvent = this._onSelectionChange();
                var oDataModel = this.getOwnerComponent().getModel();
                var sPath = oDataModel.createKey("/MemberSet", {          
                    MB_ID : oEvent.MB_ID
                });     // "/MemberSet('10000001')"  와 동일 
                var oModel = this.getView().getModel();
                debugger;
                // 전체조회 (GET요청)
                oDataModel.read(sPath,{
                    success: function(oReturn) {
                        // var test = oModel.getObject;
                        debugger;
                    },
                    error: function(oError) {
                        console.log('Error 발생');
                    }
                });
            },
            onCreate: function () {

            },
            onUpdate: function () {

            },
            onDelete: function () {

            },
            _onSelectionChange: function (oEvent) {
                var sPath = oEvent.getParameters().rowContext.getObject();
                return oEvent;     
            }
        });
    });
