import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EleicaoService } from 'src/app/@core/services/eleicao.service';

@Component({
  selector: 'app-codigo-eleicao',
  templateUrl: './codigo-eleicao.component.html',
  styleUrls: ['./codigo-eleicao.component.scss']
})
export class CodigoEleicaoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private eleicaoService: EleicaoService,
              private toastr: ToastrService,
              private router: Router
    ) { }

  formGroup!: FormGroup;
  processando: boolean = false;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      codigo: ['', [Validators.required]]
    });
  }

  iniciarVotacao() {
    this.formGroup?.markAllAsTouched();

    if(!this.formGroup?.valid) {
      this.toastr.warning('Informe o código da eleição')
      return;
    }

    this.processando = true;
    this.eleicaoService.obterEleicaoPorCodigo(this.formGroup.value.codigo).subscribe({
      next: eleicao => { 
          localStorage.setItem("eleicao-aviv.eleicao", eleicao._id);
          this.eleicaoService.eleicao = eleicao;
          this.router.navigate(['votacao']);
          this.processando = false;
      },
      error: (err: HttpErrorResponse) => {
        if(err.status == 404) {
          this.toastr.warning('Eleição não encontrada!');
        } else {
          this.toastr.error('Erro desconhecido');
        }
        this.processando = false;
      }
    });
  }
}
