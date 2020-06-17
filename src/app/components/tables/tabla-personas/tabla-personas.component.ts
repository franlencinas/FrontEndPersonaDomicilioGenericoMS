import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/entidades/persona';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-tabla-personas',
  templateUrl: './tabla-personas.component.html',
  styleUrls: ['./tabla-personas.component.css']
})
export class TablaPersonasComponent implements OnInit {

  paginaActual : number     = 1;
  personas     : Persona [] = [];
  indice       : number;

  selectPersona: Persona = {
    id        : 0,
    nombre    : '',
    apellido  : '',
    dni       : 0,
    domicilio : 0
  }

  constructor(private srvc: PersonaService) { }

  ngOnInit(): void {
    this.getAllPersonas()
  }

  getAllPersonas() {
    this.srvc.getAllPersonas().subscribe(res => {
      this.personas = res;
    })
  }

  deletePersona(persona: Persona) {
    this.srvc.deletePersona(persona.id).subscribe(
      res => {
        const indexPersona = this.personas.indexOf(persona);
        this.personas.splice(indexPersona, 1);
      })
  }

  updatePersona(prsn: Persona) {
    this.selectPersona = prsn;
    this.indice = this.personas.indexOf(prsn);
  }

  resetPersona(){
    this.selectPersona = null;
  }
}
