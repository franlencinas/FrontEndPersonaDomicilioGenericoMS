import { Component, OnInit, ViewChild, ElementRef, Host, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TablaPersonasComponent } from '../../tables/tabla-personas/tabla-personas.component';
import { Persona } from 'src/app/entidades/persona';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-persona',
  templateUrl: './modal-persona.component.html',
  styleUrls: ['./modal-persona.component.css']
})
export class ModalPersonaComponent implements OnInit {

  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;

  formGroup     : FormGroup;
  persona       : any;
  editado       : boolean = false;
  id_domcicilio : number;

  constructor(
    private srvc : PersonaService, 
    @Host() private table: TablaPersonasComponent, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  @Input() set selectPersona(val){
    this.buildPersonas()
    if (val) {
      this.persona = val;
      this.formGroup.patchValue({
        id           : val.id,
        nombre       : val.nombre,
        apellido     : val.apellido,
        dni          : val.dni,
        id_domicilio : val.id_domicilio
      })
      if (val.id !== 0) {
        this.editado = true;
      } else {
        this.editado = false;
      }
    }
  }
  ngOnInit() : void {
    this.buildPersonas()
    this.route.params.subscribe(data=>{
      this.id_domcicilio = data['id'];
    });
  }

  buildPersonas() : void{
    this.formGroup = this.formBuilder.group({
      id           : null,
      nombre       : new FormControl('', [Validators.required]),
      apellido     : new FormControl('', [Validators.required]),
      edad         : new FormControl('', [Validators.required, , Validators.pattern(/^[0-9]\d*$/)]),
      dni          : new FormControl('', [Validators.required, , Validators.pattern(/^[0-9]\d*$/)]),
      id_domicilio : new FormControl('', [Validators.required, , Validators.pattern(/^[0-9]\d*$/)]),
    })
  }

  savePersonas(formPersona: FormGroup) : void {
    if (formPersona.value.id === null) {
      this.postPersona(formPersona.value)
    } else {
      this.updatePersona(formPersona.value)
    }
    this.btnClose.nativeElement.click()
    this.table.indice = null;
  }

  postPersona(prsn : Persona) : void{
    this.srvc.postPersona(prsn).subscribe(
      res => {
        this.table.personas.push(res)
      }
    )
  }

  updatePersona(prsn : Persona) : void{
    res => {
      this.table.personas.splice(this.table.indice, 1, prsn)
    }
  }

  onClose() : void{
    this.selectPersona = null;
  }
}
