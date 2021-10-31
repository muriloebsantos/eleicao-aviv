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
  
  ngOnInit() {
    this.carregarEleicoes();
  }

  carregarEleicoes() {
    this.eleicaoService.listarEleicoes().subscribe({
      next: eleicoes => this.eleicoes = eleicoes,
      error: () => this.toastr.error('Erro ao obter eleições')
    })
  }

}
