"use strict";
// process.on('uncaughtException')
Object.defineProperty(exports, "__esModule", { value: true });
exports.UncaughtException = UncaughtException;
const transport_1 = require("../core/transport");
async function UncaughtException() {
    process.on("uncaughtException", async (err) => {
        try {
            const response = await (0, transport_1.sendError)(err);
        }
        catch (error) {
            console.log("unable to send error on server");
        }
    });
}
