import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { CandidatosComponent } from "./candidatos/candidatos.component";
import { EdicaoEleicaoComponent } from "./eleicoes/edicao-eleicao/edicao-eleicao.component";
import { EleicoesComponent } from "./eleicoes/eleicoes.component";
import { ImpressaoEleicaoComponent } from "./eleicoes/impressao-eleicao/impressao-eleicao.component";

const routes: Routes = [
    {
      path: '',
      component: AdminComponent,
      children: [
          {
              path: 'candidatos',
              component: CandidatosComponent
          },
          {
            path: 'eleicoes',
            component: EleicoesComponent
          },
          {
            path: 'eleicoes/:id',
            component: EdicaoEleicaoComponent
          },
          {
            path: 'eleicoes/:id/impressao',
            component: ImpressaoEleicaoComponent
          }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }