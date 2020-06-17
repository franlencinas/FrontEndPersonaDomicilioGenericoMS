import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablaDomiciliosComponent } from './components/tables/tabla-domicilios/tabla-domicilios.component';
import { TablaPersonasComponent } from './components/tables/tabla-personas/tabla-personas.component';


const routes: Routes = [
  {path: '', component : TablaPersonasComponent},
  {path: 'domicilios/:id', component : TablaDomiciliosComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
