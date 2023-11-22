sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/f/library",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter, FilterOperator, fioriLibrary) {
    "use strict";

    return Controller.extend("zbbproject030.controller.Main", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter2 = this.getOwnerComponent();
        var oModel = new sap.ui.model.json.JSONModel();
        this.getView().setModel(oModel, "fclmodel");
      },
      onListItemPress: function (oEvent) {
        var oModel = this.getView().getModel("fclmodel");
        var oDatas = { age: "TwoColumnsMidExpanded" };
        oModel.setProperty("/age", oDatas);
        oModel = "TwoColumnsMidExpanded";

        var MatCdPath = oEvent.getSource().getSelectedItem();
        var MatCd = MatCdPath.getCells()[0].mProperties.title;
        var SuplId = MatCdPath.getCells()[1].mProperties.number;
        this.oRouter.navTo("RouteDetail", {
          paramMatCd: MatCd,
          param2: SuplId,
          param3: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
        });
      },
      onSearch: function (oEvent) {
        var oTableSearchState = [],
          sQuery = oEvent.getParameter("query");

        if (sQuery && sQuery.length > 0) {
          oTableSearchState = [
            new Filter("MatCd", FilterOperator.Contains, sQuery),
          ];
        }

        this.getView()
          .byId("productsTable")
          .getBinding("items")
          .filter(oTableSearchState, "Application");
      },
    });
  }
);
