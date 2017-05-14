"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ViborDropdownDirective = (function () {
    function ViborDropdownDirective(templateRef) {
        this.templateRef = templateRef;
    }
    return ViborDropdownDirective;
}());
ViborDropdownDirective.decorators = [
    { type: core_1.Directive, args: [{ selector: '[vibor-dropdown-element]' },] },
];
/** @nocollapse */
ViborDropdownDirective.ctorParameters = function () { return [
    { type: core_1.TemplateRef, },
]; };
exports.ViborDropdownDirective = ViborDropdownDirective;
var ViborSelectedDirective = (function () {
    function ViborSelectedDirective(templateRef) {
        this.templateRef = templateRef;
    }
    return ViborSelectedDirective;
}());
ViborSelectedDirective.decorators = [
    { type: core_1.Directive, args: [{ selector: '[vibor-selected-element]' },] },
];
/** @nocollapse */
ViborSelectedDirective.ctorParameters = function () { return [
    { type: core_1.TemplateRef, },
]; };
exports.ViborSelectedDirective = ViborSelectedDirective;
var ViborBothDirective = (function () {
    function ViborBothDirective(templateRef) {
        this.templateRef = templateRef;
    }
    return ViborBothDirective;
}());
ViborBothDirective.decorators = [
    { type: core_1.Directive, args: [{ selector: '[vibor-both-element]' },] },
];
/** @nocollapse */
ViborBothDirective.ctorParameters = function () { return [
    { type: core_1.TemplateRef, },
]; };
exports.ViborBothDirective = ViborBothDirective;
//# sourceMappingURL=vibor.template.directive.js.map