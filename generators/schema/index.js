"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("../../utils/generator");
module.exports = class extends generator_1.Basic {
    exec() {
        const destPath = `src/schemas/${this.name}.js`;
        this._writing('schema.js', destPath);
    }
};
//# sourceMappingURL=index.js.map