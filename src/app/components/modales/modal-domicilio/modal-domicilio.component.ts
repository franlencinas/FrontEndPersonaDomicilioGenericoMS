import { Component, OnInit, ElementRef, ViewChild, Host, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomicilioService } from 'src/app/servicios/domicilio.service';
import { TablaDomiciliosComponent } from '../../tables/tabla-domicilios/tabla-domicilios.component';
import { Domicilio } from 'src/app/entidades/domicilio';

@Component({
  selector: 'app-modal-domicilio',
  templateUrl: './modal-domicilio.component.html',
  styleUrls: ['./modal-domicilio.component.css']
})
export class ModalDomicilioComponent implements OnInit {

  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;

  formGroup : FormGroup;
  domicilio : any;
  editado   : boolean = false;

  constructor(
    private srvc          : DomicilioService, 
    @Host() private table : TablaDomiciliosComponent, 
    private formBuilder   : FormBuilder
  ) { }

  @Input() set selectDomicilio(val){
    this.buildDomicilios()
    if (val) {
      this.domicilio = val;
      this.formGroup.patchValue({
        id               : val.id,
        calle  : val.calle,
        numero : val.numero
      })
      if (val.id !== 0) {
        this.editado = true;
      } else {
        this.editado = false;
      }
    }
  }

  ngOnInit() : void {
    this.buildDomicilios()
  }

  buildDomicilios() : void{
    this.formGroup = this.formBuilder.group({
      id               : null,
      calle  : new FormControl('', [Validators.required, , Validators.pattern(/^[0-9]\d*$/)]),
      numero : new FormControl('', [Validators.required, , Validators.pattern(/^[0-9]\d*$/)])
    })
  }

  saveDomicilios(formDomicilio: FormGroup) : void {
    if (formDomicilio.value.id === null) {
      this.postDomicilio(formDomicilio.value)
    } else {
      this.updateDomicilio(formDomicilio.value)
    }
    this.btnClose.nativeElement.click()
    this.table.indice = null;
  }

  postDomicilio(dmcl : Domicilio) : void{
    this.srvc.postDomicilio(dmcl).subscribe(
      res => {
        this.table.domicilios.push(res)
      }
    )
  }

  updateDomicilio(dmcl : Domicilio) : void{
    res => {
      this.table.domicilios.splice(this.table.indice, 1, dmcl)
    }
  }

  onClose() : void{
    this.selectDomicilio = null;
  }
}
