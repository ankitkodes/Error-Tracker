"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
var Environment;
(function (Environment) {
    Environment[Environment["Production"] = 0] = "Production";
    Environment[Environment["Staging"] = 1] = "Staging";
    Environment[Environment["Development"] = 2] = "Development";
})(Environment || (exports.Environment = Environment = {}));
