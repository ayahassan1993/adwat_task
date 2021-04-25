import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class SessionGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkIfCanActivate(state);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkIfCanActivate(state);
    }

    checkIfCanActivate(state) {
        if (!localStorage.getItem('currentUser')) {
            return true;
        }
        this.router.navigateByUrl('')
        return false;
    }
}
