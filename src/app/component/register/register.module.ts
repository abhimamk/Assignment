import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule
  ]
})
export class RegisterModule { }
