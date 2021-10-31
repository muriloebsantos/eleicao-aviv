import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { CandidatoService } from 'src/app/@core/services/candidato.service';
import { EdicaoCandidatoComponent } from './candidatos/edicao-candidato/edicao-candidato.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadService } from 'src/app/@core/services/upload.service';
import { EleicoesComponent } from './eleicoes/eleicoes.component';
import { EleicaoService } from 'src/app/@core/services/eleicao.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModalModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    CandidatosComponent, EdicaoCandidatoComponent,
    EleicoesComponent
  ],
  providers: [
    CandidatoService,
    UploadService,
    EleicaoService
  ]

})
export class AdminModule { }
