sap.ui.define(
  ["sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment",
  "sap/ui/model/Filter"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Fragment, Filter) {
    "use strict";

    return Controller.extend("zbbprojectfi020.controller.main", {
      onInit: function () {
        this.getView().setModel(new JSONModel(), "view");
        this.getView().setModel(new JSONModel(), "view2");
      },
      onPressOpenPopover: function (oEvent) {
        var oView = this.getView(),
          oSourceControl = oEvent.getSource();

        if (!this._pPopover) {
          this._pPopover = Fragment.load({
            id: oView.getId(),
            name: "zbbprojectfi020.view.fragment.Card",
          }).then(function (oPopover) {
            oView.addDependent(oPopover);
            return oPopover;
          });
        }

        this._pPopover.then(function (oPopover) {
          oPopover.openBy(oSourceControl);
        });
      },
      OnselectData: function(oEvent) {
        var oTable = this.byId("idTable")
        var oJSONModel = this.getView().getModel("view");
        var oModel = this.getOwnerComponent().getModel('FIT020');
        var aFilters = [];
        // oJSONModel.setProperty("/", oModel);
        var oPostpe = oEvent.getParameters().data[0].data.월;
        
        if (oPostpe){
          aFilters.push(
            new Filter({
              path: "Postpe",
              operator: "EQ",
              value1: oPostpe,
            }))
          }
        // oJSONModel.setProperty("/", oModel);
            oModel.read("/ZBB_FIT020Set", {
                filters: aFilters,
                success: function (oReturn) {
                    oJSONModel.setProperty("/", oReturn); 
                    // debugger;
                    // oJSONModel.setData(oReturn); 
                },
                error: function (oError) {
                    console.log("Error 발생");
                  },
                })   
               
      },
      OnrowSelectionChange: function(oEvent){
        /*
         getSource() : 이벤트를 일으킨 객체
         getParameters() : 이벤트 관련 정보
       */
         // var sPath = oEvent.getParameters().rowContext.getPath();
         // var oModel = this.getView().getModel();
         // var oItem = oModel.getProperty(sPath);
         // var oInput = this.byId("idInput");
         // oInput.setValue(oItem.OrderID);
         var sPath = oEvent.getParameters().rowContext.getObject();
         debugger;
         var oJSONModel = this.getView().getModel("view2");
         var oModel = this.getOwnerComponent().getModel('FIT090');
         var aFilters = [];
         // oJSONModel.setProperty("/", oModel);
         var oSlipno = sPath.Slipno;
         
         if (oSlipno){
           aFilters.push(
             new Filter({
               path: "Slipno",
               operator: "EQ",
               value1: oSlipno,
             }))
           }
         // oJSONModel.setProperty("/", oModel);
             oModel.read("/ZBB_FIT090Set", {
                 filters: aFilters,
                 success: function (oReturn) {
                     oJSONModel.setProperty("/", oReturn); 
                     // debugger;
                     // oJSONModel.setData(oReturn); 
                 },
                 error: function (oError) {
                     console.log("Error 발생");
                   },
                 })   
     },
    });
  }
);
