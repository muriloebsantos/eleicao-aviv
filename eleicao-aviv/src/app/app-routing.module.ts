import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodigoEleicaoComponent } from './components/codigo-eleicao/codigo-eleicao.component';
import { VotacaoComponent } from './components/votacao/votacao.component';

const routes: Routes = [
  {
    path: '',
    component: CodigoEleicaoComponent
  },
  {
    path: 'votacao',
    component: VotacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
