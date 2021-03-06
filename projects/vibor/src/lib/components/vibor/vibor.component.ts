import {
  Component, OnInit, OnChanges,
  Input, Output, forwardRef,
  EventEmitter, ElementRef,
  TemplateRef, ContentChild, ViewChild,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgModel
} from '@angular/forms';

import { Subscription, Observable } from 'rxjs';

import {
    ViborBothDirective,
    ViborCreateDirective,
    ViborDropdownDirective,
    ViborSelectedDirective
} from '../../directives/vibor-template.directive';

import {
    IDataResponse,
    defaultFormatter,
    fetchFromObject,
    scrollActiveOption,
    deepEqual
} from '../../helpers';

declare type KeyboardTypes = "text" | "number" | "tel";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vibor',
  templateUrl: 'vibor.component.html',
  styleUrls: ['./vibor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgViborComponent),
    multi: true
  }]
})
export class NgViborComponent implements OnInit, OnChanges, ControlValueAccessor {
  // Local Variable
  public _model: any;

  private firstLoad = false;
  private options: Array<any>;
  public output: Array<any>;

  public isOpen: boolean;

  private oldQuery: string;
  public query: string;

  public selectorPosition = 0;

  private el: Element;           // this component  element `<vibor>`
  private inputEl: HTMLInputElement; // `<input>` element in `<vibor>` for auto complete
  @ViewChild('inputControl', { static: true }) public inputControl: NgModel;

  // Inputs & Outputs
  @Input() public waitTime = 500;
  @Input() public multiple = false;
  @Input() public multipleLimit = Infinity;
  @Input() public countOnPage = 10;

  @Input() public placeholder = 'Vibor';
  @Input() public name: string;
  @Input() public required = false;
  @Input() public allowReset = true;
  public disabled = false;

  // Отображение списков
  @ContentChild(ViborBothDirective) public bothTemplate: ViborBothDirective;
  @ContentChild(ViborDropdownDirective) public dropdownTemplate: ViborDropdownDirective;
  @ContentChild(ViborSelectedDirective) public selectedTemplate: ViborSelectedDirective;
  @ContentChild(ViborCreateDirective) public createTemplate: ViborCreateDirective;
  @Input() public listFormatter: (arg: any, value: string) => string;
  @Input() public dropdownFormatter: (arg: any, value: string) => string;
  @Input() public viewProperty = 'Name';  // Поле для дефолтного отображения

  @Input() public modelProperty = 'id';  // То, что записывается в Модель
  @Input() public preloadProperty = 'ids'; // Ключ запроса к серверу для предзагрузки, если undefined записывается весь объект
  @Input() public preloadField: string = undefined; // Значение поля, которе необходимо отправить в запрос.
  @Input() public searchProperty = 'query';

  @Input() public dataList: ((param: Object, page: number, countOnPage?: number) => Observable<IDataResponse>) | Array<any>;
  @Input() public excludeList: Array<any>;
  @Input() public additionalFilter = {};
  @Input() public onlyEmitter: boolean;

  @Input() public keyboardTypes: Array<KeyboardTypes> | KeyboardTypes | undefined;
  public currentKeyboardType: KeyboardTypes = "text";

  @Output('changeFullModel') public changeFullModel: EventEmitter<any> = new EventEmitter();


  @Input() public newMessage: string = undefined;
  @Input() public CreateNew: (query: string) => Observable<any> | any = (query: string) => {
    return query;
  }

  private durty: boolean = true;


  // Subscription
  public dataListSub: Subscription;


  // OPTIONS
  public TrackByFn(index: number): any {
    return index;
  }

  public showDropdownList(event: FocusEvent | MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.multiple && this.output.length >= this.multipleLimit) {
      return;
    }

