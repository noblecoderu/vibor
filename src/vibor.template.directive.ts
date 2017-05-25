import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[vibor-dropdown-element]' })
export class ViborDropdownDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({ selector: '[vibor-selected-element]' })
export class ViborSelectedDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({ selector: '[vibor-both-element]' })
export class ViborBothDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({ selector: '[vibor-create]' })
export class ViborCreateDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}
