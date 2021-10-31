import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { CandidatosComponent } from "./candidatos/candidatos.component";
import { EleicoesComponent } from "./eleicoes/eleicoes.component";

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
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }