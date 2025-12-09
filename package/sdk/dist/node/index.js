"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeInit = NodeInit;
const utils_1 = require("../core/utils");
const errorListener_1 = require("./errorListener");
function NodeInit({ projectId, user_id, environment }) {
    ((utils_1.config.projectId = projectId),
        (utils_1.config.user_id = user_id),
        (utils_1.config.environment = environment));
    (0, errorListener_1.UncaughtException)();
}
