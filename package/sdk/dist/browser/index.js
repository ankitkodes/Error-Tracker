"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserInit = BrowserInit;
exports.captureError = captureError;
const transport_1 = require("../core/transport");
const utils_1 = require("../core/utils");
const errorsListener_1 = require("./errorsListener");
function BrowserInit(APIKEY) {
    ((utils_1.config.APIKEY = APIKEY), (0, errorsListener_1.handleWindowerror)());
}
function captureError(error) {
    (0, transport_1.sendError)(error);
}
