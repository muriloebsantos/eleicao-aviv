import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {Observable, OperatorFunction} from 'rxjs';
import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { CargoCandidato } from 'src/app/@core/models/cargo-candidato.model';
import { Cargo } from 'src/app/@core/models/cargo.model';
import { CandidatoService } from 'src/app/@core/services/candidato.service';
import { CargoService } from 'src/app/@core/services/cargo.service';

type ConsultaCandidato = {
  id: string,
  exibicao: string
};

@Component({
  selector: 'app-cargo-candidatos',
  templateUrl: './cargo-candidatos.component.html',
  styleUrls: ['./cargo-candidatos.component.scss']
})
export class CargoCandidatosComponent implements OnInit {

  constructor( private toastr: ToastrService,
               private ref: NgbActiveModal,
               private candidatoService: CandidatoService,
               private cargoService: CargoService) { }

  public carregando: boolean = false;
  public nomeEleicao: string = "";
  public cargo!: Cargo;
  public candidatos: ConsultaCandidato[] = [];
  public candidatosCargo: CargoCandidato[] = [];

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term: string) => term.length < 2 ? []
        : this.candidatos.filter(v => v.exibicao.toLowerCase().indexOf(term.toLowerCase()) > -1).map(v => v.exibicao).slice(0, 10))
  );

  ngOnInit() {
    this.carregarCandidatosCargo();
    this.carregarCandidatos();
  }

  carregarCandidatos() {
    this.carregando = true;
    this.candidatoService.listarCandidatos().subscribe({
      next: candidatos => {
        this.candidatos = candidatos.map(c => { 
          return {
          id: c._id,
          exibicao: `${c.matricula} - ${c.nome}`
          }
        });
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.toastr.error('Erro ao carregar lista de candidatos');
      }
    });
  }

  carregarCandidatosCargo() {
    this.carregando = true;
    this.cargoService.listarCandidatosDoCargo(this.cargo._id).subscribe({
      next: candidatos => {
        this.candidatosCargo = candidatos;
        this.carregando = false;
      },
      error: () => {
        this.toastr.error('Erro ao obter candidatos do cargo');
        this.carregando = false;
      }
    })
  }

  onCandidatoSelecionado(event: any) { 
    if(!event.item) 
      return;
  
    this.salvar([this.candidatos.filter(c => c.exibicao === event.item)[0].id]);
  }

  salvar(ids: string[]) {
    this.carregando = true;
    this.cargoService.adicionarCandidatosAoCargo(this.cargo._id, ids).subscribe({
      next: () => {
        this.toastr.success('Adicionado!');
        this.carregando = false;
        this.carregarCandidatosCargo();
      },
      error: (err: HttpErrorResponse) => {
        if(err.status != 500) {
          this.toastr.error(err.error);
        } else {
          this.toastr.error('Erro ao adicionar o candidato ao cargo!');
        }
        this.carregando = false;
      }
    })
  }

  excluir(id: string) {
    this.carregando = true;
    this.cargoService.removerCandidatoDoCargo(this.cargo._id, id).subscribe({
      next: () => {
        this.toastr.success('Removido!');
        this.carregando = false;
        this.candidatosCargo = this.candidatosCargo.filter(c => c._id != id);
      },
      error: () => {
        this.toastr.error('Erro ao remover candidato do cargo');
        this.carregando = false;
      }
    });
  }

  adicionarTodos() {
    if(!confirm('Deseja adicionar todos os candidatos cadastrados nesse cargo?')) {
      return;
    }

    this.salvar(this.candidatos.map(c => c.id));
  }

  assumir(cargoCandidato: CargoCandidato) {

  }

  rejeitar(cargoCandidato: CargoCandidato) {
    
  }

  fechar() {
    this.ref.close();
  }
}


