import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Candidato } from 'src/app/@core/models/candidato.model';
import { CandidatoService } from 'src/app/@core/services/candidato.service';
import { EdicaoCandidatoComponent } from './edicao-candidato/edicao-candidato.component';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit, OnDestroy {

  constructor(private candidatoService: CandidatoService,
              private modalService: NgbModal) { }

  public candidatos: Candidato[] = [];
  public onCandidatoInseridoOuAlteradoSubscripton!: Subscription;

  ngOnInit() {
    this.carregarCandidatos();
    this.onCandidatoInseridoOuAlteradoSubscripton = this.candidatoService.onCandidatoInseridoOuAlterado.subscribe({
      next: () => this.carregarCandidatos()
    });
  }

  ngOnDestroy() {
    this.onCandidatoInseridoOuAlteradoSubscripton.unsubscribe();
  }

  carregarCandidatos() {
    this.candidatoService.listarCandidatos().subscribe({
      next: candidatos => {
        this.candidatos = candidatos;
      }
    })
  }

  abrirModalCandidato(id: string) {
    const ref = this.modalService.open(EdicaoCandidatoComponent);
    ref.componentInstance.id = id;
  }

}
