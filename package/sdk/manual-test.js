const { NodeInit, captureError } = require("./dist/node/index");

console.log("Initializing SDK...");
NodeInit(
  "6pYfDHWr3jzyC92O6CjMk6",
  "e-com_37bf9ef4-30df-4b6a-a5a9-9bcd7c66ce27",
);

function executeWithCapture(fn) {
  try {
    fn();
  } catch (err) {
    console.log("Error Name:", err.name);
    console.log("Error Message:", err.message);
    captureError(err);
  }
}

/**
 * TypeError example
 */
function triggerTypeError() {
  const value = null;
  value.toString(); // TypeError
}

/**
 * ReferenceError example
 */
function triggerReferenceError() {
  console.log(notDefinedVariable); // ReferenceError
}

/**
 * RangeError example
 */
function triggerRangeError() {
  function recurse() {
    recurse();
  }
  recurse(); // RangeError: Maximum call stack size exceeded
}

/**
 * SyntaxError example (must be eval)
 */
function triggerSyntaxError() {
  eval("function () {"); // SyntaxError
}

/**
 * Custom Error example
 */
function triggerCustomError() {
  throw new Error("This is a custom application error");
}

/* ---------------- EXECUTION ---------------- */

executeWithCapture(triggerTypeError);
executeWithCapture(triggerReferenceError);
executeWithCapture(triggerRangeError);
executeWithCapture(triggerSyntaxError);
executeWithCapture(triggerCustomError);
