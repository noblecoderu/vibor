"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
        this.timezones = [{ "key": "Europe/Kaliningrad", "value": "Europe/Kaliningrad (UTC+0200)" }, { "key": "Europe/Moscow", "value": "Europe/Moscow (UTC+0300)" }, { "key": "Europe/Simferopol", "value": "Europe/Simferopol (UTC+0300)" }, { "key": "Europe/Volgograd", "value": "Europe/Volgograd (UTC+0300)" }, { "key": "Europe/Kirov", "value": "Europe/Kirov (UTC+0300)" }, { "key": "Europe/Astrakhan", "value": "Europe/Astrakhan (UTC+0400)" }, { "key": "Europe/Saratov", "value": "Europe/Saratov (UTC+0400)" }, { "key": "Europe/Ulyanovsk", "value": "Europe/Ulyanovsk (UTC+0400)" }, { "key": "Europe/Samara", "value": "Europe/Samara (UTC+0400)" }, { "key": "Asia/Yekaterinburg", "value": "Asia/Yekaterinburg (UTC+0500)" }, { "key": "Asia/Omsk", "value": "Asia/Omsk (UTC+0600)" }, { "key": "Asia/Novosibirsk", "value": "Asia/Novosibirsk (UTC+0700)" }, { "key": "Asia/Barnaul", "value": "Asia/Barnaul (UTC+0700)" }, { "key": "Asia/Tomsk", "value": "Asia/Tomsk (UTC+0700)" }, { "key": "Asia/Novokuznetsk", "value": "Asia/Novokuznetsk (UTC+0700)" }, { "key": "Asia/Krasnoyarsk", "value": "Asia/Krasnoyarsk (UTC+0700)" }, { "key": "Asia/Irkutsk", "value": "Asia/Irkutsk (UTC+0800)" }, { "key": "Asia/Chita", "value": "Asia/Chita (UTC+0900)" }, { "key": "Asia/Yakutsk", "value": "Asia/Yakutsk (UTC+0900)" }, { "key": "Asia/Khandyga", "value": "Asia/Khandyga (UTC+0900)" }, { "key": "Asia/Vladivostok", "value": "Asia/Vladivostok (UTC+1000)" }, { "key": "Asia/Ust-Nera", "value": "Asia/Ust-Nera (UTC+1000)" }, { "key": "Asia/Magadan", "value": "Asia/Magadan (UTC+1100)" }, { "key": "Asia/Sakhalin", "value": "Asia/Sakhalin (UTC+1100)" }, { "key": "Asia/Srednekolymsk", "value": "Asia/Srednekolymsk (UTC+1100)" }, { "key": "Asia/Kamchatka", "value": "Asia/Kamchatka (UTC+1200)" }, { "key": "Asia/Anadyr", "value": "Asia/Anadyr (UTC+1200)" }];
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map