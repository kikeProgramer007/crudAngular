import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { CrudAngularComponent } from './components/crud-angular/crud-angular.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CrudAngularComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,      //añadir esto para formulario
    BrowserAnimationsModule,  //importamos el modulo de animacion
    ToastrModule.forRoot(),   //importar libreria toastr
    HttpClientModule          //importar para usar http
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
