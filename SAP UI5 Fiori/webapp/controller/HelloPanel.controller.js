sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
], function (Controller, MessageToast, Fragment) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
        onShowHello: function () {
            let oBundle = this.getView().getModel("i18n").getResourceBundle();
            let sRecipient = this.getView().getModel().getProperty("/recipient/name");
            let sMsg = oBundle.getText("helloMsg", [sRecipient])
            MessageToast.show(sMsg);
        },
        onOpenDialog: function () {
          this.getOwnerComponent().openHelloDialog();
        }
    })
    
});