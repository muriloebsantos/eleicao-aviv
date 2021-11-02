import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cargo } from 'src/app/@core/models/cargo.model';
import { Eleicao } from 'src/app/@core/models/eleicao.model';
import { CargoService } from 'src/app/@core/services/cargo.service';
import { EleicaoService } from 'src/app/@core/services/eleicao.service';
import { EdicaoCargoComponent } from './edicao-cargo/edicao-cargo.component';

@Component({
  selector: 'app-edicao-eleicao',
  templateUrl: './edicao-eleicao.component.html',
  styleUrls: ['./edicao-eleicao.component.scss']
})
export class EdicaoEleicaoComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
             private eleicaoService: EleicaoService,
             private cargoService: CargoService,
             private toastr: ToastrService,
             private formBuilder: FormBuilder,
             private modalService: NgbModal
    ) { }

  public nomeEleicao: string = "";
  public id: string = "";
  public formGroup!: FormGroup;
  public processando: boolean = false;
  public carregando: boolean = false;
  public carregandoCargos: boolean = false;
  public cargos: Cargo[] = [];

  private onCargoInseridoOuAlteradoSubscription!: Subscription;
 
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
           this.obterCargos();
         } else {
           this.novaEleicao();
         }
      }
    });

    this.onCargoInseridoOuAlteradoSubscription = this.cargoService.onCargoInseridoOuAlterado.subscribe({
      next: () => this.obterCargos()
    });
  }

  ngOnDestroy() {
    this.onCargoInseridoOuAlteradoSubscription.unsubscribe();
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

  obterCargos() {
    this.carregandoCargos = true;
    this.cargoService.listarCargos(this.id).subscribe({
      next: cargos => {
        this.cargos = cargos;
        this.carregandoCargos = false;
      },
      error: () => {
        this.toastr.error('Erro ao carregar os cargos');
        this.carregandoCargos = false;
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

  abrirModalCargo(cargoId: string) {
    const ref = this.modalService.open(EdicaoCargoComponent);
    ref.componentInstance.id = cargoId;
    ref.componentInstance.eleicaoId = this.id;
  }
}
