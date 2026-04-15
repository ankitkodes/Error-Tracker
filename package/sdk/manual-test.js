const { NodeInit, captureError } = require("./dist/node/index");

console.log("🚀 Initializing SDK...");

NodeInit(
  "6pYfDHWr3jzyC92O6CjMk6",
  "Netwo_3ad4b1dc-90b0-4483-ba54-a9a902d31079"
);

/**
 * Generic wrapper to capture errors
 */
function executeWithCapture(fn) {
  try {
    fn();
  } catch (err) {
    console.log("Captured Error:");
    console.log("Name:", err.name);
    console.log("Message:", err.message);

    captureError(err);
  }
}

/**
 * RangeError Example
 * Happens when a number is outside allowed range
 */
function triggerRangeError() {
  const arr = new Array(-5); // Invalid array length
}

/**
 * ReferenceError Example
 * Happens when accessing undefined variables
 */
function triggerReferenceError() {
  console.log(nonExistentVariable);
}

/**
 * TypeError Example
 * Happens when wrong data type operation occurs
 */
function triggerTypeError() {
  const num = 10;
  num(); // trying to call a number like a function
}

/**
 * SyntaxError Example (dynamic code)
 */
function triggerSyntaxError() {
  eval("function () {"); // invalid JS syntax
}

/**
 * Promise Rejection Example
 */
async function triggerPromiseError() {
  return Promise.reject(new Error("Promise rejected unexpectedly"));
}

/**
 * Custom Database Error
 */
function triggerDatabaseError() {
  const dbError = new Error("Database connection failed");
  dbError.name = "DatabaseError";
  throw dbError;
}

/**
 * Timeout Simulation Error
 */
function triggerTimeoutError() {
  const timeoutError = new Error("Request timed out after 5000ms");
  timeoutError.name = "TimeoutError";
  throw timeoutError;
}

/* ---------------- EXECUTION ---------------- */

executeWithCapture(triggerRangeError);
executeWithCapture(triggerReferenceError);
executeWithCapture(triggerTypeError);
executeWithCapture(triggerSyntaxError);
executeWithCapture(triggerDatabaseError);
executeWithCapture(triggerTimeoutError);

// Promise error handled separately
triggerPromiseError().catch((err) => {
  console.log("Async Error Captured:");
  console.log("Name:", err.name);
  console.log("Message:", err.message);
  captureError(err);
});