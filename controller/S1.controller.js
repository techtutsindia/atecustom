sap.ui.define([
     "sap/ui/core/mvc/Controller",
     "sap/ui/model/json/JSONModel",
     "sap/m/MessageBox",
     "sap/ui/model/Filter"
], function(Controller, JSONModel,MessageBox,Filter) {
      "use strict";

      return Controller.extend("sit.mng.mtng.controller.S1", {    
    	  
    	       
      
onInit:function(){
	
     var that = this;     
     sap.ui.core.UIComponent.getRouterFor(that).attachRouteMatched(that.handleRouteMatch,that);
     
},

handleRouteMatch:function(){
	
	/*var url = "proxy/http/edva.yamsteel.com:8000/sap/opu/odata/sap/FAR_BAD_DEBT_RESERVE_SRV";
	var oModel = new sap.ui.model.odata.ODataModel(url);
	this.getView().setModel(oModel);*/
	
	var oBusyDialog = new sap.m.BusyDialog();
	oBusyDialog.open();
		
	var that=this;
	var mainModel = this.getOwnerComponent().getModel();
	var oTablesetModel = new sap.ui.model.json.JSONModel();
	this.getView().setModel(oTablesetModel,"TableSetModel");
	
	//Used for only and filter
	/*var filter1 = new sap.ui.model.Filter("begda", sap.ui.model.FilterOperator.EQ, "2019-09-12T00:00:00");
      var filter2 = new sap.ui.model.Filter("stat2", sap.ui.model.FilterOperator.EQ, "3");
      var filterArr=[filter1, filter2];*/
    
	// Not required
   /* var finalFilter = new sap.ui.model.Filter({
        filters: filterArr,
        and: true
       })
*/
	
	//Example for multiple filters
	/*var andFilter = [];
	var orFilter = [];
	orFilter.push(new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Equal, "filtervalue"));
	orFilter.push(new sap.ui.model.Filter("status", sap.ui.model.FilterOperator.Equal, "filtervalue"));
	andFilter.push(new sap.ui.model.Filter(orFilter, false));
	orFilter = [];
	orFilter.push(new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Equal, "filtervalue1"));
	orFilter.push(new sap.ui.model.Filter("status", sap.ui.model.FilterOperator.Equal, "filtervalue1"));
	andFilter.push(new sap.ui.model.Filter(orFilter, false));
	oBinding.filter(new sap.ui.model.Filter(andFilter, true));	
	That should translate to:
	title=filtervalue || status=filtervalue && title=filtervalue1 || status=filtervalue1*/
	
	//Used for and and or filter
	var andFilter = [];
	var orFilter  = [];	
	andFilter.push(new sap.ui.model.Filter("begda", sap.ui.model.FilterOperator.EQ, "2019-09-12T00:00:00"));
	orFilter.push(new sap.ui.model.Filter("stat2", sap.ui.model.FilterOperator.EQ, "3"));
	orFilter.push(new sap.ui.model.Filter("stat2", sap.ui.model.FilterOperator.EQ, "1"));
	
	andFilter.push(new sap.ui.model.Filter(orFilter, false));
	
	var mParameters = {
    		filters:andFilter,
    		success: function (oData) {
				that.getView().getModel("TableSetModel").setProperty("/Tableset", oData.results);
				 oBusyDialog.close();
			},
			error: function (errorResponse) {

			},
			async: true
		};
    mainModel.read("/ZCDS_HRV_EMPSS", mParameters);
      
    that.columnChart();
},

columnChart:function(){
	var oVizFrame1 = this.getView().byId("idVizFrame");
	oVizFrame1.setVizProperties({
		plotArea: {
			colorPalette: d3.scale.category10().range(),
			dataLabel: {
				showTotal: true,
				visible:true,
				
			}
		},
		tooltip: {
			visible: true
		},
		title: {
			text: "Chart Data",
			
		}
	});	
	
},

onPressChart:function(){
	this.getView().byId("idProductsTable").setVisible(false);
	this.getView().byId("idVizFrame").setVisible(true);
	this.getView().byId("idBtnTable").setType("Default");
	this.getView().byId("idBtnChart").setType("Emphasized");
	
},

onPressTable:function(){
	this.getView().byId("idProductsTable").setVisible(true);
	this.getView().byId("idVizFrame").setVisible(false);
	this.getView().byId("idBtnTable").setType("Emphasized");
	this.getView().byId("idBtnChart").setType("Default");
},

handleChangeSearch: function(oEvent) {
    var tableId = this.getView().byId("idProductsTable");
    var inputValue = oEvent.getParameter("query");
    var trimValue = inputValue.trim();
    var filterArr = [];
    var items = tableId.getBinding("items");
    var filter1 = new sap.ui.model.Filter("btext", sap.ui.model.FilterOperator.Contains, trimValue);
    var filter2 = new sap.ui.model.Filter("EATW", sap.ui.model.FilterOperator.Contains, trimValue);

    filterArr = [filter1, filter2];

    var finalFilter = new sap.ui.model.Filter({
     filters: filterArr,
     and: false
    });
    items.filter(finalFilter);
   }



      });
});

