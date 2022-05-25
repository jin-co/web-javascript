import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "src/services/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService:UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.userService.getToken()
        const authToken = req.clone({
            headers: req.headers.set("authorization", "Bearer " + token)
        })

        return next.handle(authToken)
    }
    
}