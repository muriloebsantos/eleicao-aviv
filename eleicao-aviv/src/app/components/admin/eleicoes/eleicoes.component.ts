import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Eleicao } from 'src/app/@core/models/eleicao.model';
import { EleicaoService } from 'src/app/@core/services/eleicao.service';

@Component({
  selector: 'app-eleicoes',
  templateUrl: './eleicoes.component.html',
  styleUrls: ['./eleicoes.component.scss']
})
export class EleicoesComponent implements OnInit {

  constructor(private eleicaoService: EleicaoService,
              private toastr: ToastrService
    ) { }

  public eleicoes: Eleicao[] = [];
  public carregando: boolean = false;
  
  ngOnInit() {
    this.carregarEleicoes();
  }

  carregarEleicoes() {
    this.carregando = true;
    this.eleicaoService.listarEleicoes().subscribe({
      next: eleicoes => {
        this.eleicoes = eleicoes;
        this.carregando = false;
      },
      error: () => {
        this.toastr.error('Erro ao obter eleições');
        this.carregando = false;
      }
    })
  }

}
