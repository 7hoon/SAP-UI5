sap.ui.define(
  ["sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("Test.projectb0503.controller.Main", {
      onInit: function () {
        this.byId("idNum2").setValue("테스트");
        var oDatas = { "name" : "kim chi hoon",
                       "title" : "제목",
                        list : [
                          // {num1: 12, operator: 'test', num2: 13, result: 0},
                          // {num1: 12, operator: 'test', num2: 13},
                          // {num1: 12, operator: 'test', num2: 13},
                          // {num1: 12, operator: 'test', num2: 13},
                          // {num1: 12, operator: 'test', num2: 13},
                          // {num1: 12, operator: 'test', num2: 13}

                          // {"phone" : "010-4859-2346", "home" : "서울종로구"},
                          // {"phone" : "010-4567-3675", "home" : "서울동대문구"},
                          // {"phone" : "010-1234-5678", "home" : "서울강남구"}
                        ],
                        "age" : "25",
                        obj : {key: 'valueable'}    };  // json data 생성
          var oModel = new JSONModel(oDatas);   // json data 를 포함한 json model 생성
          // var oModel = new sap.ui.model.json.JSONModel(oDatas);
          this.getView().setModel(oModel, "main");     // json model을 view 에서 사용할 수 있도록 세팅
      },
      onClick: function () {
        //   alert('버튼 클릭하였습니다.');
        var nNum1 = this.getView().byId("idNum1").getValue(),
          nNum2 = this.byId("idNum2").getValue(),
          oSelect = this.byId("idSelect"),
          oText = this.byId("idResult"),
          nResult = 0;

        nNum1 = Number(nNum1);
        nNum2 = Number(nNum2);

        // debugger; // 개발자도구를 킨 상태에서 동작

        switch (oSelect.getSelectedKey()) {
          case "PLUS":
            nResult = nNum1 + nNum2;
            break;
          case "MINUS":
            nResult = nNum1 - nNum2;
            break;
          case "MULTIPLE":
            nResult = nNum1 * nNum2;
            break;
          case "DIVISION":
            if (!nNum2) {
              return this.byId("idNum2").fireEvent("change");
              // return this.onChange()
            }
            nResult = nNum1 / nNum2;
            break;
        }

        oText.setText(nResult);

        this.onAdd({result : nResult,
                    num1 : nNum1,
                    num2 : nNum2,
                    oper : oSelect.getSelectedKey()});

        // var oText = this.byId("idText");
        // var oSelect = this.byId("idSelect");
        // var oInput = this.byId("idInput");
        // var oInput2 = this.byId("idInput2");
        // var sUserText = oInput.getValue();
        // var sUserText2 = oInput2.getValue();
        // var value;
        // var oSel = oSelect.getSelectedItemIHd();
        // switch (oSel) {
        //   case "__item2":
        //     value = Number(sUserText) + Number(sUserText2);
        //     break;
        //   case "__item3":
        //     value = Number(sUserText) - Number(sUserText2);
        //     break;
        //   case "__item4":
        //     value = Number(sUserText) * Number(sUserText2);
        //     break;
        //   case "__item5":
        //     value = Number(sUserText) / Number(sUserText2);
        //     break;
        //   default:
        //     break;
        // }

        // oText.setText(value);

        // var oSelect = this.byId('idselect');
        // var Operlater = oSelect.getSelectedKey();

        // var oInput1 = this.byId('idInput1'),
        //     oInput2 = this.byId('idInput2');

        // var sInput1 = parseInt(oInput1.getValue()),
        //     sInput2 = parseInt(oInput2.getValue());

        // var oText = this.byId('idText');

        // var sResult = 0;

        // if(Operlater === 'PLUS'){
        //     sResult = sInput1 + sInput2;
        // }

        // else if (Operlater === 'MINUS'){
        //     sResult = sInput1 - sInput2;
        // }

        // else if (Operlater === 'MULTIPLE'){
        //     sResult = sInput1 * sInput2;
        // }

        // else if (Operlater === 'DIVISION'){
        //     sResult = sInput1 / sInput2;
        // }

        // oText.setText("결과: " + sResult);
      },
      onChange: function (oEvent) {
        var nNum = Number(this.byId("idNum2").getValue()),
          // var nNum = parseInt(oEvent.getParameters().value),
          nNum2 = this.byId("idNum2"),
          oButton = this.byId("idButton"),
          skey = this.byId("idSelect").getSelectedKey();
        if (!nNum && skey === "DIVISION") {
          // 입력값이 없거나 0이면 에러 상태로 변경
          console.log(nNum);
          nNum2.setValueState("Error");
          oButton.setEnabled(false);
        } else {
          nNum2.setValueState("None");
          oButton.setEnabled();
        }
      },
      onAdd: function(result){
        
        var oModel = this.getView().getModel("main"), // main 모델 가져오기
            // alist = oModel.getData(),  // 전체 데이터 가져오기
            // alist = oModel.getData().list,  // list 배열 데이터 가져오기
            // alist2 = oModel.getProperty("/");   // 전체 데이터 가져오기 
            alist2 = oModel.getProperty("/list"),   // list 배열 데이터 가져오기
            // nNum1 = this.getView().byId("idNum1").getValue(),
            // nNum2 = this.byId("idNum2").getValue(),
            oSelect = this.byId("idSelect");

        // debugger;

        /*
          alist2 에 새로운 데이터를 추가해야 한다.
          데이터 구조의 예시는 다음과 같다.
          => { num1:20, operator: 'new data', num: 52, result: 결과}

          사용자가 입력한 계산식을
          alist2 에 추가하여 모델에 반영시키도록 한다.
        */
       

        alist2.push({
          num1 : result.num1,
          operator : oSelect.getSelectedItem().getText(),  // operator : result.oper, 
          num2 : result.num2,
          result : result.result
        });
        // alist2.push({ num1: nNum1, operator: oSelect.getSelectedKey(), num2: nNum2, result: result})
        oModel.setProperty("/list",alist2)
      }
    });
  }
);
