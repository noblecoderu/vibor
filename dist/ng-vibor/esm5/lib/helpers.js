/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function IDataResponse() { }
function IDataResponse_tsickle_Closure_declarations() {
    /** @type {?} */
    IDataResponse.prototype.data;
    /** @type {?} */
    IDataResponse.prototype.list;
    /** @type {?} */
    IDataResponse.prototype.headers;
}
/**
 * @param {?} object
 * @param {?} prop
 * @return {?}
 */
export function fetchFromObject(object, prop) {
    if (object === undefined || prop === undefined) {
        return object;
    }
    var /** @type {?} */ index = prop.indexOf('.');
    if (index > -1) {
        return fetchFromObject(object[prop.substring(0, index)], prop.substr(index + 1));
    }
    return object[prop];
}
/**
 * @param {?} data
 * @param {?} valuePropertyName
 * @return {?}
 */
export function defaultFormatter(data, valuePropertyName) {
    var /** @type {?} */ html = '';
    html += fetchFromObject(data, valuePropertyName) ? "<b>" + fetchFromObject(data, valuePropertyName) + "</b>" : '';
    return html;
}
// Used for matching numbers
var /** @type {?} */ core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
var /** @type {?} */ rnumnonpx = new RegExp('^(' + core_pnum + ')(?!px)[a-z%]+$', 'i');
/**
 * @param {?} name
 * @param {?} extra
 * @param {?} isBorderBox
 * @param {?} styles
 * @return {?}
 */
function augmentWidthOrHeight(name, extra, isBorderBox, styles) {
    var /** @type {?} */ i = extra === (isBorderBox ? 'border' : 'content') ?
        4 :
        // Otherwise initialize for horizontal or vertical properties
        name === 'width' ? 1 : 0, /** @type {?} */
    val = 0;
    var /** @type {?} */ cssExpand = ['Top', 'Right', 'Bottom', 'Left'];
    /**
     * @param {?} _name
     * @return {?}
     */
    function getStyleValue(_name) {
        return parseFloat(styles[_name]);
    }
    for (; i < 4; i += 2) {
        // both box models exclude margin, so add it if we want it
        if (extra === 'margin') {
            val += getStyleValue(extra + cssExpand[i]);
        }
        if (isBorderBox) {
            // border-box includes padding, so remove it if we want content
            if (extra === 'content') {
                val -= getStyleValue('padding' + cssExpand[i]);
            }
            // at this point, extra isn't border nor margin, so remove border
            if (extra !== 'margin') {
                val -= getStyleValue('border' + cssExpand[i] + 'Width');
            }
        }
        else {
            val += getStyleValue('padding' + cssExpand[i]);
            // at this point, extra isn't content nor padding, so add border
            if (extra !== 'padding') {
                val += getStyleValue('border' + cssExpand[i] + 'Width');
            }
        }
    }
    return val;
}
/**
 * @param {?} elem
 * @return {?}
 */
function getWindow(elem) {
    return elem != null && elem === elem.window ? elem : elem.nodeType === 9 && elem.defaultView;
}
/**
 * @param {?} elem
 * @return {?}
 */
