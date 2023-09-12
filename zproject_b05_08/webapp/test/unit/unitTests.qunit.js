/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zproject_b05_08/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
