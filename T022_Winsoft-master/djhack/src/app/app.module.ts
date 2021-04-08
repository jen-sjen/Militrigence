import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';

import { HttpClientModule } from '@angular/common/http';
import { DecryptComponent } from './decrypt/decrypt.component';
import { UserinputComponent } from './userinput/userinput.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    DecryptComponent,
    UserinputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
