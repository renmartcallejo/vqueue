import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRouter } from './register-routing';
import { CoreModule } from '../../core/core.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    CoreModule,
    ClarityModule,
    RegisterRouter,
    FormsModule
  ]
})
export class RegisterModule { }
