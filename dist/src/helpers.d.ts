export interface IDataResponse {
    data: Object;
    list: Array<Object>;
    headers: any;
}
export declare function fetchFromObject(object: any, prop: string): any;
export declare function defaultFormatter(data: any, valuePropertyName: string): string;
export declare function scrollActiveOption(list: HTMLElement, item: HTMLElement): void;
