import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BasedonnesService } from "app/service/basedonnes.service";
import { Commande } from "../models/Commande";
import { MatCommande } from "../models/mat_commande";
import { Hopital } from "app/models/Hopital";

@Component({
  selector: "app-historique",
  templateUrl: "./historique.component.html",
  styleUrls: ["./historique.component.scss"]
})
export class HistoriqueComponent implements OnInit {
  @Input() id: string;
  commande: Commande = {
    comm_id: "",
    date: null,
    numero: ""
  };
  mat_coms: MatCommande[] = [];
  mat_comm: MatCommande[] = [];
  total: number = 0;
  montant: number[] = [];
  hopit: Hopital[] = [];
  hop: Hopital = {
    _id: "",
    Siret: "",
    NomH: "",
    AdresseH: "",
    Telephone: 0
  };

  constructor(private route: ActivatedRoute, private base: BasedonnesService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.recup_mat_com();
    this.unCommande();
    this.recupH();
  }
  unCommande() {
    this.base.UnCommande(this.id).subscribe(
      res => {
        this.commande = res["commande"];
      },
      err => {
        console.log("erreur " + err);
      }
    );
  }
  recup_mat_com() {
    this.base.TousMateriel_comms(this.id).subscribe(
      res => {
        this.mat_comm = res["materiels_comms"];

        this.calculer();
        for (let i = 0; i < this.montant.length; i++) {
          this.total = this.total + this.montant[i];
        }
      },
      err => {
        console.log("erreur " + err);
      }
    );
  }
  calculer() {
    for (let i = 0; i < this.mat_comm.length; i++) {
      this.montant.push(
        this.mat_comm[i].Quantite * this.mat_comm[i].Prix_unitair
      );
    }
  }
  recupH() {
    this.base.lHopital().subscribe(res => {
      this.hopit = res["hopital"];
      for (let i = 0; i < 1; i++) {
        this.hop = this.hopit[i];
      }
    });
  }
}
