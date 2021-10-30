import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { CandidatosComponent } from "./candidatos/candidatos.component";

const routes: Routes = [
    {
      path: '',
      component: AdminComponent,
      children: [
          {
              path: 'candidatos',
              component: CandidatosComponent
          }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }