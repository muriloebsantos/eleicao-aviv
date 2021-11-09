import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CodigoEleicaoComponent } from './components/codigo-eleicao/codigo-eleicao.component';
import { VotacaoComponent } from './components/votacao/votacao.component';
import { EleicaoService } from './@core/services/eleicao.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CargoService } from './@core/services/cargo.service';
import { VotacaoService } from './@core/services/votacao.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  declarations: [	
    AppComponent,
    VotacaoComponent,
    CodigoEleicaoComponent
   ],
  providers: [
    EleicaoService,
    CargoService,
    VotacaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
