import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Candidato } from 'src/app/@core/models/candidato.model';
import { CandidatoService } from 'src/app/@core/services/candidato.service';
import { UploadService } from 'src/app/@core/services/upload.service';

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

  @Input() public modoInclusao: boolean = true;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      _id: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      apelido: ['', [Validators.maxLength(30)]]
    });
  }

  salvar() {
    this.formGroup.markAllAsTouched();

    if(!this.formGroup.valid) {
      this.toastr.warning('Preencha os campos corretamente');
      return;
    }

    const candidato = this.formGroup.value as Candidato;

    this.processando = true;
    this.upload(candidato, () => this.efetivarGravacao(candidato));
  }

  efetivarGravacao(candidato: Candidato) {
    if(this.modoInclusao) {
      this.candidatoService.inserirCandidato(candidato).subscribe({
        next: () => {
          this.toastr.success('Candidato inserido com sucesso!');
          this.processando = false;
        },
        error: () => {
          this.toastr.error('Erro ao salvar candidato');
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
      })
    } else {
      callback(candidato);
    }
  }

  fechar() {
    this.ref.close();
  }
}
