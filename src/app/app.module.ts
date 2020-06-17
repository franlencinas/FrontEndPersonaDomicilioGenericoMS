import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ModalPersonaComponent } from './components/modales/modal-persona/modal-persona.component';
import { ModalDomicilioComponent } from './components/modales/modal-domicilio/modal-domicilio.component';
import { TablaPersonasComponent } from './components/tables/tabla-personas/tabla-personas.component';
import { TablaDomiciliosComponent } from './components/tables/tabla-domicilios/tabla-domicilios.component';
import { PersonaService } from './servicios/persona.service';
import { DomicilioService } from './servicios/domicilio.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModalPersonaComponent,
    ModalDomicilioComponent,
    TablaPersonasComponent,
    TablaDomiciliosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [PersonaService, DomicilioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
