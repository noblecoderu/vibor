/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from './app.module';
import * as import2 from '@angular/common/src/common_module';
import * as import3 from '@angular/core/src/application_module';
import * as import4 from '@angular/platform-browser/src/browser';
import * as import5 from '@angular/forms/src/directives';
import * as import6 from '@angular/forms/src/form_providers';
import * as import7 from '@angular/http/src/http_module';
import * as import8 from './vibor-module/vibor.module';
import * as import9 from '@angular/common/src/localization';
import * as import10 from '@angular/core/src/application_init';
import * as import11 from '@angular/core/src/testability/testability';
import * as import12 from '@angular/core/src/application_ref';
import * as import13 from '@angular/core/src/linker/compiler';
import * as import14 from '@angular/platform-browser/src/dom/events/hammer_gestures';
import * as import15 from '@angular/platform-browser/src/dom/events/event_manager';
import * as import16 from '@angular/platform-browser/src/dom/shared_styles_host';
import * as import17 from '@angular/platform-browser/src/dom/dom_renderer';
import * as import18 from '@angular/platform-browser/src/security/dom_sanitization_service';
import * as import19 from '@angular/core/src/animation/animation_queue';
import * as import20 from '@angular/core/src/linker/view_utils';
import * as import21 from '@angular/platform-browser/src/browser/title';
import * as import22 from '@angular/forms/src/directives/radio_control_value_accessor';
import * as import23 from '@angular/http/src/backends/browser_xhr';
import * as import24 from '@angular/http/src/base_response_options';
import * as import25 from '@angular/http/src/backends/xhr_backend';
import * as import26 from '@angular/http/src/base_request_options';
import * as import27 from '@angular/core/src/di/injector';
import * as import28 from './app.component.ngfactory';
import * as import29 from '@angular/core/src/i18n/tokens';
import * as import30 from '@angular/core/src/application_tokens';
import * as import31 from '@angular/platform-browser/src/dom/events/dom_events';
import * as import32 from '@angular/platform-browser/src/dom/events/key_events';
import * as import33 from '@angular/core/src/zone/ng_zone';
import * as import34 from '@angular/platform-browser/src/dom/debug/ng_probe';
import * as import35 from '@angular/core/src/console';
import * as import36 from '@angular/core/src/error_handler';
import * as import37 from '@angular/platform-browser/src/dom/dom_tokens';
import * as import38 from '@angular/platform-browser/src/dom/animation_driver';
import * as import39 from '@angular/core/src/render/api';
import * as import40 from '@angular/core/src/security';
import * as import41 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import42 from '@angular/core/src/change_detection/differs/keyvalue_differs';
import * as import43 from '@angular/http/src/interfaces';
import * as import44 from '@angular/http/src/http';
class AppModuleInjector extends import0.NgModuleInjector<import1.AppModule> {
  _CommonModule_0:import2.CommonModule;
  _ApplicationModule_1:import3.ApplicationModule;
  _BrowserModule_2:import4.BrowserModule;
  _InternalFormsSharedModule_3:import5.InternalFormsSharedModule;
  _FormsModule_4:import6.FormsModule;
  _HttpModule_5:import7.HttpModule;
  _ViborModule_6:import8.ViborModule;
  _AppModule_7:import1.AppModule;
  __LOCALE_ID_8:any;
  __NgLocalization_9:import9.NgLocaleLocalization;
  _ErrorHandler_10:any;
  _ApplicationInitStatus_11:import10.ApplicationInitStatus;
  _Testability_12:import11.Testability;
  _ApplicationRef__13:import12.ApplicationRef_;
  __ApplicationRef_14:any;
  __Compiler_15:import13.Compiler;
  __APP_ID_16:any;
  __DOCUMENT_17:any;
  __HAMMER_GESTURE_CONFIG_18:import14.HammerGestureConfig;
  __EVENT_MANAGER_PLUGINS_19:any[];
  __EventManager_20:import15.EventManager;
  _DomSharedStylesHost_21:import16.DomSharedStylesHost;
  __AnimationDriver_22:any;
  __DomRootRenderer_23:import17.DomRootRenderer_;
  __RootRenderer_24:any;
  __DomSanitizer_25:import18.DomSanitizerImpl;
  __Sanitizer_26:any;
  __AnimationQueue_27:import19.AnimationQueue;
  __ViewUtils_28:import20.ViewUtils;
  __IterableDiffers_29:any;
  __KeyValueDiffers_30:any;
  __SharedStylesHost_31:any;
  __Title_32:import21.Title;
  __RadioControlRegistry_33:import22.RadioControlRegistry;
  __BrowserXhr_34:import23.BrowserXhr;
  __ResponseOptions_35:import24.BaseResponseOptions;
  __XSRFStrategy_36:any;
  __XHRBackend_37:import25.XHRBackend;
  __RequestOptions_38:import26.BaseRequestOptions;
  __Http_39:any;
  constructor(parent:import27.Injector) {
    super(parent,[import28.AppComponentNgFactory],[import28.AppComponentNgFactory]);
  }
  get _LOCALE_ID_8():any {
    if ((this.__LOCALE_ID_8 == null)) { (this.__LOCALE_ID_8 = import3._localeFactory(this.parent.get(import29.LOCALE_ID,(null as any)))); }
    return this.__LOCALE_ID_8;
  }
  get _NgLocalization_9():import9.NgLocaleLocalization {
    if ((this.__NgLocalization_9 == null)) { (this.__NgLocalization_9 = new import9.NgLocaleLocalization(this._LOCALE_ID_8)); }
    return this.__NgLocalization_9;
  }
  get _ApplicationRef_14():any {
    if ((this.__ApplicationRef_14 == null)) { (this.__ApplicationRef_14 = this._ApplicationRef__13); }
    return this.__ApplicationRef_14;
  }
  get _Compiler_15():import13.Compiler {
    if ((this.__Compiler_15 == null)) { (this.__Compiler_15 = new import13.Compiler()); }
    return this.__Compiler_15;
  }
  get _APP_ID_16():any {
    if ((this.__APP_ID_16 == null)) { (this.__APP_ID_16 = import30._appIdRandomProviderFactory()); }
    return this.__APP_ID_16;
  }
  get _DOCUMENT_17():any {
    if ((this.__DOCUMENT_17 == null)) { (this.__DOCUMENT_17 = import4._document()); }
    return this.__DOCUMENT_17;
  }
  get _HAMMER_GESTURE_CONFIG_18():import14.HammerGestureConfig {
    if ((this.__HAMMER_GESTURE_CONFIG_18 == null)) { (this.__HAMMER_GESTURE_CONFIG_18 = new import14.HammerGestureConfig()); }
    return this.__HAMMER_GESTURE_CONFIG_18;
  }
  get _EVENT_MANAGER_PLUGINS_19():any[] {
    if ((this.__EVENT_MANAGER_PLUGINS_19 == null)) { (this.__EVENT_MANAGER_PLUGINS_19 = [
      new import31.DomEventsPlugin(),
      new import32.KeyEventsPlugin(),
      new import14.HammerGesturesPlugin(this._HAMMER_GESTURE_CONFIG_18)
    ]
    ); }
    return this.__EVENT_MANAGER_PLUGINS_19;
  }
  get _EventManager_20():import15.EventManager {
    if ((this.__EventManager_20 == null)) { (this.__EventManager_20 = new import15.EventManager(this._EVENT_MANAGER_PLUGINS_19,this.parent.get(import33.NgZone))); }
    return this.__EventManager_20;
  }
  get _AnimationDriver_22():any {
    if ((this.__AnimationDriver_22 == null)) { (this.__AnimationDriver_22 = import4._resolveDefaultAnimationDriver()); }
    return this.__AnimationDriver_22;
  }
  get _DomRootRenderer_23():import17.DomRootRenderer_ {
    if ((this.__DomRootRenderer_23 == null)) { (this.__DomRootRenderer_23 = new import17.DomRootRenderer_(this._DOCUMENT_17,this._EventManager_20,this._DomSharedStylesHost_21,this._AnimationDriver_22,this._APP_ID_16)); }
    return this.__DomRootRenderer_23;
  }
  get _RootRenderer_24():any {
    if ((this.__RootRenderer_24 == null)) { (this.__RootRenderer_24 = import34._createConditionalRootRenderer(this._DomRootRenderer_23,this.parent.get(import34.NgProbeToken,(null as any)),this.parent.get(import12.NgProbeToken,(null as any)))); }
    return this.__RootRenderer_24;
  }
  get _DomSanitizer_25():import18.DomSanitizerImpl {
    if ((this.__DomSanitizer_25 == null)) { (this.__DomSanitizer_25 = new import18.DomSanitizerImpl()); }
    return this.__DomSanitizer_25;
  }
  get _Sanitizer_26():any {
    if ((this.__Sanitizer_26 == null)) { (this.__Sanitizer_26 = this._DomSanitizer_25); }
    return this.__Sanitizer_26;
  }
  get _AnimationQueue_27():import19.AnimationQueue {
    if ((this.__AnimationQueue_27 == null)) { (this.__AnimationQueue_27 = new import19.AnimationQueue(this.parent.get(import33.NgZone))); }
    return this.__AnimationQueue_27;
  }
  get _ViewUtils_28():import20.ViewUtils {
    if ((this.__ViewUtils_28 == null)) { (this.__ViewUtils_28 = new import20.ViewUtils(this._RootRenderer_24,this._Sanitizer_26,this._AnimationQueue_27)); }
    return this.__ViewUtils_28;
  }
  get _IterableDiffers_29():any {
    if ((this.__IterableDiffers_29 == null)) { (this.__IterableDiffers_29 = import3._iterableDiffersFactory()); }
    return this.__IterableDiffers_29;
  }
  get _KeyValueDiffers_30():any {
    if ((this.__KeyValueDiffers_30 == null)) { (this.__KeyValueDiffers_30 = import3._keyValueDiffersFactory()); }
    return this.__KeyValueDiffers_30;
  }
  get _SharedStylesHost_31():any {
    if ((this.__SharedStylesHost_31 == null)) { (this.__SharedStylesHost_31 = this._DomSharedStylesHost_21); }
    return this.__SharedStylesHost_31;
  }
  get _Title_32():import21.Title {
    if ((this.__Title_32 == null)) { (this.__Title_32 = new import21.Title()); }
    return this.__Title_32;
  }
  get _RadioControlRegistry_33():import22.RadioControlRegistry {
    if ((this.__RadioControlRegistry_33 == null)) { (this.__RadioControlRegistry_33 = new import22.RadioControlRegistry()); }
    return this.__RadioControlRegistry_33;
  }
  get _BrowserXhr_34():import23.BrowserXhr {
    if ((this.__BrowserXhr_34 == null)) { (this.__BrowserXhr_34 = new import23.BrowserXhr()); }
    return this.__BrowserXhr_34;
  }
  get _ResponseOptions_35():import24.BaseResponseOptions {
    if ((this.__ResponseOptions_35 == null)) { (this.__ResponseOptions_35 = new import24.BaseResponseOptions()); }
    return this.__ResponseOptions_35;
  }
  get _XSRFStrategy_36():any {
    if ((this.__XSRFStrategy_36 == null)) { (this.__XSRFStrategy_36 = import7._createDefaultCookieXSRFStrategy()); }
    return this.__XSRFStrategy_36;
  }
  get _XHRBackend_37():import25.XHRBackend {
    if ((this.__XHRBackend_37 == null)) { (this.__XHRBackend_37 = new import25.XHRBackend(this._BrowserXhr_34,this._ResponseOptions_35,this._XSRFStrategy_36)); }
    return this.__XHRBackend_37;
  }
  get _RequestOptions_38():import26.BaseRequestOptions {
    if ((this.__RequestOptions_38 == null)) { (this.__RequestOptions_38 = new import26.BaseRequestOptions()); }
    return this.__RequestOptions_38;
  }
  get _Http_39():any {
    if ((this.__Http_39 == null)) { (this.__Http_39 = import7.httpFactory(this._XHRBackend_37,this._RequestOptions_38)); }
    return this.__Http_39;
  }
  createInternal():import1.AppModule {
    this._CommonModule_0 = new import2.CommonModule();
    this._ApplicationModule_1 = new import3.ApplicationModule();
    this._BrowserModule_2 = new import4.BrowserModule(this.parent.get(import4.BrowserModule,(null as any)));
    this._InternalFormsSharedModule_3 = new import5.InternalFormsSharedModule();
    this._FormsModule_4 = new import6.FormsModule();
    this._HttpModule_5 = new import7.HttpModule();
    this._ViborModule_6 = new import8.ViborModule();
    this._AppModule_7 = new import1.AppModule();
    this._ErrorHandler_10 = import4.errorHandler();
    this._ApplicationInitStatus_11 = new import10.ApplicationInitStatus(this.parent.get(import10.APP_INITIALIZER,(null as any)));
    this._Testability_12 = new import11.Testability(this.parent.get(import33.NgZone));
    this._ApplicationRef__13 = new import12.ApplicationRef_(this.parent.get(import33.NgZone),this.parent.get(import35.Console),this,this._ErrorHandler_10,this,this._ApplicationInitStatus_11,this.parent.get(import11.TestabilityRegistry,(null as any)),this._Testability_12);
    this._DomSharedStylesHost_21 = new import16.DomSharedStylesHost(this._DOCUMENT_17);
    return this._AppModule_7;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.CommonModule)) { return this._CommonModule_0; }
    if ((token === import3.ApplicationModule)) { return this._ApplicationModule_1; }
    if ((token === import4.BrowserModule)) { return this._BrowserModule_2; }
    if ((token === import5.InternalFormsSharedModule)) { return this._InternalFormsSharedModule_3; }
    if ((token === import6.FormsModule)) { return this._FormsModule_4; }
    if ((token === import7.HttpModule)) { return this._HttpModule_5; }
    if ((token === import8.ViborModule)) { return this._ViborModule_6; }
    if ((token === import1.AppModule)) { return this._AppModule_7; }
    if ((token === import29.LOCALE_ID)) { return this._LOCALE_ID_8; }
    if ((token === import9.NgLocalization)) { return this._NgLocalization_9; }
    if ((token === import36.ErrorHandler)) { return this._ErrorHandler_10; }
    if ((token === import10.ApplicationInitStatus)) { return this._ApplicationInitStatus_11; }
    if ((token === import11.Testability)) { return this._Testability_12; }
    if ((token === import12.ApplicationRef_)) { return this._ApplicationRef__13; }
    if ((token === import12.ApplicationRef)) { return this._ApplicationRef_14; }
    if ((token === import13.Compiler)) { return this._Compiler_15; }
    if ((token === import30.APP_ID)) { return this._APP_ID_16; }
    if ((token === import37.DOCUMENT)) { return this._DOCUMENT_17; }
    if ((token === import14.HAMMER_GESTURE_CONFIG)) { return this._HAMMER_GESTURE_CONFIG_18; }
    if ((token === import15.EVENT_MANAGER_PLUGINS)) { return this._EVENT_MANAGER_PLUGINS_19; }
    if ((token === import15.EventManager)) { return this._EventManager_20; }
    if ((token === import16.DomSharedStylesHost)) { return this._DomSharedStylesHost_21; }
    if ((token === import38.AnimationDriver)) { return this._AnimationDriver_22; }
    if ((token === import17.DomRootRenderer)) { return this._DomRootRenderer_23; }
    if ((token === import39.RootRenderer)) { return this._RootRenderer_24; }
    if ((token === import18.DomSanitizer)) { return this._DomSanitizer_25; }
    if ((token === import40.Sanitizer)) { return this._Sanitizer_26; }
    if ((token === import19.AnimationQueue)) { return this._AnimationQueue_27; }
    if ((token === import20.ViewUtils)) { return this._ViewUtils_28; }
    if ((token === import41.IterableDiffers)) { return this._IterableDiffers_29; }
    if ((token === import42.KeyValueDiffers)) { return this._KeyValueDiffers_30; }
    if ((token === import16.SharedStylesHost)) { return this._SharedStylesHost_31; }
    if ((token === import21.Title)) { return this._Title_32; }
    if ((token === import22.RadioControlRegistry)) { return this._RadioControlRegistry_33; }
    if ((token === import23.BrowserXhr)) { return this._BrowserXhr_34; }
    if ((token === import24.ResponseOptions)) { return this._ResponseOptions_35; }
    if ((token === import43.XSRFStrategy)) { return this._XSRFStrategy_36; }
    if ((token === import25.XHRBackend)) { return this._XHRBackend_37; }
    if ((token === import26.RequestOptions)) { return this._RequestOptions_38; }
    if ((token === import44.Http)) { return this._Http_39; }
    return notFoundResult;
  }
  destroyInternal():void {
    this._ApplicationRef__13.ngOnDestroy();
    this._DomSharedStylesHost_21.ngOnDestroy();
  }
}
export const AppModuleNgFactory:import0.NgModuleFactory<import1.AppModule> = new import0.NgModuleFactory(AppModuleInjector,import1.AppModule);