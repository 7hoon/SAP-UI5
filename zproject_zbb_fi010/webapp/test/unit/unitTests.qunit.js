/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zproject_zbb_fi010/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
