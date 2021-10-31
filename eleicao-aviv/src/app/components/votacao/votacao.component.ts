import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eleicao } from 'src/app/@core/models/eleicao.model';
import { Votacao } from 'src/app/@core/models/votacao.model';
import { EleicaoService } from 'src/app/@core/services/eleicao.service';

const img = 'https://media.istockphoto.com/vectors/default-avatar-profile-icon-grey-photo-placeholder-vector-id1018999828?k=20&m=1018999828&s=170667a&w=0&h=tvLHB23bV5fQZBBgeDQX0LHKzTZIGfj5IOtYf3jVWzE=';
const img2 = 'https://chedidgrieco.com.br/wp-content/uploads/2016/11/nobody_m.original.jpg';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.scss']
})

export class VotacaoComponent implements OnInit {

  constructor(private eleicaoService: EleicaoService,
              private router: Router) { }

  public candidatoSelecionado: number = 0;
  public exibeVotoRegistrado: boolean = false;
  public processandoVoto: boolean = false;

  public eleicao?: Eleicao;

  public votacao: Votacao = {
    nome: 'Votação para Secretário',
    id: 'f445da-d4d5ad45-d4a44',
    candidatos: [
    
    ]
  };

  ngOnInit() {
    this.eleicao = this.eleicaoService.eleicao;

    if(!this.eleicao) {
      const eleicaoId = localStorage.getItem("eleicao-aviv.eleicao");

      if(eleicaoId) {
        this.eleicaoService.obterEleicaoPorCodigo(eleicaoId).subscribe({
          next: eleicao => this.eleicao = eleicao
        });
      } else {
        this.router.navigate(['']);
      }
    }
  }

  selecionarCandidato(candidatoId: number) {
    this.candidatoSelecionado = candidatoId;
  }

  confirmarVoto() {
    console.log("votou");
    this.processandoVoto = true;

    setTimeout(() => {
      this.exibeVotoRegistrado = true;
      this.processandoVoto = false;
      this.candidatoSelecionado = 0;
      setTimeout(() => {
        this.exibeVotoRegistrado = false;
      }, 10000);
    }, 1500);
  }

}
