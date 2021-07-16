import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Route } from '@angular/router';
import { MatCommande } from "../models/mat_commande";
import { BasedonnesService } from "../service/basedonnes.service";
import { Commande } from "../models/Commande";
import { Service } from "../models/service";
import { Hopital } from '../models/Hopital';

@Component({
  selector: "app-bon-commande",
  templateUrl: "./bon-commande.component.html",
  styleUrls: ["./bon-commande.component.scss"]
})
export class BonCommandeComponent implements OnInit {
  @Input() id: string;
  mat_coms: MatCommande[] = [];
  montant: number[] = [];
  commande: Commande = {
    comm_id: "",
    date: new Date(),
    numero: ""
  };
  modifcommande: Commande = {
    comm_id: "",
    date: new Date(),
    numero: ""
  };
  total: number = 0;
  services: Service[] = [];
  mat_com1: MatCommande = {
    mat_comm_id: "",
    reference: "",
    Quantite: 0,
    description: "",
    Prix_unitair: 0,
    Valide : null,
    Commande: ""
  };
  mat_com2: MatCommande = {
    mat_comm_id: "",
    reference: "",
    Quantite: 0,
    description: "",
    Prix_unitair: 0,
    Valide : null,
    Commande: ""
  };
  id_histo: string;
  hopit: Hopital[] = [];
  hop: Hopital = {
    _id: "",
    Siret: "",
    NomH: "",
    AdresseH: "",
    Telephone: 0
  };
  constructor(private route: ActivatedRoute, private base: BasedonnesService , private router : Router) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.les_mat_coms();
    this.recupH();
    this.UnCommande();
  }
  les_mat_coms() {
    this.base.TousMateriel_comms(this.id).subscribe(res => {
      this.mat_coms = res["materiels_comms"];
      this.calculer();
    });
  }
  UnCommande() {
    this.base.UnCommande(this.id).subscribe(
      res => {
        this.commande = res["commande"];
      },
      err => {
        console.log("erreur");
      }
    );
  }
  calculer() {
    for (let i = 0; i < this.mat_coms.length; i++) {
      this.montant.push(
        this.mat_coms[i].Quantite * this.mat_coms[i].Prix_unitair
      );
    }
    for (let i = 0; i < this.montant.length; i++) {
      this.total = this.total + this.montant[i];
    }
  }
  enregistrer() {
    this.base.ModifCommande(this.modifcommande, this.id).subscribe(
      res => {
        this.router.navigateByUrl('/Commandes/historiques' + this.id);
      },
      err => {
        console.log("erreur");
      }
    );
  }
  recupH() {
    this.base.lHopital().subscribe(res => {
      this.hopit = res["hopital"];
      for (let i = 0; i < 1; i++) {
          this.hop = this.hopit[i]
      }
    });
  }
}
