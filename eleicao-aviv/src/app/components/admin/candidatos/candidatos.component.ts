import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
              private modalService: NgbModal,
              private toatr: ToastrService) { }

  public candidatos: Candidato[] = [];
  public onCandidatoInseridoOuAlteradoSubscripton!: Subscription;
  public carregando: boolean = false;

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
    this.carregando = true;
    this.candidatoService.listarCandidatos().subscribe({
      next: candidatos => {
        this.candidatos = candidatos;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.toatr.error('Erro ao carregar candidatos');
      }
    })
  }

  abrirModalCandidato(id: string) {
    const ref = this.modalService.open(EdicaoCandidatoComponent);
    ref.componentInstance.id = id;
  }

}
