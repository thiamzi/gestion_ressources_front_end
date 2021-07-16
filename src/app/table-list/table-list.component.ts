import { Component, OnInit } from "@angular/core";
import { Commande } from "app/models/Commande";
import Swal from "sweetalert2";
import { Service } from "app/models/service";
import { BasedonnesService } from "../service/basedonnes.service";
import { MatCommande } from "../models/mat_commande";
import { DatePipe } from "@angular/common";
import {
  AuthserviceService,
  Userdetails
} from "../service/authservice.service";

@Component({
  selector: "app-table-list",
  templateUrl: "./table-list.component.html",
  styleUrls: ["./table-list.component.css"]
})
export class TableListComponent implements OnInit {
  panelOpenState = false;
  mat_comm: MatCommande[] = [];
  mat_coms: MatCommande[] = [];
  mat_comsV: MatCommande[] = [];
  services: Service[] = [];
  Services_mat: Service[] = [];
  Comandes: Commande[] = [];
  commande: Commande = {
    comm_id: "",
    date: new Date(),
    numero: ""
  };

  verif: boolean;
  verif2: boolean = false;
  id: string;
  materiel_com: MatCommande = {
    mat_comm_id: "",
    reference: "",
    Quantite: 0,
    description: "",
    Prix_unitair: 0,
    Valide : null,
    Commande: ""
  };
  mat_com: MatCommande = {
    mat_comm_id: "",
    reference: "",
    Quantite: 0,
    description: "",
    Prix_unitair: 0,
    Valide : null,
    Commande: ""
  };
  dater: string;
  user: Userdetails;
  verif1: boolean = true;
  constructor(
    private base: BasedonnesService,
    private auth: AuthserviceService
  ) {}

  ngOnInit() {
    this.Lesservices();
    this.reccommnde();
    this.details();
  }

  details() {
    this.auth.profile().subscribe(
      res => {
        this.user = res;
        if (this.user.numero == 33289) {
          this.verif1 = true;
        } else {
          this.verif1 = false;
        }
      },
      err => {}
    );
  }
  Lesservices() {
    this.base.TousLesService().subscribe(
      res => {
        this.services = res["services"];
        for (let i = 0; i < this.services.length; i++) {
          if (this.services[i].MAteriels_a_comm.length !== 0) {
            this.Services_mat.push(this.services[i]);
          }
        }
      },
      err => {
        console.log("erreur");
      }
    );
  }
  recup_mat_c(id, index) {
    this.base.serviceMateriel_comm(id).subscribe(
      res => {
        this.mat_comm = res["materiels_comms"];
        for (let i = 0; i < this.mat_comm.length - 1; i++) {
          for (let j = 1; j <= this.mat_comm.length; j++) {
            if (this.mat_comm[i].reference === this.mat_comm[j].reference) {
              this.mat_comm.splice(index, 1);
              this.base
                .SuppMateriel_comm(this.mat_comm[j].mat_comm_id)
                .subscribe(res => {});
                if(this.mat_comm[i].Valide==false){
                  this.mat_comsV.push(this.mat_comm[i])
                }
            }
            if (this.mat_comm[i].Commande === undefined) {
              this.verif2 = true;
            } else {
              this.verif2 = false;
            }
          }
        }
      },
      err => {
        console.log("erreur");
      }
    );
  }
  reccommnde() {
    this.base.TousLesCommande().subscribe(
      res => {
        this.Comandes = res["commandes"];
        for (let i = 0; i < this.Comandes.length; i++) {
          if (this.Comandes[i].numero === null) {
            this.base.SuppCommande(this.Comandes[i].comm_id).subscribe(res => {
              this.Comandes.splice(i, 1);
            });
          }
        }
      },
      err => {
        console.log("erreur");
      }
    );
  }
  Creerbon() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    this.base.CreerCommande(this.commande).subscribe(
      res => {
        this.id = res;
        this.verif = true;
        swalWithBootstrapButtons.fire(
          "Bon Creé",
          "Veuillez ajouter les materiels a commander",
          "success"
        );
      },
      err => {
        console.log("erreur");
      }
    );
  }
  ajouter(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    this.base.TousMateriel_comms(this.id).subscribe(res => {
      this.mat_coms = res["materiels_comms"];
    });
    this.base.UnMateriel_comm(id).subscribe(res => {
      this.mat_com = res["materiels_comm"];
      if (this.mat_com.Commande === this.id) {
        swalWithBootstrapButtons.fire(
          "Oups",
          "Le materiel a été deja ajouté.",
          "warning"
        );
      } else {
        swalWithBootstrapButtons.fire(
          "Ajouté!",
          "Le materiel a été ajouté avec succes.",
          "success"
        );
        this.base
          .ModifierMateriel_comm(this.materiel_com, this.id, id)
          .subscribe(res => {});
      }
    });
  }
  suppmacom(id, index) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: "Etes vous sûre?",
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimer!",
        cancelButtonText: "No, annuler!",
        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
          this.base.SuppMateriel_comm(id).subscribe(res => {
            swalWithBootstrapButtons.fire(
              "Supprimé!",
              "Le materiel a été supprimé.",
              "success"
            );
          });
          this.mat_comm.splice(index, 1);
        }
      });
  }
}
