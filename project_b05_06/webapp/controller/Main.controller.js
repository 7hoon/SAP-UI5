sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter", //검색기능 구현할 때
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Fragment, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("projectb0506.controller.Main", {
      formatter: {
        // formatter 객체 안에다 format function 들을 넣고 관리
        fnDateString: function (oDate) {
          // fnDateString => 날짜 객체를 yyyy-MM-dd 형태로 변경
          if (oDate) {
            var oDateTimeInstance =
              sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd",
              });

            return oDateTimeInstance.format(oDate);
          }
        },
      },
      onInit: function () {
        // var oDatas = {
        //   list: [{ Name: 12, Address: "test", Phone: 13, Department: 0 }],
        // };
        // var oModel = new JSONModel(oDatas);
        // sap.ui.getCore().setModel(oModel);
      },
      onValueHelp: function () {
        var oDialog = this.byId("idDialog");
        if (!oDialog) {
          this.loadFragment({
            name: "projectb0506.view.fragment.Order",
            type: "XML",
          }).then(
            function (oDialog) {
              oDialog.open();
            }.bind(this)
          );
        } else {
          oDialog.open();
        }

        // var oDialog = sap.ui.getCore().byId("idDialog");
        // var oModel = this.getView().getModel();
        // // var oModel = sap.ui.getCore().getView().getModel();
        // if (oDialog) {
        //   oDialog.open();
        // } else {
        //   Fragment.load({
        //     name: "projectb0506.view.fragment.Order",
        //     type: "XML",
        //     controller: this,
        //   }).then(function (oDialog) {
        //     oDialog.setModel(oModel);
        //     // sap.ui.getCore().setModel(oModel);
        //     oDialog.open();
        //   });
        // }
      },
      onValueHelp2: function () {
        // var oDialog = this.byId("idDialog2");
        // if (!oDialog) {
        //   this.loadFragment({
        //     name: "projectb0506.view.fragment.CustomerID",
        //     type: "XML",
        //   }).then(
        //     function (oDialog) {
        //       oDialog.open();
        //     }.bind(this)
        //   );
        // } else {
        //   oDialog.open();
        // }

        var oDialog = sap.ui.getCore().byId("idDialog2");
        var oModel = this.getView().getModel();
        if (oDialog) {
          oDialog.open();
        } else {
          Fragment.load({
            name: "projectb0506.view.fragment.CustomerID",
            type: "XML",
            controller: this,
          }).then(function (oDialog) {
            oDialog.setModel(oModel);
            oDialog.open();
          });
        }
      },
      onClose: function (oEvent) {
        var oButton = oEvent.getSource();
        var oDialog = oButton.getParent();

        oDialog.close();
      },
      onBeforeOpen: function () {
        // var oTable = sap.ui.getCore().byId("idOrderTable");
        var oTable = this.byId("idOrderTable");
        
        var aFilters = [
          new Filter({
            path: "EmployeeID",
            operator: "GE", // FilterOperator.GE
            value1: 4,
          }),
          new Filter({
            path: "CustomerID",
            operator: "Contains", // FilterOperator.Contains
            value1: "R",
          }),
        ];
        var oFilter = new Filter({
          path: "EmployeeID",
          operator: "GE",
          value1: 4,
        });
        // oTable의 rows에 바인딩된 정보를 가져와서
        // 바인딩 정보 중 filter 안에 필터 객체를 추가
        // -> 이 때 filter() 안에는 Object 또는 Array 형태가 들어 갈 수 있음
        // oTable.getBinding('rows').filter() => 이렇게 하면 필터 초기화

        oTable.getBinding("rows").filter(aFilters);
      },
      onSearch: function () {
        var oTable = this.byId("idProductsTable");
        // var oInput = this.byId("idInput");
        var sValue = this.byId("idInput").getValue();
        var sValue2 = this.byId("idInput2").getValue();
     
        // if (sValue) {
        //   var oFilter = new Filter({
        //     path: "OrderID",
        //     operator: "EQ",
        //     value1: sValue,
        //   });
        // }
        
        if (sValue){
        var aFilters = [
          new Filter({
            path: "OrderID",
            operator: "EQ",
            value1: sValue,
          })
        ];
        }else if(sValue2){
          var aFilters = [
          new Filter({
            path: "CustomerID",
            operator: "EQ", 
            value1: sValue2,
          })
        ];
        }else if(sValue && sValue2){
         var aFilters = [
            new Filter({
              path: "OrderID",
              operator: "EQ",
              value1: sValue,
            }),
            new Filter({
              path: "CustomerID",
              operator: "EQ",
              value1: sValue2,
            })
          ]
        }

        oTable.getBinding("items").filter(aFilters);

        function random(number) {
          return Math.floor(Math.random() * (number + 1));
        };
          const rndCol =
            "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
          document.body.style.backgroundColor = rndCol;
        
      },
      onNavDetail: function () {
        // Detail.view.xml 화면으로 이동
        var oRouter = this.getOwnerComponent().getRouter();
        // oRouter.navTo(/* 라우트 객체 이름 */);
        oRouter.navTo("RouteDetail", {
          paramOrder: "OrderID",
          // param2 : 'Option'
        });
      },
      onSelectionChange: function (oEvent) {
        var sPath = oEvent.getParameters().listItem.getBindingContextPath();
        var oModel = this.getView().getModel();
        var oItem = oModel.getProperty(sPath);

        var oRouter = this.getOwnerComponent().getRouter();
        // oRouter.navTo(/* 라우트 객체 이름 */);
        oRouter.navTo("RouteDetail", {
          paramOrder: oItem.OrderID,
          // param2 : oParam.OrderID
        });
        // OdataModel.getProperty(경로) 해서 해당 Row의 전체 데이터 가져오기
        // =>  전체데이터.OrderID 를 통해 OrderID 값을 얻을 수 있다.

        // Detail 화면으로 이동
        // => 이동 시, 해당 OrderID를 필수 파라미터로 포함

        // <테스트 방법>
        // Detail 라우터의 URL에 OrderID 값이 잘 들어오는지 확인
      },
    });
  }
);