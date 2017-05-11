"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
__export(require("./src/vibor.component"));
var vibor_component_1 = require("./src/vibor.component");
var vibor_template_directive_1 = require("./src/vibor.template.directive");
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
                    vibor_component_1.ViborComponent, vibor_template_directive_1.ViborBothDirective, vibor_template_directive_1.ViborDropdownDirective, vibor_template_directive_1.ViborSelectedDirective
                ],
                exports: [
                    vibor_component_1.ViborComponent, vibor_template_directive_1.ViborBothDirective, vibor_template_directive_1.ViborDropdownDirective, vibor_template_directive_1.ViborSelectedDirective
                ]
            },] },
];
/** @nocollapse */
ViborModule.ctorParameters = function () { return []; };
exports.ViborModule = ViborModule;
//# sourceMappingURL=index.js.map