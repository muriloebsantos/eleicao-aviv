import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {Observable, OperatorFunction} from 'rxjs';
import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Candidato } from 'src/app/@core/models/candidato.model';
import { Cargo } from 'src/app/@core/models/cargo.model';
import { CandidatoService } from 'src/app/@core/services/candidato.service';

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
               private candidatoService: CandidatoService) { }

  public carregando: boolean = false;
  public nomeEleicao: string = "";
  public cargo!: Cargo;
  public candidatos: ConsultaCandidato[] = [];

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term: string) => term.length < 2 ? []
        : this.candidatos.filter(v => v.exibicao.toLowerCase().indexOf(term.toLowerCase()) > -1).map(v => v.exibicao).slice(0, 10))
  );

  ngOnInit() {
    this.carregarCandidatos();
  }

  carregarCandidatos() {
    this.candidatoService.listarCandidatos().subscribe({
      next: candidatos => {
        this.candidatos = candidatos.map(c => { 
          return {
          id: c._id,
          exibicao: `${c.matricula} - ${c.nome}`
          }
        });
      }
    });
  }

  onCandidatoSelecionado(event: any) {
    if(!event.item) 
      return;
    
    const id = this.candidatos.filter(c => c.exibicao === event.item)[0].id;

    alert(id);
  }

  fechar() {
    this.ref.close();
  }

}


