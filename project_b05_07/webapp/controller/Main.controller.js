sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("projectb0507.controller.Main", {
      onInit: function () {
        this._setChartInView();
        this._SetChartInController();
      },
      _setChartInView: function () {
        var oData = {
          list: [
            { name: "aaa", rate: "35", cost: "10" },
            { name: "bbb", rate: "15", cost: "12" },
            { name: "ccc", rate: "10", cost: "11" },
            { name: "ddd", rate: "35", cost: "15" },
            { name: "eee", rate: "15", cost: "10" },
            { name: "fff", rate: "5", cost: "17" },
          ],
        };
        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "view");
      },
      _SetChartInController: function () {
        var oData = {
            sales: [
                { product: 'Jacket', amount: '65' },
                { product: 'Shirts', amount: '70' },
                { product: 'Pants', amount: '83' },
                { product: 'Coats', amount: '92' },
                { product: 'Purse', amount: '77' }
            ]
        }
        
        this.getView().setModel(new JSONModel (oData), "cont");

        // chart
        var oColChart = this.getView().byId("idChart");

        // detaset
        var oColDataset = new sap.viz.ui5.data.FlattenedDataset({
            data: { path: "cont>/sales" },
            dimensions: [{ name: "Product", value: "{cont>product}"}],
            measures: [{ name: "Amount", value: "{cont>amount}"}]
        });
        oColChart.setDataset(oColDataset);

        // feeds
        var oFeedItemValue = new sap.viz.ui5.controls.common.feeds.FeedItem({
            uid: "valueAxis",
            type: "Measure",
            values:["Amount"]
        });
        var oFeedItemCategory = new sap.viz.ui5.controls.common.feeds.FeedItem({
            uid: "categoryAxis",
            type: "Dimension",
            values:["Product"]
        });

        oColChart.addFeed(oFeedItemValue);
        oColChart.addFeed(oFeedItemCategory);
      },
    });
  }
);
