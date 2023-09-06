/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Test/project_b05_03/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
