"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var ViborCliPage = (function () {
    function ViborCliPage() {
    }
    ViborCliPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    ViborCliPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return ViborCliPage;
}());
exports.ViborCliPage = ViborCliPage;
//# sourceMappingURL=app.po.js.map