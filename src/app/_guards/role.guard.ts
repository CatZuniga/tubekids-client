import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const expectedRole = route.data.expectedRole;

        const token = JSON.parse(sessionStorage.getItem("currentUser"));
        var base64Url = token.access_token.split('.')[1];
        var data = atob(base64Url);
        data = JSON.parse(data);
      
        if (data["data"].type == expectedRole) {
            console.log(data["data"].type);
            return true;
        }
        else false;
    }

}

