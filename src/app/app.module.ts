import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound/pagenotfound.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
