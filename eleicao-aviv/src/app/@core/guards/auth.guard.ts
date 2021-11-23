import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable() 
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router) {

    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       return this.checkAuth();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.checkAuth();
    }

    checkAuth() {
      const autenticado = !!localStorage.getItem('eleicao-aviv');

      if(!autenticado) {
        this.router.navigateByUrl('/login');
      }

      return autenticado;
    }


}