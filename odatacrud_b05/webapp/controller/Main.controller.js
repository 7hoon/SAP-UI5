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

            },
            onCreate: function () {

            },
            onUpdate: function () {

            },
            onDelete: function () {

            }
        });
    });
