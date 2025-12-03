/*global QUnit*/

sap.ui.define([
	"com/sap/demo/zdocview/controller/docView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("docView Controller");

	QUnit.test("I should test the docView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
