import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargoCandidato } from 'src/app/@core/models/cargo-candidato.model';
import { Cargo } from 'src/app/@core/models/cargo.model';
import { Eleicao } from 'src/app/@core/models/eleicao.model';
import { Votacao } from 'src/app/@core/models/votacao.model';
import { CargoService } from 'src/app/@core/services/cargo.service';
import { EleicaoService } from 'src/app/@core/services/eleicao.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.scss']
})

export class VotacaoComponent implements OnInit {

  constructor(private eleicaoService: EleicaoService,
              private cargoService: CargoService,
              private router: Router) { }

  public exibeVotoRegistrado: boolean = false;
  public processandoVoto: boolean = false;

  public eleicao?: Eleicao;
  public cargo?: Cargo;
  public candidatos: CargoCandidato[] = [];
  public numeros = [7, 8, 9, 4, 5, 6, 3, 2, 1, 0];
  public numeroInserido: string = ""
  public candidatoSelecionado?: CargoCandidato;
  public fotoUrl!: string;

  ngOnInit() {
    this.eleicao = this.eleicaoService.eleicao;
    this.fotoUrl = `${environment.bucketFotosUrl}/`;

    if(!this.eleicao) {
      const eleicaoId = localStorage.getItem("eleicao-aviv.eleicao");

      if(eleicaoId) {
        this.eleicaoService.obterEleicaoPorCodigo(eleicaoId).subscribe({
          next: eleicao => {
            this.eleicao = eleicao;
            this.verificarCargo();
            setInterval(() => this.verificarCargo(), 10000);
          }
        });
      } else {
        this.router.navigate(['']);
      }
    }
  }

  verificarCargo() {
    this.cargoService.listarCargos(this.eleicao!._id).subscribe({
      next: cargos => {
        const cargoEmVotacao = cargos.find(c => c.dataInicioVotacao && !c.dataFimVotacao);

        if(!cargoEmVotacao) {
          this.cargo = undefined;
          return;
        }

        if(!this.cargo || this.cargo._id != cargoEmVotacao._id) {
          this.cargo = cargoEmVotacao;
          this.carregarCandidatos();
        }
      }
    });
  }

  carregarCandidatos() {
    this.cargoService.listarCandidatosDoCargo(this.cargo!._id).subscribe({
      next: candidatos => {
        this.candidatos = candidatos;
      }
    });
  }

  onNumeroInserido(numero: string) {
    this.numeroInserido+= numero;

    const candidato = this.candidatos.find(c => c.candidato.matricula === parseInt(this.numeroInserido));

    if(candidato) {
      this.candidatoSelecionado = candidato;
    }
  }

  limpar() {
    this.numeroInserido = "";
    this.candidatoSelecionado = undefined;
  }
}
