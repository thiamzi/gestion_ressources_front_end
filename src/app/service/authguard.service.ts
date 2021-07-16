import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthserviceService, Userdetails } from "./authservice.service";
import { ChefServiceService } from "./chef-service.service";

import Swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class AuthguardService implements CanActivate{
  user: Userdetails;

  constructor(
    private authservice: AuthserviceService,
    private router: Router,
    private authchef: ChefServiceService
  ) {}
  canActivate() {
    if (!this.authservice.Islogged() || !this.authchef.Islogged()) {
      this.router.navigateByUrl("/login");
      return false;
    } else {
      return true;
    }
  }
}
