"use strict";
// process.on('uncaughtException')
Object.defineProperty(exports, "__esModule", { value: true });
exports.UncaughtException = UncaughtException;
const transport_1 = require("../core/transport");
async function UncaughtException() {
    process.on("uncaughtException", async (err) => {
        try {
            console.log("this is process.on start......>");
            const response = await (0, transport_1.sendError)(err);
            console.log("this is end of process.on end.....>");
        }
        catch (error) {
            console.log("unable to send error on server");
        }
    });
}
