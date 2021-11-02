import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Candidato } from 'src/app/@core/models/candidato.model';
import { CandidatoService } from 'src/app/@core/services/candidato.service';
import { UploadService } from 'src/app/@core/services/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edicao-candidato',
  templateUrl: './edicao-candidato.component.html',
  styleUrls: ['./edicao-candidato.component.scss']
})
export class EdicaoCandidatoComponent implements OnInit {

  constructor(private ref: NgbActiveModal,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private candidatoService: CandidatoService,
              private uploadService: UploadService
    ) { }

  public formGroup!: FormGroup;
  public processando: boolean = false;
  public carregando: boolean = false;
  public id: string = "";
  public fotoUrl: string = "";
  public foto: string = "";

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      matricula: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      apelido: ['', [Validators.maxLength(30)]]
    });

    if(this.id) {
      this.carregarCandidato();
    }
  }

  carregarCandidato() {
    this.carregando = true;
    this.candidatoService.obterCandidato(this.id).subscribe({
      next: candidato => {
        this.formGroup.patchValue(candidato);
        this.fotoUrl = `${environment.bucketFotosUrl}/${candidato.foto}`;
        this.foto = candidato.foto;
        this.carregando = false;
      },
      error: () => {
        this.toastr.error('Erro ao carregar dados do candidato');
        this.carregando = false;
      }
    })
  }

  salvar() {
    this.formGroup.markAllAsTouched();

    if(!this.formGroup.valid) {
      this.toastr.warning('Preencha os campos corretamente');
      return;
    }

    const candidato = this.formGroup.value as Candidato;
    candidato.foto = this.foto;

    this.processando = true;
    this.upload(candidato, () => this.efetivarGravacao(candidato));
  }

  efetivarGravacao(candidato: Candidato) {
    if(!this.id) {
      this.candidatoService.inserirCandidato(candidato).subscribe({
        next: inserido => {
          this.toastr.success('Candidato inserido com sucesso!');
          this.candidatoService.onCandidatoInseridoOuAlterado.next(inserido);
          this.fechar();
        },
        error: (err: HttpErrorResponse) => {
          if(err.status !== 500) {
            this.toastr.error(err.error);
          } else {
            this.toastr.error('Erro ao inserir candidato');
          }
          this.processando = false;
        }
      });
    } else {
      this.candidatoService.atualizarCandidato(this.id, candidato).subscribe({
        next: alterado => {
          this.toastr.success('Candidato atualizado com sucesso!');
          this.candidatoService.onCandidatoInseridoOuAlterado.next(alterado);
          this.fechar();
        },
        error: (err: HttpErrorResponse) => {
          if(err.status !== 500) {
            this.toastr.error(err.error);
          } else {
            this.toastr.error('Erro ao atualizar candidato');
          }
          this.processando = false;
        }
      })
    }
  }

  upload(candidato: Candidato, callback: any) {
    const files = (document.getElementById('file-input') as HTMLInputElement).files;

    if(files && files.length > 0) {
      const file = files[0];
      const extensao = file.name.split('.').pop();

      this.uploadService.obterUrlUpload(extensao!).subscribe({
        next: dadosUpload => {
          candidato.foto = dadosUpload.key;
          this.uploadService.uploadImagem(dadosUpload.uploadUrl, file).subscribe({
            next: () => {
              callback(candidato);
            },
            error: () => {
              this.toastr.error('Erro ao realizar upload. Tente novamente');
              this.processando = false;
            }
          })
        },
        error: () => {
          this.toastr.error('Erro ao obter dados para upload. Tente novamente');
          this.processando = false;
        }
      });
    } else {
      if(!this.id) {
        this.toastr.warning('Por favor, selecionar uma foto para upload');
        this.processando = false;
      } else {
        callback(candidato);
      }
    }
  }

  fechar() {
    this.ref.close();
  }
}