function getOffset(elem) {
    var /** @type {?} */ docElem, /** @type {?} */ win;
    var /** @type {?} */ box = elem.getBoundingClientRect();
    var /** @type {?} */ doc = elem && elem.ownerDocument;
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
/**
 * @param {?} list
 * @param {?} item
 * @return {?}
 */
export function scrollActiveOption(list, item) {
    var /** @type {?} */ y, /** @type {?} */ height_menu, /** @type {?} */ height_item, /** @type {?} */ scroll, /** @type {?} */ scroll_top, /** @type {?} */ scroll_bottom;
    if (item) {
        height_menu = list.offsetHeight;
        height_item = getWidthOrHeight(item, 'height', 'margin'); // outerHeight(true);
        scroll = list.scrollTop || 0;
        y = getOffset(item).top - getOffset(list).top + scroll;
        scroll_top = y;
        scroll_bottom = y - height_menu + height_item;
        // TODO Make animation
        if (y + height_item > height_menu + scroll) {
            list.scrollTop = scroll_bottom;
        }
        else if (y < scroll) {
            list.scrollTop = scroll_top;
        }
    }
}
/**
 * @param {?} elem
 * @param {?} name
 * @param {?} extra
 * @return {?}
 */
function getWidthOrHeight(elem, name, extra) {
    // Start with offset property, which is equivalent to the border-box value
    var /** @type {?} */ valueIsBorderBox = true;
    var /** @type {?} */ val = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
    var /** @type {?} */ styles = window.getComputedStyle(elem, null);
    var /** @type {?} */ isBorderBox = false; // jQuery.support.boxSizing && jQuery.css( elem, 'boxSizing', false, styles ) === 'border-box';
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
        // Normalize '', auto, and prepare for extra
        val = parseFloat(val) || 0;
    }
    // use the active box-sizing model to add/subtract irrelevant styles
    return val + augmentWidthOrHeight(name, extra || (isBorderBox ? 'border' : 'content'), valueIsBorderBox, styles);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXZpYm9yLyIsInNvdXJjZXMiOlsibGliL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsTUFBTSwwQkFBMEIsTUFBVyxFQUFFLElBQVk7SUFDdkQsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2Y7SUFFRCxxQkFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xGO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNyQjs7Ozs7O0FBRUQsTUFBTSwyQkFBMkIsSUFBUyxFQUFFLGlCQUF5QjtJQUNuRSxxQkFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2QsSUFBSSxJQUFJLGVBQWUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBTSxlQUFlLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLFNBQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdHLE1BQU0sQ0FBQyxJQUFJLENBQUM7Q0FDYjs7QUFJRCxxQkFBTSxTQUFTLEdBQVcscUNBQXFDLENBQUMsTUFBTSxDQUFDO0FBQ3ZFLHFCQUFNLFNBQVMsR0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEdBQUcsU0FBUyxHQUFH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QyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ3ZFLHFCQUFNLE1BQU0sR0FBUSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hELHFCQUFNLFdBQVcsR0FBRyxLQUFLLENBQUM7Ozs7SUFLMUIsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs7UUFFNUIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuQixFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCOztRQUdELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDWjs7Ozs7UUFPRCxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1Qjs7SUFHRCxNQUFNLENBQUMsR0FBRyxHQUFHLG9CQUFvQixDQUFDLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDbEgiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIElEYXRhUmVzcG9uc2Uge1xuICBkYXRhOiBPYmplY3Q7XG4gIGxpc3Q6IEFycmF5PE9iamVjdD47XG4gIGhlYWRlcnM6IGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoRnJvbU9iamVjdChvYmplY3Q6IGFueSwgcHJvcDogc3RyaW5nKTogYW55IHtcbiAgaWYgKG9iamVjdCA9PT0gdW5kZWZpbmVkIHx8IHByb3AgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICBjb25zdCBpbmRleDogbnVtYmVyID0gcHJvcC5pbmRleE9mKCcuJyk7XG4gIGlmIChpbmRleCA+IC0xKSB7XG4gICAgcmV0dXJuIGZldGNoRnJvbU9iamVjdChvYmplY3RbcHJvcC5zdWJzdHJpbmcoMCwgaW5kZXgpXSwgcHJvcC5zdWJzdHIoaW5kZXggKyAxKSk7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0W3Byb3BdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdEZvcm1hdHRlcihkYXRhOiBhbnksIHZhbHVlUHJvcGVydHlOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBsZXQgaHRtbCA9ICcnO1xuICBodG1sICs9IGZldGNoRnJvbU9iamVjdChkYXRhLCB2YWx1ZVByb3BlcnR5TmFtZSkgPyBgPGI+JHtmZXRjaEZyb21PYmplY3QoZGF0YSwgdmFsdWVQcm9wZXJ0eU5hbWUpfTwvYj5gIDogJyc7XG4gIHJldHVybiBodG1sO1xufVxuXG5cbi8vIFVzZWQgZm9yIG1hdGNoaW5nIG51bWJlcnNcbmNvbnN0IGNvcmVfcG51bTogc3RyaW5nID0gL1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8uc291cmNlO1xuY29uc3Qgcm51bW5vbnB4OiBSZWdFeHAgPSBuZXcgUmVnRXhwKCdeKCcgKyBjb3JlX3BudW0gKyAnKSg/IXB4KVthLXolXSskJywgJ2knKTtcblxuZnVuY3Rpb24gYXVnbWVudFdpZHRoT3JIZWlnaHQobmFtZTogc3RyaW5nLCBleHRyYTogYW55LCBpc0JvcmRlckJveDogYW55LCBzdHlsZXM6IGFueSk6IG51bWJlciB7XG4gIGxldCBpOiBudW1iZXIgPSBleHRyYSA9PT0gKGlzQm9yZGVyQm94ID8gJ2JvcmRlcicgOiAnY29udGVudCcpID9cbiAgICAvLyBJZiB3ZSBhbHJlYWR5IGhhdmUgdGhlIHJpZ2h0IG1lYXN1cmVtZW50LCBhdm9pZCBhdWdtZW50YXRpb25cbiAgICA0IDpcbiAgICAvLyBPdGhlcndpc2UgaW5pdGlhbGl6ZSBmb3IgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBwcm9wZXJ0aWVzXG4gICAgbmFtZSA9PT0gJ3dpZHRoJyA/IDEgOiAwLFxuXG4gICAgdmFsID0gMDtcbiAgY29uc3QgY3NzRXhwYW5kOiBzdHJpbmdbXSA9IFsnVG9wJywgJ1JpZ2h0JywgJ0JvdHRvbScsICdMZWZ0J107XG5cbiAgLy8gVE9ETyBVc2UgYW5ndWxhci5lbGVtZW50LmNzcyBpbnN0ZWFkIG9mIGdldFN0eWxlVmFsdWUgYWZ0ZXJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2NhaXRwL2FuZ3VsYXIuanMvY29tbWl0LzkyYmJiNWUyMjUyNTNlYmRkZDM4ZWY1NzM1ZDY2ZmZlZjc2YjZhMTQgd2lsbCBiZSBhcHBsaWVkXG4gIGZ1bmN0aW9uIGdldFN0eWxlVmFsdWUoX25hbWU6IGFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGVzW19uYW1lXSk7XG4gIH1cblxuICBmb3IgKDsgaSA8IDQ7IGkgKz0gMikge1xuICAgIC8vIGJvdGggYm94IG1vZGVscyBleGNsdWRlIG1hcmdpbiwgc28gYWRkIGl0IGlmIHdlIHdhbnQgaXRcbiAgICBpZiAoZXh0cmEgPT09ICdtYXJnaW4nKSB7XG4gICAgICB2YWwgKz0gZ2V0U3R5bGVWYWx1ZShleHRyYSArIGNzc0V4cGFuZFtpXSk7XG4gICAgfVxuXG4gICAgaWYgKGlzQm9yZGVyQm94KSB7XG4gICAgICAvLyBib3JkZXItYm94IGluY2x1ZGVzIHBhZGRpbmcsIHNvIHJlbW92ZSBpdCBpZiB3ZSB3YW50IGNvbnRlbnRcbiAgICAgIGlmIChleHRyYSA9PT0gJ2NvbnRlbnQnKSB7XG4gICAgICAgIHZhbCAtPSBnZXRTdHlsZVZhbHVlKCdwYWRkaW5nJyArIGNzc0V4cGFuZFtpXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGJvcmRlciBub3IgbWFyZ2luLCBzbyByZW1vdmUgYm9yZGVyXG4gICAgICBpZiAoZXh0cmEgIT09ICdtYXJnaW4nKSB7XG4gICAgICAgIHZhbCAtPSBnZXRTdHlsZVZhbHVlKCdib3JkZXInICsgY3NzRXhwYW5kW2ldICsgJ1dpZHRoJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbCArPSBnZXRTdHlsZVZhbHVlKCdwYWRkaW5nJyArIGNzc0V4cGFuZFtpXSk7XG5cbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQgbm9yIHBhZGRpbmcsIHNvIGFkZCBib3JkZXJcbiAgICAgIGlmIChleHRyYSAhPT0gJ3BhZGRpbmcnKSB7XG4gICAgICAgIHZhbCArPSBnZXRTdHlsZVZhbHVlKCdib3JkZXInICsgY3NzRXhwYW5kW2ldICsgJ1dpZHRoJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93KGVsZW06IGFueSk6IGFueSB7XG4gIHJldHVybiBlbGVtICE9IG51bGwgJiYgZWxlbSA9PT0gZWxlbS53aW5kb3cgPyBlbGVtIDogZWxlbS5ub2RlVHlwZSA9PT0gOSAmJiBlbGVtLmRlZmF1bHRWaWV3O1xufVxuXG5mdW5jdGlvbiBnZXRPZmZzZXQoZWxlbTogYW55KTogYW55IHtcbiAgbGV0IGRvY0VsZW06IGFueSwgd2luOiBhbnk7XG4gIGNvbnN0IGJveDogYW55ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgZG9jOiBhbnkgPSBlbGVtICYmIGVsZW0ub3duZXJEb2N1bWVudDtcblxuICBpZiAoIWRvYykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICB3aW4gPSBnZXRXaW5kb3coZG9jKTtcblxuICByZXR1cm4ge1xuICAgIHRvcDogYm94LnRvcCArIHdpbi5wYWdlWU9mZnNldCAtIGRvY0VsZW0uY2xpZW50VG9wLFxuICAgIGxlZnQ6IGJveC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRMZWZ0XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxBY3RpdmVPcHRpb24obGlzdDogSFRNTEVsZW1lbnQsIGl0ZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIGxldCB5OiBhbnksIGhlaWdodF9tZW51OiBhbnksIGhlaWdodF9pdGVtOiBhbnksIHNjcm9sbDogYW55LCBzY3JvbGxfdG9wOiBhbnksIHNjcm9sbF9ib3R0b206IGFueTtcblxuICBpZiAoaXRlbSkge1xuICAgIGhlaWdodF9tZW51ID0gbGlzdC5vZmZzZXRIZWlnaHQ7XG4gICAgaGVpZ2h0X2l0ZW0gPSBnZXRXaWR0aE9ySGVpZ2h0KGl0ZW0sICdoZWlnaHQnLCAnbWFyZ2luJyk7IC8vIG91dGVySGVpZ2h0KHRydWUpO1xuICAgIHNjcm9sbCA9IGxpc3Quc2Nyb2xsVG9wIHx8IDA7XG4gICAgeSA9IGdldE9mZnNldChpdGVtKS50b3AgLSBnZXRPZmZzZXQobGlzdCkudG9wICsgc2Nyb2xsO1xuICAgIHNjcm9sbF90b3AgPSB5O1xuICAgIHNjcm9sbF9ib3R0b20gPSB5IC0gaGVpZ2h0X21lbnUgKyBoZWlnaHRfaXRlbTtcblxuICAgIC8vIFRPRE8gTWFrZSBhbmltYXRpb25cbiAgICBpZiAoeSArIGhlaWdodF9pdGVtID4gaGVpZ2h0X21lbnUgKyBzY3JvbGwpIHtcbiAgICAgIGxpc3Quc2Nyb2xsVG9wID0gc2Nyb2xsX2JvdHRvbTtcbiAgICB9IGVsc2UgaWYgKHkgPCBzY3JvbGwpIHtcbiAgICAgIGxpc3Quc2Nyb2xsVG9wID0gc2Nyb2xsX3RvcDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodChlbGVtOiBhbnksIG5hbWU6IGFueSwgZXh0cmE6IGFueSk6IGFueSB7XG5cbiAgLy8gU3RhcnQgd2l0aCBvZmZzZXQgcHJvcGVydHksIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJvcmRlci1ib3ggdmFsdWVcbiAgY29uc3QgdmFsdWVJc0JvcmRlckJveCA9IHRydWU7XG4gIGxldCB2YWw6IGFueSA9IG5hbWUgPT09ICd3aWR0aCcgPyBlbGVtLm9mZnNldFdpZHRoIDogZWxlbS5vZmZzZXRIZWlnaHQ7XG4gIGNvbnN0IHN0eWxlczogYW55ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCk7XG4gIGNvbnN0IGlzQm9yZGVyQm94ID0gZmFsc2U7IC8vIGpRdWVyeS5zdXBwb3J0LmJveFNpemluZyAmJiBqUXVlcnkuY3NzKCBlbGVtLCAnYm94U2l6aW5nJywgZmFsc2UsIHN0eWxlcyApID09PSAnYm9yZGVyLWJveCc7XG5cbiAgLy8gc29tZSBub24taHRtbCBlbGVtZW50cyByZXR1cm4gdW5kZWZpbmVkIGZvciBvZmZzZXRXaWR0aCwgc28gY2hlY2sgZm9yIG51bGwvdW5kZWZpbmVkXG4gIC8vIHN2ZyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY0OTI4NVxuICAvLyBNYXRoTUwgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD00OTE2NjhcbiAgaWYgKHZhbCA8PSAwIHx8IHZhbCA9PSBudWxsKSB7XG4gICAgLy8gRmFsbCBiYWNrIHRvIGNvbXB1dGVkIHRoZW4gdW5jb21wdXRlZCBjc3MgaWYgbmVjZXNzYXJ5XG4gICAgdmFsID0gc3R5bGVzW25hbWVdO1xuXG4gICAgaWYgKHZhbCA8IDAgfHwgdmFsID09IG51bGwpIHtcbiAgICAgIHZhbCA9IGVsZW0uc3R5bGVbbmFtZV07XG4gICAgfVxuXG4gICAgLy8gQ29tcHV0ZWQgdW5pdCBpcyBub3QgcGl4ZWxzLiBTdG9wIGhlcmUgYW5kIHJldHVybi5cbiAgICBpZiAocm51bW5vbnB4LnRlc3QodmFsKSkge1xuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICAvLyB3ZSBuZWVkIHRoZSBjaGVjayBmb3Igc3R5bGUgaW4gY2FzZSBhIGJyb3dzZXIgd2hpY2ggcmV0dXJucyB1bnJlbGlhYmxlIHZhbHVlc1xuICAgIC8vIGZvciBnZXRDb21wdXRlZFN0eWxlIHNpbGVudGx5IGZhbGxzIGJhY2sgdG8gdGhlIHJlbGlhYmxlIGVsZW0uc3R5bGVcbiAgICAvLyB2YWx1ZUlzQm9yZGVyQm94ID0gaXNCb3JkZXJCb3ggJiYgKCBqUXVlcnkuc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSB8fCB2YWwgPT09IGVsZW0uc3R5bGVbIG5hbWUgXSApO1xuXG4gICAgLy8gTm9ybWFsaXplICcnLCBhdXRvLCBhbmQgcHJlcGFyZSBmb3IgZXh0cmFcbiAgICB2YWwgPSBwYXJzZUZsb2F0KHZhbCkgfHwgMDtcbiAgfVxuXG4gIC8vIHVzZSB0aGUgYWN0aXZlIGJveC1zaXppbmcgbW9kZWwgdG8gYWRkL3N1YnRyYWN0IGlycmVsZXZhbnQgc3R5bGVzXG4gIHJldHVybiB2YWwgKyBhdWdtZW50V2lkdGhPckhlaWdodChuYW1lLCBleHRyYSB8fCAoaXNCb3JkZXJCb3ggPyAnYm9yZGVyJyA6ICdjb250ZW50JyksIHZhbHVlSXNCb3JkZXJCb3gsIHN0eWxlcyk7XG59XG4iXX0=