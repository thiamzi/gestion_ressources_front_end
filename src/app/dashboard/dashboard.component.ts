import { AuthserviceService } from "app/service/authservice.service";
import { Userdetails } from "./../service/authservice.service";
import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { Service } from "app/models/service";
import Swal from "sweetalert2";
import { Title } from "@angular/platform-browser";
import { BasedonnesService } from "app/service/basedonnes.service";
import { Chef } from "app/models/Chef";
import { ChefServiceService } from "app/service/chef-service.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  services: Service[] = [];
  tabTest: Service[] = [];
  service: Service = {
    ser_id: "",
    Active: true,
    Libelle_s: "",
    Description_s: "",
    chef: "",
    MAteriels_a_comm: []
  };
  chef: Chef = {
    id_chef: "",
    nom_utilisateur: "",
    adresse_mail: "",
    Mot_de_passe: "",
    Service: ""
  };
  adds: boolean;
  form1: FormGroup;
  form2: FormGroup;
  user: Userdetails;
  verif: boolean = true;
  constructor(
    private database: BasedonnesService,
    private chefserv: ChefServiceService,
    private formbuild: FormBuilder,
    private route: Router,
    private auth: AuthserviceService,
    private authc: ChefServiceService
  ) {}

  ngOnInit() {
    this.details();
    this.innitform();
    this.Lesservices();
  }
  details() {
    this.auth.profile().subscribe(
      res => {
        this.user = res;
        if (this.user.numero == 33287) {
          this.verif = true;
        } else {
          this.verif = false;
        }
      },
      err => {
        console.log("erreur");
      }
    );
  }
  Lesservices() {
    this.database.TousLesService().subscribe(
      res => {
        this.services = res["services"];
        console.log(this.services);
      },
      err => {
        console.log("erreur");
      }
    );
  }
  innitform() {
    this.form1 = this.formbuild.group({
      libelle: ["", Validators.required],
      description: ["", Validators.required]
    });
    this.form2 = this.formbuild.group({
      nom_utilisateur: ["", Validators.required],
      adresse_mail: ["", Validators.required]
    });
  }

  ajouter() {
    this.service.Description_s = this.form1.get("description").value;
    this.service.Libelle_s = this.form1.get("libelle").value;
    if (!this.adds) {
      this.database
        .ModifierService(this.service, this.service.ser_id)
        .subscribe(
          res => {
            this.ngOnInit();
          },
          err => {
            console.log("erreur");
          }
        );
      $("#edit").modal("hide");
    } else {
      $("#edit").modal("hide");
      $("#chef").modal("show");
    }
  }
  ajouterchef() {
    this.chef.nom_utilisateur = this.form2.get("nom_utilisateur").value;
    this.chef.adresse_mail = this.form2.get("adresse_mail").value;
    this.database.CreerService(this.service).subscribe(
      res => {
        this.chefserv.CreerCompte(this.chef, res).subscribe(resp => {
          $("#chef").modal("hide");
          console.log(res);
          this.database.CreerNotif('le Directeur général ',' à créer un nouveau service: '+this.service.Libelle_s,['33288','33289']);
          if (resp.error) {
            if ((resp.error = "existe")) {
              this.database.SuppService(res).subscribe(
                res => {
                  console.log(res);
                  this.ngOnInit();
                  Swal.fire(
                    "Oups!",
                    "Un chef de service existe dèjas avec ce même email.",
                    "warning"
                  );
                },
                err => {}
              );
            }
          }
          this.ngOnInit();
        });
      },
      err => {
        console.log("erreur");
      }
    );
  }
  modService(service?: Service) {
    if (service) {
      this.adds = false;
      $("#ee").text("Enrégistrer");
      $("#edit").modal("show");
      this.service.ser_id = service.ser_id;
      this.service.Active = service.Active;
      this.form1.setValue({
        libelle: service.Libelle_s,
        description: service.Description_s
      });
    } else {
      this.adds = true;
      $("#ee").text("Suivant");

      this.form1.setValue({
        libelle: "",
        description: ""
      });
    }
  }
  async DesactiverService(id: string) {
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
          this.database.SuppService(id).subscribe(
            res => {
              console.log(res);
              if (res.sup) {
                this.ngOnInit();
                if(res.ser){
                  this.database.CreerNotif('le Directeur général ',' à spprimer un service: '+res.ser,['33288','33289']);
                }
                swalWithBootstrapButtons.fire(
                  "Supprimé!",
                  "Le service a été supprimé.",
                  "success"
                );
              } else {
                swalWithBootstrapButtons
                  .fire({
                    title: "Oups!",
                    text:
                      "Le service contient des informations, vous ne pouvez que le déactiver.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Déactiver!",
                    cancelButtonText: "No, annuler!",
                    reverseButtons: true
                  })
                  .then(result => {
                    if (result.value) {
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      swalWithBootstrapButtons.fire(
                        "Annulé",
                        "Suppression annulée :)",
                        "error"
                      );
                    }
                  });
              }
            },
            err => {}
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Suppression annulée :)",
            "error"
          );
        }
      });
  }
}
