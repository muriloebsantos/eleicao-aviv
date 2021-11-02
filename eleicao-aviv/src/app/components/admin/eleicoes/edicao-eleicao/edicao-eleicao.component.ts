import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Eleicao } from 'src/app/@core/models/eleicao.model';
import { EleicaoService } from 'src/app/@core/services/eleicao.service';

@Component({
  selector: 'app-edicao-eleicao',
  templateUrl: './edicao-eleicao.component.html',
  styleUrls: ['./edicao-eleicao.component.scss']
})
export class EdicaoEleicaoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
             private eleicaoService: EleicaoService,
             private toastr: ToastrService,
             private formBuilder: FormBuilder
    ) { }

  public nomeEleicao: string = "";
  public id: string = "";
  public formGroup!: FormGroup;
  public processando: boolean = false;
  public carregando: boolean = false;

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      _id: ['', [Validators.required, Validators.maxLength(30)]],
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      dataEleicao: [null, [Validators.required]],
      quantidadeEleitores: ['']
    });

    this.route.params.subscribe({
      next: params => {
         if(params.id !== "nova-eleicao") {
           this.id = params.id;
           this.obterEleicao();
         } else {
           this.novaEleicao();
         }
      }
    })
  }

  obterEleicao() {
    this.carregando = true;
    this.eleicaoService.obterEleicaoPorCodigo(this.id).subscribe({
      next: eleicao => {
        this.carregando = false;
        this.nomeEleicao = eleicao.nome;
        this.formGroup.patchValue(eleicao);
        this.formGroup.patchValue({ dataEleicao: formatDate(eleicao.dataEleicao, 'yyyy-MM-dd', 'en')});
        this.formGroup.get('_id')?.disable();
      },
      error: () => {
        this.toastr.error('Erro ao carregar a Eleição');
        this.carregando = false;
      }
    })
  }

  novaEleicao() {
    this.nomeEleicao = "Nova Eleição";
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    
    if(!this.formGroup.valid) {
      this.toastr.warning('Por favor, preencha os campos corretamente');
      return;
    }

    const eleicao = this.formGroup.value as Eleicao;

    if(!this.id) {
      this.processando = true;
      this.eleicaoService.inserirEleicao(eleicao).subscribe({
        next: inserido => {
          this.toastr.success('Eleição inserida com sucesso');
          this.id = inserido._id;
          this.nomeEleicao = inserido.nome;
          this.processando = false;
        },
        error: (err: HttpErrorResponse) => {
          if(err.status !== 500) {
            this.toastr.error(err.error);
          } else {
            this.toastr.error('Erro ao inserir a eleição');
          }
          this.processando = false;
        }
      });
    } else {
      this.processando = true;
      this.eleicaoService.atualizarEleicao(this.id, eleicao).subscribe({
        next: alterado => {
          this.toastr.success('Eleição alterada com sucesso');
          this.nomeEleicao = alterado.nome;
          this.processando = false;
        },
        error: (err: HttpErrorResponse) => {
          if(err.status !== 500) {
            this.toastr.error(err.error);
          } else {
            this.toastr.error('Erro ao alterar a eleição');
          }
          this.processando = false;
        }
      });
    }
  }

}
