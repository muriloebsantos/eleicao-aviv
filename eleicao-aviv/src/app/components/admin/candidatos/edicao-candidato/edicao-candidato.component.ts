import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Candidato } from 'src/app/@core/models/candidato.model';
import { CandidatoService } from 'src/app/@core/services/candidato.service';

@Component({
  selector: 'app-edicao-candidato',
  templateUrl: './edicao-candidato.component.html',
  styleUrls: ['./edicao-candidato.component.scss']
})
export class EdicaoCandidatoComponent implements OnInit {

  constructor(private ref: NgbActiveModal,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private candidatoService: CandidatoService
    ) { }

  public formGroup!: FormGroup;

  @Input() public modoInclusao: boolean = true;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      _id: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      apelido: ['', [Validators.maxLength(30)]],
      foto: ['', [Validators.required, Validators.maxLength(256)]],
    });
  }

  salvar() {
    this.formGroup.markAllAsTouched();

    if(!this.formGroup.valid) {
      this.toastr.warning('Preencha os campos corretamente');
      return;
    }

    const candidato = this.formGroup.value as Candidato;

    if(this.modoInclusao) {
      this.candidatoService.inserirCandidato(candidato).subscribe({
        next: () => {
          this.toastr.success('Candidato inserido com sucesso!');
        }
      })
    }
  }

  fechar() {
    this.ref.close();
  }
}
