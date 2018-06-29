import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgViborComponent } from './ng-vibor.component';
import { ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective } from './ng-vibor-template.directive';
const components = [NgViborComponent, ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective]

@NgModule({
  imports: [
    FormsModule, CommonModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components, FormsModule
  ]
})
export class NgViborModule { }
