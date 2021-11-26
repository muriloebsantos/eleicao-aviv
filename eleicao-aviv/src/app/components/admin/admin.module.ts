import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { CandidatoService } from 'src/app/@core/services/candidato.service';
import { EdicaoCandidatoComponent } from './candidatos/edicao-candidato/edicao-candidato.component';
import { NgbModalModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadService } from 'src/app/@core/services/upload.service';
import { EleicoesComponent } from './eleicoes/eleicoes.component';
import { EleicaoService } from 'src/app/@core/services/eleicao.service';
import { EdicaoEleicaoComponent } from './eleicoes/edicao-eleicao/edicao-eleicao.component';
import { EdicaoCargoComponent } from './eleicoes/edicao-eleicao/edicao-cargo/edicao-cargo.component';
import { CargoService } from 'src/app/@core/services/cargo.service';
import { CargoCandidatosComponent } from './eleicoes/edicao-eleicao/edicao-cargo/cargo-candidatos/cargo-candidatos.component';
import { ImpressaoEleicaoComponent } from './eleicoes/impressao-eleicao/impressao-eleicao.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModalModule,
    ReactiveFormsModule,
    NgbTypeaheadModule
  ],
  declarations: [
    AdminComponent,
    CandidatosComponent, EdicaoCandidatoComponent,
    EleicoesComponent, EdicaoEleicaoComponent, EdicaoCargoComponent, CargoCandidatosComponent, ImpressaoEleicaoComponent
  ],
  providers: [
    CandidatoService,
    UploadService,
    EleicaoService,
    CargoService
  ]

})
export class AdminModule { }
