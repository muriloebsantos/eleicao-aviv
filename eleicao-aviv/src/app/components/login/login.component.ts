import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) { }

  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', [Validators.required]]
    });
  }

  autenticar() {
    if(!this.formGroup.valid) {
      return;
    }

    const { usuario, senha } = this.formGroup.value;

    if(usuario == environment.login && senha == environment.password) {
      localStorage.setItem('eleicao-aviv', 'mock');
      this.router.navigateByUrl('/');
    } else {
      this.toastr.warning('Dados incorretos');
    }
  }

}
