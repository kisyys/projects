sap.ui.define ([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog",
    "sap/ui/Device",

], function(UIComponent,JSONModel,ResourceModel,HelloDialog, Device){
    "use strict";
    return UIComponent.extend("sap.ui.demo.walkthrough.Component",{
        metadata: {
            manifest: "json"
        },
        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            let oData = {
                recipient: {
                    name: "World"
                }
            };
            let oModel = new JSONModel(oData);
            this.setModel(oModel);

            let oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");

            this._helloDialog = new HelloDialog(this.getRootControl());

            this.getRouter().initialize();
        },
        exit: function() {
            this._helloDialog.destroy();
            delete this._helloDialog;
        },
        openHelloDialog: function() {
            this._helloDialog.open();
        }
    })
})