"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeInit = NodeInit;
exports.captureError = captureError;
const transport_1 = require("../core/transport");
const utils_1 = require("../core/utils");
const errorListener_1 = require("./errorListener");
function NodeInit(APIKEY) {
    ((utils_1.config.APIKEY = APIKEY), (0, errorListener_1.UncaughtException)());
}
async function captureError(error) {
    await (0, transport_1.sendError)(error);
}
