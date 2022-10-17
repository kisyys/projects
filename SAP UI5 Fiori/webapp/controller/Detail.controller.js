sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
], function (Controller, UIComponent,History,JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
        onInit: function() {
            let  oViewModel = new JSONModel({
                currency: 'EUR'
            });
            this.getView().setModel(oViewModel,"view");
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function(oEvent) {
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                model: "invoice"
            })
        },
        onNavBack: function() {
            let oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if(sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("overview",{},true)
            }
        },
    });
});