/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

// 시스템 내에서 사용하는 경로 정보를 얻는다.
// 안에 들어가는 값은 manifest.json의 sap.app => ID (APP 내 기준 경로)
var _rootPath = jQuery.sap.getModulePath("zprojectb0509").split('/~')[0];
debugger;

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "zprojectb0509/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("zprojectb0509.Component", {
            metadata: {
                manifest: "json"
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
            }
        });
    }
);