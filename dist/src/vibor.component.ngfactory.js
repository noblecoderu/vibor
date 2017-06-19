"use strict";
/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var import0 = require("@angular/core");
var import1 = require("@angular/common");
var import2 = require("./vibor.component");
var import3 = require("@angular/forms");
var styles_ViborComponent = [];
exports.RenderType_ViborComponent = import0.ɵcrt({
    encapsulation: 2,
    styles: styles_ViborComponent,
    data: {}
});
function View_ViborComponent_3(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 6, 'li', [[
                'class',
                'select-search-list-item select-search-list-item_selection'
            ]
        ], [[
                2,
                'focused',
                null
            ]
        ], null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n                      '])),
        (l()(), import0.ɵeld(0, null, null, 0, 'div', [], [[
                8,
                'innerHTML',
                1
            ]
        ], null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n                      '])),
        (l()(), import0.ɵeld(0, null, null, 1, 'a', [[
                'class',
                'select-search-list-item_remove'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('click' === en)) {
                var pd_0 = ((!co.disabled && co.removeOne(v.context.index, $event)) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import0.ɵted(null, ['✕'])),
        (l()(), import0.ɵted(null, ['\n                  ']))
    ], null, function (ck, v) {
        var co = v.component;
        var currVal_0 = (co.backspaceFocus && co.last);
        ck(v, 0, 0, currVal_0);
        var currVal_1 = co.getListFormatted(v.context.$implicit);
        ck(v, 2, 0, currVal_1);
    });
}
function View_ViborComponent_2(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 4, null, null, null, null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n                  '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_3)),
        import0.ɵdid(802816, null, 0, import1.NgForOf, [
            import0.ViewContainerRef,
            import0.TemplateRef,
            import0.IterableDiffers
        ], {
            ngForOf: [
                0,
                'ngForOf'
            ],
            ngForTrackBy: [
                1,
                'ngForTrackBy'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n              ']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_0 = co.output;
        var currVal_1 = co.TrackByFn;
        ck(v, 3, 0, currVal_0, currVal_1);
    }, null);
}
function View_ViborComponent_6(l) {
    return import0.ɵvid(0, [(l()(), import0.ɵeld(0, null, null, 0, null, null, null, null, null, null, null))], null, null);
}
function View_ViborComponent_7(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 1, 'a', [[
                'class',
                'select-search-list-item_remove'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('click' === en)) {
                var pd_0 = ((!co.disabled && co.removeOne(v.parent.context.index, $event)) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import0.ɵted(null, ['✕']))
    ], null, null);
}
function View_ViborComponent_5(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 8, 'li', [[
                'class',
                'select-search-list-item select-search-list-item_selection'
            ]
        ], [[
                2,
                'focused',
                null
            ]
        ], null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n                      '])),
        (l()(), import0.ɵand(16777216, null, null, 2, null, View_ViborComponent_6)),
        import0.ɵdid(540672, null, 0, import1.NgTemplateOutlet, [import0.ViewContainerRef], {
            ngTemplateOutletContext: [
                0,
                'ngTemplateOutletContext'
            ],
            ngTemplateOutlet: [
                1,
                'ngTemplateOutlet'
            ]
        }, null),
        import0.ɵpod(['item']),
        (l()(), import0.ɵted(null, ['\n                      '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_7)),
        import0.ɵdid(16384, null, 0, import1.NgIf, [
            import0.ViewContainerRef,
            import0.TemplateRef
        ], { ngIf: [
                0,
                'ngIf'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n                  ']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_1 = ck(v, 4, 0, v.context.$implicit);
        var currVal_2 = co.SelectedTemplate;
        ck(v, 3, 0, currVal_1, currVal_2);
        var currVal_3 = !co.disabled;
        ck(v, 7, 0, currVal_3);
    }, function (ck, v) {
        var co = v.component;
        var currVal_0 = (co.backspaceFocus && co.last);
        ck(v, 0, 0, currVal_0);
    });
}
function View_ViborComponent_4(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵted(null, ['\n                  '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_5)),
        import0.ɵdid(802816, null, 0, import1.NgForOf, [
            import0.ViewContainerRef,
            import0.TemplateRef,
            import0.IterableDiffers
        ], {
            ngForOf: [
                0,
                'ngForOf'
            ],
            ngForTrackBy: [
                1,
                'ngForTrackBy'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n              ']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_0 = co.output;
        var currVal_1 = co.TrackByFn;
        ck(v, 2, 0, currVal_0, currVal_1);
    }, null);
}
function View_ViborComponent_1(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 6, null, null, null, null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n              '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_2)),
        import0.ɵdid(16384, null, 0, import1.NgIf, [
            import0.ViewContainerRef,
            import0.TemplateRef
        ], {
            ngIf: [
                0,
                'ngIf'
            ],
            ngIfElse: [
                1,
                'ngIfElse'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n\n              '])),
        (l()(), import0.ɵand(0, [[
                'selectedT',
                2
            ]
        ], null, 0, null, View_ViborComponent_4)),
        (l()(), import0.ɵted(null, ['\n            ']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_0 = !co.SelectedTemplate;
        var currVal_1 = import0.ɵnov(v, 5);
        ck(v, 3, 0, currVal_0, currVal_1);
    }, null);
}
function View_ViborComponent_10(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 1, 'li', [[
                'class',
                'select-dropdown-optgroup-option'
            ]
        ], [
            [
                2,
                'active',
                null
            ],
            [
                8,
                'innerHTML',
                1
            ]
        ], [[
                null,
                'mousedown'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('mousedown' === en)) {
                var pd_0 = (co.selectOne($event, v.context.$implicit) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import0.ɵted(null, ['\n                ']))
    ], null, function (ck, v) {
        var co = v.component;
        var currVal_0 = (v.context.index === co.selectorPosition);
        var currVal_1 = co.getDropdownFormatted(v.context.$implicit);
        ck(v, 0, 0, currVal_0, currVal_1);
    });
}
function View_ViborComponent_9(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 4, null, null, null, null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n                '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_10)),
        import0.ɵdid(802816, null, 0, import1.NgForOf, [
            import0.ViewContainerRef,
            import0.TemplateRef,
            import0.IterableDiffers
        ], { ngForOf: [
                0,
                'ngForOf'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n            ']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_0 = co.Options;
        ck(v, 3, 0, currVal_0);
    }, null);
}
function View_ViborComponent_13(l) {
    return import0.ɵvid(0, [(l()(), import0.ɵeld(0, null, null, 0, null, null, null, null, null, null, null))], null, null);
}
function View_ViborComponent_12(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 5, 'li', [[
                'class',
                'select-dropdown-optgroup-option'
            ]
        ], [[
                2,
                'active',
                null
            ]
        ], [[
                null,
                'mousedown'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('mousedown' === en)) {
                var pd_0 = (co.selectOne($event, v.context.$implicit) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import0.ɵted(null, ['\n                    '])),
        (l()(), import0.ɵand(16777216, null, null, 2, null, View_ViborComponent_13)),
        import0.ɵdid(540672, null, 0, import1.NgTemplateOutlet, [import0.ViewContainerRef], {
            ngTemplateOutletContext: [
                0,
                'ngTemplateOutletContext'
            ],
            ngTemplateOutlet: [
                1,
                'ngTemplateOutlet'
            ]
        }, null),
        import0.ɵpod(['item']),
        (l()(), import0.ɵted(null, ['\n                ']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_1 = ck(v, 4, 0, v.context.$implicit);
        var currVal_2 = co.DropdownTemplate;
        ck(v, 3, 0, currVal_1, currVal_2);
    }, function (ck, v) {
        var co = v.component;
        var currVal_0 = (v.context.index === co.selectorPosition);
        ck(v, 0, 0, currVal_0);
    });
}
function View_ViborComponent_11(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵted(null, ['\n                '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_12)),
        import0.ɵdid(802816, null, 0, import1.NgForOf, [
            import0.ViewContainerRef,
            import0.TemplateRef,
            import0.IterableDiffers
        ], { ngForOf: [
                0,
                'ngForOf'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n            ']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_0 = co.Options;
        ck(v, 2, 0, currVal_0);
    }, null);
}
function View_ViborComponent_14(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 1, 'li', [[
                'class',
                'select-dropdown-optgroup-option loader'
            ]
        ], null, null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n                Загрузка\n            ']))
    ], null, null);
}
function View_ViborComponent_17(l) {
    return import0.ɵvid(0, [(l()(), import0.ɵeld(0, null, null, 0, null, null, null, null, null, null, null))], null, null);
}
function View_ViborComponent_16(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 5, null, null, null, null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n                    '])),
        (l()(), import0.ɵand(16777216, null, null, 2, null, View_ViborComponent_17)),
        import0.ɵdid(540672, null, 0, import1.NgTemplateOutlet, [import0.ViewContainerRef], {
            ngTemplateOutletContext: [
                0,
                'ngTemplateOutletContext'
            ],
            ngTemplateOutlet: [
                1,
                'ngTemplateOutlet'
            ]
        }, null),
        import0.ɵpod(['query']),
        (l()(), import0.ɵted(null, ['\n                ']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_0 = ck(v, 4, 0, co.query);
        var currVal_1 = co.createTemplate.templateRef;
        ck(v, 3, 0, currVal_0, currVal_1);
    }, null);
}
function View_ViborComponent_18(l) {
    return import0.ɵvid(0, [(l()(), import0.ɵted(null, [
            '\n                    ',
            '\n                '
        ]))], null, function (ck, v) {
        var co = v.component;
        var currVal_0 = co.newMessage;
        ck(v, 0, 0, currVal_0);
    });
}
function View_ViborComponent_15(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 6, 'li', [[
                'class',
                'select-dropdown-optgroup-option loader'
            ]
        ], [[
                2,
                'active',
                null
            ]
        ], [[
                null,
                'mousedown'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('mousedown' === en)) {
                var pd_0 = (co.AddNewObject(co.CreateNew(co.query)) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import0.ɵted(null, ['\n\n                '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_16)),
        import0.ɵdid(16384, null, 0, import1.NgIf, [
            import0.ViewContainerRef,
            import0.TemplateRef
        ], {
            ngIf: [
                0,
                'ngIf'
            ],
            ngIfElse: [
                1,
                'ngIfElse'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n\n                '])),
        (l()(), import0.ɵand(0, [[
                'templateWithMessage',
                2
            ]
        ], null, 0, null, View_ViborComponent_18)),
        (l()(), import0.ɵted(null, ['\n\n            ']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_1 = co.createTemplate;
        var currVal_2 = import0.ɵnov(v, 5);
        ck(v, 3, 0, currVal_1, currVal_2);
    }, function (ck, v) {
        var co = v.component;
        var currVal_0 = (co.selectorPosition === co.Options.length);
        ck(v, 0, 0, currVal_0);
    });
}
function View_ViborComponent_20(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 1, 'button', [[
                'class',
                'select-dropdown-pager-loadmore'
            ]
        ], null, [[
                null,
                'mousedown'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('mousedown' === en)) {
                var pd_0 = (co.nextPage($event) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import0.ɵted(null, ['\n                Загрузить ещё\n            ']))
    ], null, null);
}
function View_ViborComponent_19(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 9, 'div', [[
                'class',
                'select-dropdown-pager'
            ]
        ], null, null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n            '])),
        (l()(), import0.ɵeld(0, null, null, 3, 'p', [[
                'class',
                'select-dropdown-pager-page'
            ]
        ], null, null, null, null, null)),
        (l()(), import0.ɵted(null, [
            '\n                ',
            ' / ',
            '\n            '
        ])),
        import0.ɵppd(1),
        import0.ɵppd(1),
        (l()(), import0.ɵted(null, ['\n            '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_20)),
        import0.ɵdid(16384, null, 0, import1.NgIf, [
            import0.ViewContainerRef,
            import0.TemplateRef
        ], { ngIf: [
                0,
                'ngIf'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n        ']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_2 = ((co.CurrentCache.countPages > 1) && (co.CurrentCache.currentPage < co.CurrentCache.countPages));
        ck(v, 8, 0, currVal_2);
    }, function (ck, v) {
        var co = v.component;
        var currVal_0 = import0.ɵunv(v, 3, 0, ck(v, 4, 0, import0.ɵnov(v.parent.parent, 0), co.CurrentCache.currentPage));
        var currVal_1 = import0.ɵunv(v, 3, 1, ck(v, 5, 0, import0.ɵnov(v.parent.parent, 0), co.CurrentCache.countPages));
        ck(v, 3, 0, currVal_0, currVal_1);
    });
}
function View_ViborComponent_8(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 18, 'div', [[
                'class',
                'select-dropdown'
            ]
        ], null, null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n        '])),
        (l()(), import0.ɵeld(0, null, null, 12, 'ul', [[
                'class',
                'select-dropdown-optgroup'
            ]
        ], null, null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n            '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_9)),
        import0.ɵdid(16384, null, 0, import1.NgIf, [
            import0.ViewContainerRef,
            import0.TemplateRef
        ], {
            ngIf: [
                0,
                'ngIf'
            ],
            ngIfElse: [
                1,
                'ngIfElse'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n\n            '])),
        (l()(), import0.ɵand(0, [[
                'dropdownT',
                2
            ]
        ], null, 0, null, View_ViborComponent_11)),
        (l()(), import0.ɵted(null, ['\n\n            '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_14)),
        import0.ɵdid(16384, null, 0, import1.NgIf, [
            import0.ViewContainerRef,
            import0.TemplateRef
        ], { ngIf: [
                0,
                'ngIf'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n            '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_15)),
        import0.ɵdid(16384, null, 0, import1.NgIf, [
            import0.ViewContainerRef,
            import0.TemplateRef
        ], { ngIf: [
                0,
                'ngIf'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n        '])),
        (l()(), import0.ɵted(null, ['\n        '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_19)),
        import0.ɵdid(16384, null, 0, import1.NgIf, [
            import0.ViewContainerRef,
            import0.TemplateRef
        ], { ngIf: [
                0,
                'ngIf'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n    ']))
    ], function (ck, v) {
        var co = v.component;
        var currVal_0 = !co.DropdownTemplate;
        var currVal_1 = import0.ɵnov(v, 7);
        ck(v, 5, 0, currVal_0, currVal_1);
        var currVal_2 = (co.dataListSub && !co.dataListSub.closed);
        ck(v, 10, 0, currVal_2);
        var currVal_3 = co.ShowNew;
        ck(v, 13, 0, currVal_3);
        var currVal_4 = (co.CurrentCache && (co.CurrentCache.countPages > 1));
        ck(v, 17, 0, currVal_4);
    }, null);
}
function View_ViborComponent_0(l) {
    return import0.ɵvid(0, [
        import0.ɵpid(0, import1.DecimalPipe, [import0.LOCALE_ID]),
        import0.ɵqud(402653184, 1, { inputControl: 0 }),
        (l()(), import0.ɵted(null, ['\n  '])),
        import0.ɵncd(null, 0),
        (l()(), import0.ɵted(null, ['\n\n  '])),
        (l()(), import0.ɵeld(0, null, null, 25, 'div', [[
                'class',
                'select-search'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('click' === en)) {
                var pd_0 = (co.showDropdownList($event) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import0.ɵted(null, ['\n      '])),
        (l()(), import0.ɵeld(0, null, null, 22, 'ul', [[
                'class',
                'select-search-list'
            ]
        ], null, null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n            '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_1)),
        import0.ɵdid(16384, null, 0, import1.NgIf, [
            import0.ViewContainerRef,
            import0.TemplateRef
        ], { ngIf: [
                0,
                'ngIf'
            ]
        }, null),
        (l()(), import0.ɵted(null, ['\n\n            '])),
        (l()(), import0.ɵeld(0, null, null, 8, 'li', [[
                'class',
                'select-search-list-item select-search-list-item_input'
            ]
        ], [[
                2,
                'select-search-list-item_hide',
                null
            ]
        ], null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n                '])),
        (l()(), import0.ɵeld(0, null, null, 5, 'input', [[
                'autocomplete',
                'off'
            ]
        ], [
            [
                8,
                'placeholder',
                0
            ],
            [
                2,
                'ng-untouched',
                null
            ],
            [
                2,
                'ng-touched',
                null
            ],
            [
                2,
                'ng-pristine',
                null
            ],
            [
                2,
                'ng-dirty',
                null
            ],
            [
                2,
                'ng-valid',
                null
            ],
            [
                2,
                'ng-invalid',
                null
            ],
            [
                2,
                'ng-pending',
                null
            ]
        ], [
            [
                null,
                'ngModelChange'
            ],
            [
                null,
                'input'
            ],
            [
                null,
                'blur'
            ],
            [
                null,
                'keydown'
            ],
            [
                null,
                'compositionstart'
            ],
            [
                null,
                'compositionend'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('input' === en)) {
                var pd_0 = (import0.ɵnov(v, 15)._handleInput($event.target.value) !== false);
                ad = (pd_0 && ad);
            }
            if (('blur' === en)) {
                var pd_1 = (import0.ɵnov(v, 15).onTouched() !== false);
                ad = (pd_1 && ad);
            }
            if (('compositionstart' === en)) {
                var pd_2 = (import0.ɵnov(v, 15)._compositionStart() !== false);
                ad = (pd_2 && ad);
            }
            if (('compositionend' === en)) {
                var pd_3 = (import0.ɵnov(v, 15)._compositionEnd($event.target.value) !== false);
                ad = (pd_3 && ad);
            }
            if (('ngModelChange' === en)) {
                var pd_4 = ((co.query = $event) !== false);
                ad = (pd_4 && ad);
            }
            if (('input' === en)) {
                var pd_5 = (co.updateOptionsInDelay() !== false);
                ad = (pd_5 && ad);
            }
            if (('blur' === en)) {
                var pd_6 = (co.hideDropdownListWithDelay() !== false);
                ad = (pd_6 && ad);
            }
            if (('keydown' === en)) {
                var pd_7 = (co.keyDown($event) !== false);
                ad = (pd_7 && ad);
            }
            return ad;
        }, null, null)),
        import0.ɵdid(16384, null, 0, import3.DefaultValueAccessor, [
            import0.Renderer,
            import0.ElementRef,
            [
                2,
                import3.COMPOSITION_BUFFER_MODE
            ]
        ], null, null),
        import0.ɵprd(1024, null, import3.NG_VALUE_ACCESSOR, function (p0_0) {
            return [p0_0];
        }, [import3.DefaultValueAccessor]),
        import0.ɵdid(671744, [
            [
                1,
                4
            ],
            [
                'inputControl',
                4
            ]
        ], 0, import3.NgModel, [
            [
                8,
                null
            ],
            [
                8,
                null
            ],
            [
                8,
                null
            ],
            [
                2,
                import3.NG_VALUE_ACCESSOR
            ]
        ], {
            name: [
                0,
                'name'
            ],
            isDisabled: [
                1,
                'isDisabled'
            ],
            model: [
                2,
                'model'
            ]
        }, { update: 'ngModelChange' }),
        import0.ɵprd(2048, null, import3.NgControl, null, [import3.NgModel]),
        import0.ɵdid(16384, null, 0, import3.NgControlStatus, [import3.NgControl], null, null),
        (l()(), import0.ɵted(null, ['\n            '])),
        (l()(), import0.ɵted(null, ['\n            '])),
        (l()(), import0.ɵeld(0, null, null, 3, 'li', [[
                'class',
                'select-search-list-item'
            ]
        ], [[
                8,
                'hidden',
                0
            ]
        ], null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n                '])),
        (l()(), import0.ɵeld(0, null, null, 0, 'div', [[
                'class',
                'select-search-list-item_loader'
            ]
        ], null, null, null, null, null)),
        (l()(), import0.ɵted(null, ['\n            '])),
        (l()(), import0.ɵted(null, ['\n\n            '])),
        (l()(), import0.ɵeld(0, null, null, 1, 'span', [[
                'class',
                'arrow'
            ]
        ], null, [[
                null,
                'click'
            ]
        ], function (v, en, $event) {
            var ad = true;
            var co = v.component;
            if (('click' === en)) {
                var pd_0 = (co.toggleDropdown($event) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)),
        (l()(), import0.ɵted(null, ['\n            '])),
        (l()(), import0.ɵted(null, ['\n        '])),
        (l()(), import0.ɵted(null, ['\n    '])),
        (l()(), import0.ɵted(null, ['\n\n    '])),
        (l()(), import0.ɵand(16777216, null, null, 1, null, View_ViborComponent_8)),
        import0.ɵdid(16384, null, 0, import1.NgIf, [
            import0.ViewContainerRef,
            import0.TemplateRef
        ], { ngIf: [
                0,
                'ngIf'
            ]
        }, null)
    ], function (ck, v) {
        var co = v.component;
        var currVal_0 = (co.multiple || !co.isOpen);
        ck(v, 10, 0, currVal_0);
        var currVal_10 = co.name;
        var currVal_11 = co.disabled;
        var currVal_12 = co.query;
        ck(v, 17, 0, currVal_10, currVal_11, currVal_12);
        var currVal_14 = co.isOpen;
        ck(v, 33, 0, currVal_14);
    }, function (ck, v) {
        var co = v.component;
        var currVal_1 = co.InputHide;
        ck(v, 12, 0, currVal_1);
        var currVal_2 = ((co.output.length == 0) ? co.placeholder : '');
        var currVal_3 = import0.ɵnov(v, 19).ngClassUntouched;
        var currVal_4 = import0.ɵnov(v, 19).ngClassTouched;
        var currVal_5 = import0.ɵnov(v, 19).ngClassPristine;
        var currVal_6 = import0.ɵnov(v, 19).ngClassDirty;
        var currVal_7 = import0.ɵnov(v, 19).ngClassValid;
        var currVal_8 = import0.ɵnov(v, 19).ngClassInvalid;
        var currVal_9 = import0.ɵnov(v, 19).ngClassPending;
        ck(v, 14, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9);
        var currVal_13 = (!co.dataListSub || co.dataListSub.closed);
        ck(v, 22, 0, currVal_13);
    });
}
exports.View_ViborComponent_0 = View_ViborComponent_0;
function View_ViborComponent_Host_0(l) {
    return import0.ɵvid(0, [
        (l()(), import0.ɵeld(0, null, null, 6, 'vibor', [], null, null, null, View_ViborComponent_0, exports.RenderType_ViborComponent)),
        import0.ɵdid(638976, null, 4, import2.ViborComponent, [import0.ElementRef], null, null),
        import0.ɵqud(335544320, 1, { bothTemplate: 0 }),
        import0.ɵqud(335544320, 2, { dropdownTemplate: 0 }),
        import0.ɵqud(335544320, 3, { selectedTemplate: 0 }),
        import0.ɵqud(335544320, 4, { createTemplate: 0 }),
        import0.ɵprd(5120, null, import3.NG_VALUE_ACCESSOR, function (p0_0) {
            return [p0_0];
        }, [import2.ViborComponent])
    ], function (ck, v) {
        ck(v, 1, 0);
    }, null);
}
exports.ViborComponentNgFactory = import0.ɵccf('vibor', import2.ViborComponent, View_ViborComponent_Host_0, {
    multiple: 'multiple',
    multipleLimit: 'multipleLimit',
    placeholder: 'placeholder',
    name: 'name',
    required: 'required',
    listFormatter: 'listFormatter',
    dropdownFormatter: 'dropdownFormatter',
    viewProperty: 'viewProperty',
    modelProperty: 'modelProperty',
    preloadProperty: 'preloadProperty',
    preloadField: 'preloadField',
    searchProperty: 'searchProperty',
    dataList: 'dataList',
    onlyEmitter: 'onlyEmitter',
    newMessage: 'newMessage',
    CreateNew: 'CreateNew'
}, { changeFullModel: 'changeFullModel' }, ['*']);
//# sourceMappingURL=vibor.component.ngfactory.js.map