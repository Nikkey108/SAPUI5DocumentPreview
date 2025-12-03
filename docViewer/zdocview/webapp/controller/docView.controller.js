sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("com.sap.demo.zdocview.controller.docView", {

        onInit: function () {},

       onLoadDocumentPress: async function () {
    try {
        const viewerDiv = this.byId("viewer");
        if (!viewerDiv) {
            console.error("Viewer control not found");
            return;
        } //  Base64 DOCX input
       const base64Docx = `base 64 encoded string`


        const byteCharacters = atob(base64Docx);
        const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);

        const docxBlob = new Blob([byteArray], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });

        // Reference to DOM element
        const domRef = viewerDiv.getDomRef();
        if (!domRef) {
            console.error("Viewer DOM element not found");
            return;
        }

        
        if (!viewerDiv._webViewerInstance) {
            viewerDiv._webViewerInstance = await new Promise(async (resolve, reject) => {
                    if (!window.WebViewer) {
                        await this._loadWebViewerScript();
                    }
            //Load document from local
//                     WebViewer({
//                         path: "./lib/webviewer",
//                         licenseKey: "your key",
//                         initialDoc: "./sample/WebviewerDemoDoc.pdf"
//                     }, domRef)
//                     .then(instance => {
//                          const { UI } = instance;
//                         UI.setModularHeaders([]);  
//                         resolve(instance);})
//                     .catch(err => reject(err));
                    
// });

          WebViewer({
                    path: "./lib/webviewer",
                    licenseKey: "your_key"
                }, domRef)
                .then(instance => resolve(instance))
                .catch(err => reject(err));
            });
           viewerDiv._webViewerInstance.UI.setModularHeaders([]);
        }

       const instance = viewerDiv._webViewerInstance;

        await instance.Core.documentViewer.loadDocument(docxBlob, {
            extension: "docx"
        });
    } catch (err) {
        console.error(err);
    }
},


        _loadWebViewerScript: function () {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = "./lib/webviewer/webviewer.min.js"; // adjust path
                script.onload = () => resolve();
                script.onerror = () => reject(new Error("WebViewer script failed to load"));
                document.head.appendChild(script);
            });
        }
    });
});
