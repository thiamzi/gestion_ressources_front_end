import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'app/service/authservice.service';
import { ChefServiceService} from 'app/service/chef-service.service';
import { Router } from '@angular/router';
import { User } from 'app/models/User';
import { Chef } from 'app/models/Chef';
import * as $ from 'jquery';
import { Userdetailschef } from '../service/chef-service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
   user: Userdetailschef ;
  UserCon: User = {
    _id: '',
    numero: 0,
    nom_utilisateur: '',
    adresse_mail: '',
    Mot_de_passe: ''
  };
    UserChef: Chef = {
    id_chef: '',
    nom_utilisateur: '',
    adresse_mail: '',
    Mot_de_passe: '',
    Service: ''
  };
  err = 'Adresse email ou mot de passe incorect';
  erreur: boolean;
  err1 = 'Adresse email ou mot de passe incorect';
  erreur1: boolean;
  constructor(private auth : AuthserviceService , private route : Router , private chef : ChefServiceService) { }

  ngOnInit() {
  }

  Seconnecter() {
    this.auth.connexion(this.UserCon).subscribe(() => {
      this.route.navigateByUrl('gestion/Services');
    }, err => {
      this.erreur = true;
    }
    );
  }
   Seconnecterchef() {
    this.chef.connexion(this.UserChef).subscribe(() => {
          this.chef.profile().subscribe(
      res => {
        this.user = res;
        console.log(this.user);
        this.route.navigateByUrl('gestion/Services/'+this.user.Service);
      },
      err => { console.log('erreur'); }
    );
    }, err => {
      this.erreur1 = true;
    }
    );
  }
}
