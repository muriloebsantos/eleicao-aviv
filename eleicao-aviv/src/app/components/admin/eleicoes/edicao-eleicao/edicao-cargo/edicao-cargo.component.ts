import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cargo } from 'src/app/@core/models/cargo.model';
import { CargoService } from 'src/app/@core/services/cargo.service';

@Component({
  selector: 'app-edicao-cargo',
  templateUrl: './edicao-cargo.component.html',
  styleUrls: ['./edicao-cargo.component.scss']
})
export class EdicaoCargoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private cargoService: CargoService,
              private toastr: ToastrService,
              private ref: NgbActiveModal
    ) { }

  public carregando: boolean = false;
  public processando: boolean = false;
  public id: string = "";
  public eleicaoId: string = "";
  public formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      vagas: ['', [Validators.required]]
    });

    if(this.id) {
      this.carregarCargo();
    }
  }

  carregarCargo() {
    this.carregando = true;
    this.cargoService.obterCargo(this.id).subscribe({
      next: cargo => {
        this.formGroup.patchValue(cargo);
        this.carregando = false;
      },
      error: () => {
        this.toastr.error('Erro ao carregar o cargo');
        this.carregando = false;
      }
    })
  }

  salvar() {
    this.formGroup.markAllAsTouched();

    if(!this.formGroup.valid) {
      this.toastr.warning('Por favor, preencha os campos corretamente');
      return;
    }

    const cargo = this.formGroup.value as Cargo;
    cargo.eleicaoId = this.eleicaoId;

    if(!this.id) {
      this.processando = true;
      this.cargoService.inserirCargo(cargo).subscribe({
        next: inserido => {
          this.toastr.success('Cargo inserido com sucesso!');
          this.cargoService.onCargoInseridoOuAlterado.next(inserido);
          this.processando = false;
          this.fechar();
        },
        error: (err: HttpErrorResponse) => {
          if(err.status !== 500) {
            this.toastr.error(err.error);
          } else {
            this.toastr.error('Erro ao inserir o cargo');
          }
          this.processando = false;
        }
      });
    } else {
      this.processando = true;
      this.cargoService.atualizarCargo(this.id, cargo).subscribe({
        next: atualizado => {
          this.toastr.success('Cargo atualizado com sucesso!');
          this.cargoService.onCargoInseridoOuAlterado.next(atualizado);
          this.processando = false;
          this.fechar();
        },
        error: (err: HttpErrorResponse) => {
          if(err.status !== 500) {
            this.toastr.error(err.error);
          } else {
            this.toastr.error('Erro ao atualizar o cargo');
          }
          this.processando = false;
        }
      });
    }
  }

  fechar() {
    this.ref.close();
  }
}
