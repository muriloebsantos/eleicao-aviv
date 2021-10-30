import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Candidato } from 'src/app/@core/models/candidato.model';
import { CandidatoService } from 'src/app/@core/services/candidato.service';
import { EdicaoCandidatoComponent } from './edicao-candidato/edicao-candidato.component';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit {

  constructor(private candidatoService: CandidatoService,
              private modalService: NgbModal) { }

  public candidatos: Candidato[] = [];

  ngOnInit() {
    this.carregarCandidatos();
  }

  carregarCandidatos() {
    this.candidatoService.listarCandidatos().subscribe({
      next: candidatos => {
        this.candidatos = candidatos;
      }
    })
  }

  abrirModalCandidato(id: number) {
    this.modalService.open(EdicaoCandidatoComponent);
  }

}
