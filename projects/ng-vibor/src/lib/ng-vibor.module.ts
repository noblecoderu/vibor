import { NgModule } from '@angular/core';
import { NgViborComponent } from './ng-vibor.component';
import { ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective } from './ng-vibor-template.directive';

@NgModule({
  imports: [],
  declarations: [
    NgViborComponent,
    ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective
  ],
  exports: [NgViborComponent]
})
export class NgViborModule { }
