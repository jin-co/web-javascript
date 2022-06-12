import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

// a service that wants to access to another service must have '@Injectable' annotation
@Injectable()
export class AuthGuard implements CanActivate {
        
    constructor(private userService:UserService, private router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(!this.userService.getIsAuth()) {
            this.router.navigate(['/login'])
        }        
        return this.userService.getIsAuth()
    }

}