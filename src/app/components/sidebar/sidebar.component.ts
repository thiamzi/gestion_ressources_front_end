import { Component, OnInit } from "@angular/core";
import {
  AuthserviceService,
  Userdetails
} from "app/service/authservice.service";
import { Userdetailschef, ChefServiceService } from "app/service/chef-service.service";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: "Services", title: "Services", icon: "dashboard", class: "" },
  { path: "Profile", title: "Profile", icon: "person", class: "" },
  { path: "Commandes", title: "Commandes", icon: "content_paste", class: "" },
  { path: "Notifications",title: "Notifications",icon: "notifications", class: ""},
  { path: "Hopital", title: "Hopital", icon: "notifications", class: "" },
  { path: "Services/:id", title: "Mon service", icon: "dashboard", class: "" }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  user: Userdetails;
  userc: Userdetailschef = {
    _id: "",
    nom_utilisateur: "",
    adresse_mail: "",
    Mot_de_passe: "",
    Service: "",
    exp: 0,
    iat: 0
  };
  verif: boolean = true;
  verif1: boolean = true;
  veriftab: boolean = true;

  constructor(private auth: AuthserviceService,
    private authc: ChefServiceService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.details();
  }
  details() {
    this.auth.profile().subscribe(
      res => {
        this.user = res;
        this.veriftab = false;
        if (this.user.numero == 33287 || this.user.numero == 33289) {
          this.verif = true;
        } else {
          this.verif = false;
        }
        if (this.user.numero == 33287) {
          this.verif1 = true;
        } else {
          this.verif1 = false;
        }
      },
      err => {
        this.authc.profile().subscribe(
          res1 => {
            this.veriftab = true;
            this.verif = false;
            this.verif1 = false;
            this.userc = res1;
          },
          err => {}
        );
      }
    );
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
  deconnection() {
    this.auth.decoonexion();
  }
}
