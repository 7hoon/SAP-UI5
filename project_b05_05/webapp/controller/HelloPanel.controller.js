sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("projectb0505.controller.helloPanel", {
            onInit: function () {

            },
            // onShowHello: function(){
            //     sap.m.MessageToast.show('Hello Panel Click');
            // },
            onShowHello: 
                function () {
                    // var that = this;
                    sap.m.MessageBox.success("버튼이 클릭되었습니다.", {
                        title: "Success",                                    // default
                        onClose: function (oAction) { 
                            switch (oAction) {
                                case 'YES':
                                    // sap.m.MessageToast.show('YES Click');
                                    // that.afterSuccess();
                                    this.afterSuccess();
                                    break;
                                case 'NO' :
                                    sap.m.MessageToast.show('NO Click');
                                    break;
                            }
                         }.bind(this),
                        styleClass: "",                                      // default
                        initialFocus: null,                                  // default
                        textDirection: sap.ui.core.TextDirection.Inherit,     // default
                        
                        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                        emphasizedAction: MessageBox.Action.YES,
                    });
                },
                afterSuccess : function() {
                    sap.m.MessageToast.show('생성 후 로직');
                }  
        });
    });
