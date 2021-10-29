import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-codigo-eleicao',
  templateUrl: './codigo-eleicao.component.html',
  styleUrls: ['./codigo-eleicao.component.scss']
})
export class CodigoEleicaoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      codigo: ['', [Validators.required]]
    });
  }

  iniciarVotacao() {
    this.formGroup?.markAllAsTouched();

    if(!this.formGroup?.valid) {
      return;
    }
  }
}
