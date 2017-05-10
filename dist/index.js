"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var vibor_component_1 = require("./src/vibor.component");
__export(require("./src/vibor.component"));
var ViborModule = (function () {
    function ViborModule() {
    }
    return ViborModule;
}());
ViborModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule, forms_1.FormsModule
                ],
                declarations: [
                    vibor_component_1.ViborComponent
                ],
                exports: [
                    vibor_component_1.ViborComponent
                ]
            },] },
];
/** @nocollapse */
ViborModule.ctorParameters = function () { return []; };
exports.ViborModule = ViborModule;
//# sourceMappingURL=index.js.map