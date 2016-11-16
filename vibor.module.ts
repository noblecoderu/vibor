// DEFAULT MODULEs
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { CommonModule }         from '@angular/common';
import { HttpModule }           from '@angular/http';

// MY IMPORTS
import { ViborComponent  }                     from './vibor.component'


@NgModule({
    imports:      [ CommonModule, FormsModule ],
    declarations: [ ViborComponent ],
    exports:      [ ViborComponent ]
})
export class ViborModule { }
