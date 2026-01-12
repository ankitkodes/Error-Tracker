const { NodeInit, captureError } = require("./dist/node/index");

console.log("Initializing SDK...");
NodeInit("Z2ZgttGcieTCO7vzct9Tx", "e-com_e2825372-13ef-44bf-ba9a-aca1be4895e3");

/**
 * 1️⃣ Handle uncaught exceptions (sync errors)
 */
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error.message);

  try {
    captureError(error);
    console.log("Uncaught exception sent to SDK");
  } catch (sdkError) {
    console.error("SDK failed to capture uncaught exception:", sdkError);
  }

  // ❗ In real production, you SHOULD exit
  // process.exit(1);
});

/**
 * 2️⃣ Handle unhandled promise rejections (async errors)
 */
process.on("unhandledRejection", (reason) => {
  const error =
    reason instanceof Error
      ? reason
      : new Error(`Unhandled Rejection: ${JSON.stringify(reason)}`);

  console.error("Unhandled Rejection:", error.message);

  try {
    captureError(error, "/app/dashboard/page.tsx");
    console.log("Unhandled rejection sent to SDK");
  } catch (sdkError) {
    console.error("SDK failed to capture rejection:", sdkError);
  }
});

console.log("Simulating errors...");

/**
 * 3️⃣ REAL Node.js error examples (not fake/custom)
 */

// Example 1: ReferenceError (sync)
setTimeout(() => {
  nonExistentFunction(); // ❌ ReferenceError
}, 100);

// Example 2: Unhandled Promise Rejection (async)
Promise.reject(new Error("Database connection failed"));

// Example 3: Native Node error
const fs = require("fs");
fs.readFile("/path/that/does/not/exist.txt", "utf8", () => {
  // error thrown internally by Node
});
