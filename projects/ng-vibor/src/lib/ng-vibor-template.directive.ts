import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[viborDropdownElement]' })
export class ViborDropdownDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({ selector: '[viborSelectedElement]' })
export class ViborSelectedDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({ selector: '[viborBothElement]' })
export class ViborBothDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({ selector: '[viborCreate]' })
export class ViborCreateDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}
