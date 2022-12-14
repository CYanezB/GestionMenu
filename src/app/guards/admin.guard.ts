import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  decoded: any;
  constructor(
    private router: Router
  ) { }
  canActivate() {

    var token = localStorage.getItem('token');
    this.decoded = jwt_decode(token!);

    console.log(this.decoded.user_role);

    if (this.decoded.user_role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }

}
