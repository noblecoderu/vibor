"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ViborDropdownDirective = (function () {
    function ViborDropdownDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ViborDropdownDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[vibor-dropdown-element]' },] },
    ];
    /** @nocollapse */
    ViborDropdownDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return ViborDropdownDirective;
}());
exports.ViborDropdownDirective = ViborDropdownDirective;
var ViborSelectedDirective = (function () {
    function ViborSelectedDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ViborSelectedDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[vibor-selected-element]' },] },
    ];
    /** @nocollapse */
    ViborSelectedDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return ViborSelectedDirective;
}());
exports.ViborSelectedDirective = ViborSelectedDirective;
var ViborBothDirective = (function () {
    function ViborBothDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ViborBothDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[vibor-both-element]' },] },
    ];
    /** @nocollapse */
    ViborBothDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return ViborBothDirective;
}());
exports.ViborBothDirective = ViborBothDirective;
var ViborCreateDirective = (function () {
    function ViborCreateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ViborCreateDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[vibor-create]' },] },
    ];
    /** @nocollapse */
    ViborCreateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return ViborCreateDirective;
}());
exports.ViborCreateDirective = ViborCreateDirective;
//# sourceMappingURL=vibor.template.directive.js.map