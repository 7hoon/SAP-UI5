/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "zbbproject030/model/models",
    "sap/ui/model/json/JSONModel",
    "sap/f/library",
  ],
  function (UIComponent, Device, models, JSONModel, fioriLibrary) {
    "use strict";

    return UIComponent.extend("zbbproject030.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {

        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);


        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
      },
    });
  }
);
