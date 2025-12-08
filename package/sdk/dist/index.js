"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const browser_1 = require("./browser");
const node_1 = require("./node");
function init({ projectId, user_id, Environment }) {
    if (typeof window !== 'undefined') {
        (0, browser_1.BrowserInit)({ projectId, user_id, Environment });
    }
    else if (typeof process !== 'undefined' && process.versions?.node) {
        (0, node_1.NodeInit)({ projectId, user_id, Environment });
    }
    else {
        console.log("some Invalid Error has occured");
    }
}
