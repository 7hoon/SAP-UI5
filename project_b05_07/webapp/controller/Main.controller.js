sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projectb0507.controller.Main", {
            onInit: function () {
                var oData = {
                        list : [
                          {name:'aaa' , rate:'35', cost:'10'},
                          {name:'bbb' , rate:'15', cost:'12'},
                          {name:'ccc' , rate:'10', cost:'11'},
                          {name:'ddd' , rate:'35', cost:'15'},
                          {name:'eee' , rate:'15', cost:'10'},
                          {name:'fff' , rate:'5', cost:'17'}
                        ],}; 
          var oModel = new JSONModel(oData);
          this.getView().setModel(oModel, "view");
            }
        });
    });
