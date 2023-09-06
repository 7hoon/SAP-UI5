sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projectb0504.controller.Main", {
            onInit: function () {
                // var oDatas = {list : [
                //     {num1: 12, operator: 'test', num2: 13, result: 0}
                //   ]};
                // var oModel = new JSONModel(oDatas);
                var oModel = new sap.ui.model.json.JSONModel({list : [] });
                this.getView().setModel(oModel);
            },
            onAdd: function(){
                var oModel = this.getView().getModel(),
                     alist = oModel.getData().list;
                    //  debugger;
                    alist.push({});
            // alist.push({ Name: '', Address: '', Phone: '', Department: ''})
                oModel.setProperty("/list",alist);
            },
            onDelete: function(){
                var oTable = this.byId('idTable'),
                    oModel = this.getView().getModel(),             
                    aModelData = oModel.getProperty("/list"),
                    // aModelData = oModel.getData().list,
                    aIndex = oTable.getSelectedIndices();  
                    // aIndex = this.getView().byId("idTable").getSelectedIndices();

                    for (let index=aIndex.length-1; index>=0; index--) {
                        aModelData.splice(aIndex[index],1);
                    }

                    // oModel.setProperty('/list',aModelData);
                    oModel.setData({list: aModelData}, true);                   // 1 : set 데이터 객체, 2 : merge 여부
            },
            onRowActionDel: function(oEvent){
                var nSelectedIndex = oEvent.getParameter('row').getIndex();     // ex) 3
                // var nSelectedIndex = oEvent.getParameters().row.getIndex();
                var alist = this.getView().getModel().getData().list;         // 배열 데이터
                //    var alist = this.getView().getModel().getProperty("/list") 

                //.splice 를 통해 단 건 삭제 후 적용
                alist.splice(nSelectedIndex, 1);

                this.getView().getModel().setProperty("/list", alist);
                // this.getView().getModel().setData({list: alist}, true); 
            }
        });
    });
