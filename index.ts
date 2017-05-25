import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


export * from './src/vibor.component';

import { ViborComponent } from './src/vibor.component';
import { ViborBothDirective, ViborDropdownDirective, ViborSelectedDirective, ViborCreateDirective } from './src/vibor.template.directive';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [
    ViborComponent, ViborBothDirective, ViborDropdownDirective, ViborSelectedDirective, ViborCreateDirective
  ],
  exports: [
    ViborComponent, ViborBothDirective, ViborDropdownDirective, ViborSelectedDirective, ViborCreateDirective
  ]
})
export class ViborModule {}
