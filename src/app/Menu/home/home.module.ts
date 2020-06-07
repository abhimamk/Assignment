import { DropdownDirective } from './../../service/dropdown.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent, DropdownDirective],
  imports: [
    CommonModule,
    HomeRoutingModule,

  ]
})
export class HomeModule { }
