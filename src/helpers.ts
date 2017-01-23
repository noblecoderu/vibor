export interface IDataResponse {
    data: Object;
    list: Array<Object>;
    headers: {};
}

export function fetchFromObject(object: Object, prop: string): any {
    if (object === undefined || prop === undefined) {
        return object;
    }

    var _index: number = prop.indexOf(".");
    if (_index > -1) {
        return this.fetchFromObject(object[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return object[prop];
}

export function defaultFormatter(data: any, valuePropertyName: string): string {
    let html: string = "";
    html += fetchFromObject(data, valuePropertyName) ? `<b>${fetchFromObject(data, valuePropertyName)}</b>` : "";
    return html;
}


// Used for matching numbers
var core_pnum: string = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
var rnumnonpx: RegExp = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i");

function augmentWidthOrHeight(name: string, extra: any, isBorderBox: any, styles: any): number {
    var i: number = extra === (isBorderBox ? "border" : "content") ?
            // If we already have the right measurement, avoid augmentation
            4 :
            // Otherwise initialize for horizontal or vertical properties
            name === "width" ? 1 : 0,

        val: number = 0,
        cssExpand: string[] = ["Top", "Right", "Bottom", "Left"];

    // TODO Use angular.element.css instead of getStyleValue after 
    // https://github.com/caitp/angular.js/commit/92bbb5e225253ebddd38ef5735d66ffef76b6a14 will be applied
    function getStyleValue(_name: any): number {
        return parseFloat(styles[_name]);
    }

    for (; i < 4; i += 2) {
        // both box models exclude margin, so add it if we want it
        if (extra === "margin") {
            val += getStyleValue(extra + cssExpand[i]);
        }

        if (isBorderBox) {
            // border-box includes padding, so remove it if we want content
            if (extra === "content") {
                val -= getStyleValue("padding" + cssExpand[i]);
            }

            // at this point, extra isn"t border nor margin, so remove border
            if (extra !== "margin") {
                val -= getStyleValue("border" + cssExpand[i] + "Width");
            }
        } else {
            val += getStyleValue("padding" + cssExpand[i]);

            // at this point, extra isn"t content nor padding, so add border
            if (extra !== "padding") {
                val += getStyleValue("border" + cssExpand[i] + "Width");
            }
        }
    }

    return val;
}

function getWindow(elem: any): any {
    return elem != null && elem === elem.window ? elem : elem.nodeType === 9 && elem.defaultView;
}

function getOffset(elem: any): any {
    let docElem: any, win: any,
        box: any = elem.getBoundingClientRect(),
        doc: any = elem && elem.ownerDocument;

    if (!doc) {
        return;
    }

    docElem = doc.documentElement;
    win = getWindow(doc);

    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
    };
}

export function scrollActiveOption(list: HTMLElement, item: HTMLElement): void {
    let y: any, height_menu: any, height_item: any, scroll: any, scroll_top: any, scroll_bottom: any;

    if (item) {
        height_menu = list.offsetHeight;
        height_item = getWidthOrHeight(item, "height", "margin"); // outerHeight(true);
        scroll = list.scrollTop || 0;
        y = getOffset(item).top - getOffset(list).top + scroll;
        scroll_top = y;
        scroll_bottom = y - height_menu + height_item;

        // TODO Make animation
        if (y + height_item > height_menu + scroll) {
            list.scrollTop = scroll_bottom;
        } else if (y < scroll) {
            list.scrollTop = scroll_top;
        }
    }
}

function getWidthOrHeight(elem: any, name: any, extra: any): any {

    // Start with offset property, which is equivalent to the border-box value
    var valueIsBorderBox: boolean = true,
        val: any = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles: any = window.getComputedStyle(elem, null),

    // TODO Make isBorderBox after https://github.com/caitp/angular.js/commit/92bbb5e225253ebddd38ef5735d66ffef76b6a14 will be applied
        isBorderBox: boolean = false; // jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

    // some non-html elements return undefined for offsetWidth, so check for null/undefined
    // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
    // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
    if (val <= 0 || val == null) {
        // Fall back to computed then uncomputed css if necessary
        val = styles[name];

        if (val < 0 || val == null) {
            val = elem.style[name];
        }

        // Computed unit is not pixels. Stop here and return.
        if (rnumnonpx.test(val)) {
            return val;
        }

        // we need the check for style in case a browser which returns unreliable values
        // for getComputedStyle silently falls back to the reliable elem.style
        // valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

        // Normalize "", auto, and prepare for extra
        val = parseFloat(val) || 0;
    }

    // use the active box-sizing model to add/subtract irrelevant styles
    return val + augmentWidthOrHeight(name, extra || ( isBorderBox ? "border" : "content" ), valueIsBorderBox, styles);
}