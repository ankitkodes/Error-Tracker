"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSN_URL = exports.config = void 0;
const types_1 = require("./types");
exports.config = {
    projectId: "",
    user_id: "",
    environment: types_1.Environment.Development,
};
exports.DSN_URL = "http://localhost:3000/api/bugs";
