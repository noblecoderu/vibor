export interface IDataResponse {
    data: Object,
    list: Array<Object>,
    headers: {}
}

export function fetchFromObject(object: Object, prop: string): any {
    if (typeof object === 'undefined') {
        return false;
    }

    var _index = prop.indexOf('.');
    if (_index > -1) {
        return this.fetchFromObject(object[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return object[prop];
}

export function defaultFormatter(data: any, valuePropertyName:string): string {
    let html: string = "";
    html += fetchFromObject(data, valuePropertyName) ? `<b>(${fetchFromObject(data, valuePropertyName)})</b>` : "";
    return html;
}