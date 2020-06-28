import { DropdownDirective } from './../../service/dropdown.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {DialogModule} from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [HomeComponent, DropdownDirective],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class HomeModule { }
