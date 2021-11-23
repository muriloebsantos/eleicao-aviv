import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@core/guards/auth.guard';
import { CodigoEleicaoComponent } from './components/codigo-eleicao/codigo-eleicao.component';
import { LoginComponent } from './components/login/login.component';
import { VotacaoComponent } from './components/votacao/votacao.component';

const routes: Routes = [
  {
    path: '',
    component: CodigoEleicaoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'votacao',
    component: VotacaoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule), 
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
