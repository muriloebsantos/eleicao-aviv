import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodigoEleicaoComponent } from './components/codigo-eleicao/codigo-eleicao.component';
import { VotacaoComponent } from './components/votacao/votacao.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [	
    AppComponent,
    VotacaoComponent,
    CodigoEleicaoComponent
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
