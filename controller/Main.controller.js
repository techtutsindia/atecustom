sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sit.mng.mtng.controller.Main", {

    onInit : function()
    {
        if (sap.ui.Device.support.touch === false)
        {
            this.getView().addStyleClass("sapUiSizeCompact");
        }
    }
	});

});