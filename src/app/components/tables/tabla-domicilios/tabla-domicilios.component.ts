import { Component, OnInit } from '@angular/core';
import { Domicilio } from 'src/app/entidades/domicilio';
import { DomicilioService } from 'src/app/servicios/domicilio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabla-domicilios',
  templateUrl: './tabla-domicilios.component.html',
  styleUrls: ['./tabla-domicilios.component.css']
})
export class TablaDomiciliosComponent implements OnInit {

  
  paginaActual : number = 1;
  public domicilios : Domicilio [] = [];
  indice : number;

  public selectDomicilio: Domicilio = {
    id               : 0,
    calle  : '',
    numero : 0
  }

  constructor(private srvc: DomicilioService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllDomicilios();
  }
  getAllDomicilios() {
    this.srvc.getAllDomicilios().subscribe(res => {
      this.domicilios = res;
    })
  }

  deleteDomicilio(dmcl : Domicilio) {
    this.srvc.deleteDomicilio(dmcl.id).subscribe(
      res => {
        const indexPersona = this.domicilios.indexOf(dmcl);
        this.domicilios.splice(indexPersona, 1);
      })
  }

  updateDomicilio(dmcl: Domicilio) {
    this.selectDomicilio = dmcl;
    this.indice = this.domicilios.indexOf(dmcl);
  }

  resetDomicilio(){
    this.selectDomicilio = null;
  }

}
