"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = sendError;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
async function sendError(error) {
    try {
        await (0, axios_1.default)({
            method: "POST",
            url: utils_1.DSN_URL,
            data: {
                error,
                projectId: utils_1.config.projectId,
            },
        });
    }
    catch (error) {
        return console.log("Unable to send Error to backend", error);
    }
}
