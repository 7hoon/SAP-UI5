sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("projectb0506.controller.Detail", {
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
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._patternMatched, this);
      },
      _patternMatched: function (oEvent) {
        // url 이 일치할때마다 실행
        // 파라미터로 받은 값들 가져오기
        var oParam = oEvent.getParameters().arguments; // paramOrder
        var oModel = this.getView().getModel();  // OData Model
      

        console.log(oParam.paramOrder);
        this.getView().bindElement(`/Orders(${oParam.paramOrder})`); // ex) /Orders(10248)
        // oParam 안에는 manifest.json 에 등록된
        // RouteDetail 의 Parameter 값들이 있음
        var sPath = oModel.createKey('/Orders',{
            OrderID : oParam.paramOrder
        });

        oModel.read(sPath, {
            urlParameters: {
                '$expand' : 'Order_Details'
            },
            success: function(oReturn){ 
                console.log(oReturn)
                console.log(oReturn.Order_Details);  // json data
                // JSON Data 를 JSON Model 에 넣어서 사용할 수 있다.
            },
            error: function(oError){}
        });

        debugger;
      },
      onNavMain: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteMain");
        // window.go(-1); // 뒤로가기. 구글링으로 확인 필요 - 자바스크립트 함수
      },
    });
  }
);