    this.el.classList.add('open-vibor');
    setTimeout(() => this.inputEl.focus(), 10);
    this.updateOptions();
    this.onTouched();
  }

  private hideDropdownList(): void {
    this.el.classList.remove('open-vibor');
    this.isOpen = false;
    this.inputEl.blur();
    this.cdr.markForCheck();
  }

  public hideDropdownListWithDelay(event: FocusEvent): void {
    if (event.relatedTarget && event.relatedTarget["id"] === "viborChangeKeyboardButton") {
      setTimeout(() => this.inputEl.focus(), 300);
      return;
    }

    setTimeout(() => {
      this.hideDropdownList();
    }, 100);
  }

  public toggleDropdown(event: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.isOpen) {
      this.hideDropdownList();
    } else {
      this.showDropdownList(undefined);
    }
  }

  private delay: Function = (function (): Function {
    let timer;
    return function (callback: any, ms: number): void {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  public updateOptions(): void {
    this.isOpen = true;
    if (this.dataList instanceof Array) {
      this.options = this.dataList.filter(data => {
        if (!this.query || this.query.length === 0) {
          return true;
        }
        let f: any = fetchFromObject(data, this.searchProperty);
        if (f === undefined) {
          return false;
        }
        return JSON.stringify(f).toLowerCase().includes(this.query.toLowerCase());
      }).filter(data => {
        if (!this.excludeList) {
          return true;
        }

        let d = fetchFromObject(data, this.modelProperty).valueOf();
        return this.excludeList.findIndex(ex => {
          let a = fetchFromObject(ex, this.modelProperty).valueOf();
          return deepEqual(d, a);
        }) < 0;
      });
      this.durty = false;

    } else if (this.dataList instanceof Function) {
      if (this.dataListSub) { this.dataListSub.unsubscribe(); }
      if (!this.currentCache) {
        this.currentCache = {
          countElement: 0,
          countPages: 1,
          currentPage: 1,
          objects: [],
          query: this.query,
          params: Object.assign({}, this.additionalFilter)
        };
        this.cacheLazyData.push(this.currentCache);

        let params = Object.assign({}, this.additionalFilter) as any;
        params[this.searchProperty] = this.query;

        this.dataListSub = (<Observable<IDataResponse>>this.dataList(params, 1, this.countOnPage)).subscribe(answer => {
          if (answer) {
            this.currentCache.objects = this.currentCache.objects.concat(answer.list);
            if (answer.headers['count']) this.currentCache.countElement = answer.headers['count'];
            this.currentCache.countPages = Math.ceil(this.currentCache.countElement / this.countOnPage);
          }
          this.durty = false;

          this.cdr.markForCheck();
        }, () => { });
      }
    }
  }

  public updateOptionsInDelay(): void {
    let delayMs: number = this.dataList instanceof Array ? 10 : this.waitTime;

    // executing after user stopped typing
    this.delay(() => {
      this.oldQuery = this.query;
      this.currentCache = this.GetCache(this.query);
      this.updateOptions();
    }, delayMs);
  }

  private focusSelectedOption(): void {
    let list: any = <HTMLElement>this.el.getElementsByClassName('select-dropdown')[0];
    let targetLi: any = <HTMLElement>this.el.getElementsByClassName('select-dropdown-optgroup-option')[this.selectorPosition];
    scrollActiveOption(list, targetLi);
  }

  public keyDown(event: KeyboardEvent): void {
    if (!this.Options) {
      this.showDropdownList(undefined);
      return;
    }

    let totalNumItem: number = this.Options.length;

    if (this.ShowNew) {
      totalNumItem++;
    }

    switch (event.keyCode) {
      case 27: // ESC, hide auto complete
        this.hideDropdownList();
        break;

      case 38: // UP, select the previous li el
        this.selectorPosition = (totalNumItem + this.selectorPosition - 1) % totalNumItem;
        break;

      case 40: // DOWN, select the next li el or the first one
        this.isOpen = true;
        this.selectorPosition = (totalNumItem + this.selectorPosition + 1) % totalNumItem;
        break;

      case 13: // ENTER, choose it!!
        if (this.durty) return;

        if (totalNumItem > 0) {
          if (this.selectorPosition === this.Options.length) {
            this.AddNewObject(this.CreateNew(this.query));
          } else {
            this.selectOne(event, this.Options[this.selectorPosition]);
          }
        } else if (this.ShowNew) {
          this.AddNewObject(this.CreateNew(this.query));
        }
        this.focusSelectedOption();
        return;

      default: break;
    }

    if (!this.durty) {
      this.durty = true;
    }
    this.focusSelectedOption();
  }

  public nextPage($event: Event): void {
    $event.preventDefault();

    // Validators
    if (!(this.dataList instanceof Function)) {
      throw new Error('Data List mast be Function');
    }
    if (!this.currentCache) {
      throw new Error('For next page need cache for first Page');
    }
    if (this.currentCache.currentPage >= this.currentCache.countPages) { throw new Error('Max Page Limit'); }

    if (this.dataListSub) { this.dataListSub.unsubscribe(); }

    let params: any = Object.assign({}, this.additionalFilter);
    params[this.searchProperty] = this.query;

    this.dataListSub = this.dataList(params, this.currentCache.currentPage + 1, this.countOnPage).subscribe(answer => {
      this.currentCache.currentPage++;
      if (answer.headers['count']) this.currentCache.countElement = answer.headers['count'];
      this.currentCache.countPages = Math.ceil(this.currentCache.countElement / this.countOnPage);
      this.currentCache.objects = this.currentCache.objects.concat(answer.list);
      this.selectorPosition = (this.currentCache.currentPage - 1) * this.countOnPage + 1;
      this.focusSelectedOption();

      this.cdr.markForCheck();
    }, () => { });
  }

  // MODEL
  private clearProperty(): void {
    this.selectorPosition = 0;
    this.query = undefined;
    this.oldQuery = undefined;
    this.currentCache = this.GetCache(undefined);
  }

  public selectOne($event: MouseEvent | KeyboardEvent, data: any): void {
    // Фильтр ненужных событий
    if ($event instanceof MouseEvent && $event.button !== 0) { return; }

    if (this.multiple && this.output.length < this.multipleLimit) {
      this.output.push(data);
    } else if (!this.multiple) {
      this.output = [data];
    }
    this.changeFullModel.emit(this.output);
    this.Model = this.ValueFromOutput;
    this.clearProperty();
    this.hideDropdownList();
    $event.preventDefault();
  };

  public removeOne(index: number, event: Event): void {
    if (event) {
      event.stopPropagation();
    }


    this.output.splice(index, 1);
    this.Model = this.ValueFromOutput;

    // set class
    this.onTouched();
    this.inputControl.control.markAsTouched();

    // open dropdown
    if (this.required) {
      this.showDropdownList(undefined);
    }
  }

  // FORMATTING

  public get SelectedTemplate(): TemplateRef<any> {
    if (this.selectedTemplate) {
      return this.selectedTemplate.templateRef;
    } else if (this.bothTemplate) {
      return this.bothTemplate.templateRef;
    }
    return undefined;
  }

  public get DropdownTemplate(): TemplateRef<any> {
    if (this.dropdownTemplate) {
      return this.dropdownTemplate.templateRef;
    } else if (this.bothTemplate) {
      return this.bothTemplate.templateRef;
    }
    return undefined;
  }

  public getListFormatted(data: any): string {
    let formatter: any = this.listFormatter || defaultFormatter;
    return formatter.apply(this, [data, this.viewProperty]);
  }

  public getDropdownFormatted(data: any): string {
    let formatter: any = this.dropdownFormatter || defaultFormatter;
    return formatter.apply(this, [data, this.viewProperty]);
  }

  // INIT
  public ngOnInit(): void {
    // this.Model = this.ValueFromOutput; Это вроде тут тоже уже не надо.
    this.el = this.elementRef.nativeElement.getElementsByClassName('vibor').item(0);
    if (this.multiple) this.el.classList.add('multiple');
    if (this.required) this.el.classList.add('required');

    this.inputEl = <HTMLInputElement>(this.el.querySelector('input'));
  }

  public ngOnChanges(inputs: SimpleChanges): void {
    if (inputs['dataList'] && inputs['dataList'].currentValue) {
      // Output
      if (this.Model === undefined || this.Model == null) {
        this.output = [];
        this.changeFullModel.emit(this.output);
      } else if (this.Model instanceof Array && this.multiple) {
        this.Output = this.Model;
      } else if (!(this.Model instanceof Array) && !this.multiple) {
        this.Output = [this.Model];

        if (!this.output || !this.output.length) {
          this.Model = undefined;
        }
      }
    }

    if (this.el && inputs['multiple']) {
      if (inputs['multiple'].currentValue) {
        this.el.classList.add('multiple');
      } else {
        this.el.classList.remove('multiple');
      }
    }

    if (this.el && inputs['required']) {
      if (inputs['required'].currentValue) {
        this.el.classList.add('required');
      } else {
        this.el.classList.remove('required');
      }
    }

    if (inputs['additionalFilter']) {
      this.currentCache = this.GetCache(this.query);
    }

    if (inputs['keyboardTypes']) {
      let kType: KeyboardTypes = undefined;
      if (inputs['keyboardTypes'].currentValue instanceof Array) {
        kType = inputs['keyboardTypes'].currentValue[0];
      } else if (typeof(inputs['keyboardTypes'].currentValue) === "string") {
        kType = inputs['keyboardTypes'].currentValue as KeyboardTypes;
      }
      if (kType) {
        this.currentKeyboardType = kType;
      } else {
        this.currentKeyboardType = "text";
      }
    }
  }

  constructor(private elementRef: ElementRef<HTMLDivElement>, private cdr: ChangeDetectorRef) {
    this.output = [];
  }

  // FORMS
  public writeValue(value: any): void {
    // Нормальный update модели
    if (this.Model === value || value === "") return;

    if (value && ((value instanceof Array && !this.multiple) || (!(value instanceof Array) && this.multiple))) {
      throw new Error('Model Type Error');
    }
    if (value instanceof Array && this.Model instanceof Array) {
      if (value.length === this.Model.length && value.every(v => this.Model.indexOf(v) >= 0)) {
        return;
      }
    }
    this.firstLoad = true;
    this.Model = value;
  }

  public onChange: any = () => { };
  public onTouched: any = () => { };

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.el.setAttribute('disabled', 'disabled');
    } else {
      this.el.removeAttribute('disabled');
    }
    // disable other components here
  }

  set Model(value: any) {
    if (this.onlyEmitter) {
      this.output = [];
      this.onChange(value);
      return;
    }

    // Output
    if (value === undefined || value == null) {
      this.output = [];
      this.changeFullModel.emit(this.output);
    } else if (value instanceof Array && this.multiple) {
      this.Output = value;
    } else if (!(value instanceof Array) && !this.multiple) {
      this.Output = [value];
    }

    // Model
    if (value instanceof Array) {
      this._model = value.slice();
    } else {
      this._model = value;
    }

    // Forms
    this.onChange(this._model);
  }

  get Model(): any {
    return this._model;
  }

  // PROPERTY
  get InputHide(): boolean {
    if (this.multiple) {
      return this.output.length >= this.multipleLimit;
    } else {
      return this.output.length === 1 && !this.isOpen;
    }
  }

  get ValueFromOutput(): any {
    if (this.multiple) {
      let tmp: Array<any> = [];
      for (let o of this.output) {
        tmp.push(fetchFromObject(o, this.modelProperty));
      }
      return tmp.slice();
    } else {
      return fetchFromObject(this.output[0], this.modelProperty);
    }
  }

  set Output(newValue: Array<any>) {
    let dataList: Array<any> = [];
    if (this.dataList instanceof Array) {
      dataList = this.dataList;
      this.durty = false;
    } else if (this.dataList instanceof Function) {
      if (newValue && newValue.length && this.firstLoad) {
        let params: any = {};
        this.firstLoad = false;
        if (!this.preloadProperty) {
          this.output = newValue.slice();
          this.changeFullModel.emit(this.output);
        } else {
          params[this.preloadProperty] = newValue.map(val => fetchFromObject(val, this.preloadField));
          this.dataListSub = (<Observable<IDataResponse>>this.dataList(params, 1, this.countOnPage)).subscribe(answer => {
            this.output = answer.list.slice();
            this.changeFullModel.emit(this.output);
            this.durty = false;

            this.cdr.markForCheck();
          }, () => { });
        }
      } else {
        if (newValue.length === 0 || newValue === undefined) {
          this.output = [];
        }
        this.changeFullModel.emit(this.output);
      }
      return;
    } else {
      if (this.dataList === undefined) { return; }
      throw new Error('dataList value Error');
    }
    let newOutput: Array<any> = [];
    for (let v of newValue) {
      for (let d of dataList) {
        let a = fetchFromObject(d, this.modelProperty) ? fetchFromObject(d, this.modelProperty).valueOf() : undefined;
        let b = v ? v.valueOf() : undefined;
        if (deepEqual(a, b)) {
          newOutput.push(d);
        }
      }
    }
    this.output = newOutput;
    this.changeFullModel.emit(this.output);
  }

  get Options(): Array<any> {
    let options: Array<any>;
    if (this.dataList instanceof Array) {
      options = this.options;
    } else if (this.dataList instanceof Function) {
      let oldCache = this.GetCache(this.oldQuery);

      if (!this.currentCache && oldCache) {
        options = oldCache.objects;
      } else {
        options = this.currentCache ? this.currentCache.objects : [];
      }
    }
    return (options || []).filter(op => {
      return this.output.findIndex(o => {
        let a = fetchFromObject(o, this.modelProperty) ? fetchFromObject(o, this.modelProperty).valueOf() : undefined;
        let b = fetchFromObject(op, this.modelProperty) ? fetchFromObject(op, this.modelProperty).valueOf() : undefined;
        return deepEqual(a, b);
      }) === -1;
    });
  }

  public currentCache: CacheInfo;
  private GetCache(query: string): CacheInfo {
    if (this.dataList instanceof Function) {
      return this.cacheLazyData.find(cache => {
        return cache.query === this.query && deepEqual(cache.params, this.additionalFilter);
      })
    }
    return undefined;
  }

  // CreateNew

  public AddNewObject(value: Observable<any> | any): void {
    if (value instanceof Observable) {
      value.subscribe(newObject => {
        if (newObject !== undefined) {
          this.SetNewObject(newObject);
          this.cdr.markForCheck();
        }
      });
    } else {
      this.SetNewObject(value);
      this.cdr.markForCheck();
    }
  }

  private SetNewObject(newObject: any) {
    if (this.dataList instanceof Array) {
      if (!this.dataList.find(d => {
          let _d = fetchFromObject(d, this.modelProperty) ? fetchFromObject(d, this.modelProperty).valueOf() : undefined;
          let _n = fetchFromObject(newObject, this.modelProperty) ? fetchFromObject(newObject, this.modelProperty).valueOf() : undefined;
          return _d === _n;
        })
      ) {
        this.dataList.push(newObject);
      }
    } else if (this.dataList instanceof Function) {
      for (let cache of this.cacheLazyData) {
        if (this.query.includes(cache.query) || cache.query === undefined || cache.query === '') {
          cache.countElement++;
          cache.objects.push(newObject);
        }
      }
    }

    this.firstLoad = false;
    this.query = undefined;
    this.currentCache = this.GetCache(this.query);
    this.selectOne(new MouseEvent('click'), newObject);
  }

  get ShowNew(): boolean {
    let a = this.query && this.newMessage && (!this.dataListSub || this.dataListSub.closed);

    let b = this.Options.findIndex(o => {
      let c = fetchFromObject(o, this.viewProperty) ? fetchFromObject(o, this.viewProperty).valueOf() : undefined;
      return deepEqual(c, this.query);
    }) === -1 && this.output.findIndex(o => {
      let c = fetchFromObject(o, this.viewProperty) ? fetchFromObject(o, this.viewProperty).valueOf() : undefined;
      return deepEqual(c, this.query);
    }) === -1;

    return a && b;
  }

  get ShowEmpty(): boolean {
    return this.Options.length === 0 && (!(this.dataList instanceof Function) || (this.dataListSub.closed));
  }

  // Keyboard
  public ChangeKeyboardType() {
    this.currentKeyboardType = 'number';
  }


  // CACHE
  private cacheLazyData: Array<CacheInfo> = [];
}

export interface CacheInfo {
  countElement: number;
  countPages: number;
  currentPage: number;
  objects: Array<any>;

  query: string;
  params: any;
}
