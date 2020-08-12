import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { NgViborComponent } from "./components/vibor/vibor.component";
import {
  ViborBothDirective,
  ViborCreateDirective,
  ViborDropdownDirective,
  ViborSelectedDirective,
} from "./directives/vibor-template.directive";

const PublicComponents = [NgViborComponent];
const PublicDirectives = [
  ViborBothDirective,
  ViborCreateDirective,
  ViborDropdownDirective,
  ViborSelectedDirective,
];

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [PublicComponents, PublicDirectives],
  exports: [PublicComponents, PublicDirectives, FormsModule],
})
export class NgViborModule {}
