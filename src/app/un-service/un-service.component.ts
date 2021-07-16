import { Component, OnInit, Input } from "@angular/core";
import { Materiel } from "app/models/Materiel";
import { Poste } from "app/models/Poste";
import Swal from "sweetalert2";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { BasedonnesService } from "app/service/basedonnes.service";
import { ActivatedRoute } from "@angular/router";
import { Employer } from "app/models/Employer";
import { MatCommande } from "app/models/mat_commande";
import { Service } from "../models/service";
import { Userdetails } from "app/service/authservice.service";
import { AuthserviceService } from "../service/authservice.service";

@Component({
  selector: "app-un-service",
  templateUrl: "./un-service.component.html",
  styleUrls: ["./un-service.component.scss"]
})
export class UnServiceComponent implements OnInit {
  @Input() ser_id: string;
  idmatc: string;
  materiels: Materiel[] = [];
  postes: Poste[] = [];
  posteA: Poste = {
    pos_id: "",
    Active: true,
    Libelle_p: "",
    Description_p: "",
    Employers: null
  };
  materielA: Materiel = {
    mat_id: "",
    Libelle_m: "",
    Description_m: "",
    aCommande: 0,
    stock: 0,
    Prix: 0
  };
  materielAcomm: Materiel = {
    mat_id: "",
    Libelle_m: "",
    Description_m: "",
    aCommande: 0,
    stock: 0,
    Prix: 0
  };
  employerA: Employer = {
    emp_id: "",
    Nss: "",
    Nom: "",
    Prenom: "",
    Sexe:"",
    Statut: "",
    Adresse: "",
    Date_naiss: null,
    Anciennete: null,
    Email: "",
    Telephone: null,
    Poste: null
  };
  materiel_com: MatCommande = {
    mat_comm_id: "",
    reference: "",
    Quantite: 0,
    description: "",
    Prix_unitair: 0,
    Valide : null,
    Commande: ""
  };
  UnMateriel: Materiel = {
    mat_id: "",
    Libelle_m: "",
    Description_m: "",
    aCommande: 0,
    stock: 0,
    Prix: 0
  };
  form1: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  form4: FormGroup;
  addm: boolean;
  addp: boolean;
  adde: string;

  servi: Service = {
    ser_id: "",
    Active: null,
    Libelle_s: "",
    Description_s: "",
    chef: "",
    MAteriels_a_comm: null
  };

  user: Userdetails;
  verif: boolean = true
  veriff: boolean = true
  verif1: boolean = true;
  verif2: boolean = true;
  verifadm: boolean = false;
  veriflis: boolean = true;

  constructor(
    private formbuild: FormBuilder,
    private database: BasedonnesService,
    private route: ActivatedRoute,
    private auth: AuthserviceService
  ) {}

  ngOnInit() {
    this.ser_id = this.route.snapshot.paramMap.get("id");
    this.innitform();
    this.lesPostes();
    this.lesMateriels();
    this.Unservice();
    this.details();
  }
  details() {
    this.auth.profile().subscribe(
      res => {
        this.user = res;
        console.log(res);
        if (this.user.numero == 33288) {
          this.verif = true;
          this.veriff = false;
          this.verif1 = true;
          this.veriflis = true;
        } else if (this.user.numero == 33289) {
          this.veriff = true;
          this.verif = false;
          this.verifadm = true;
          this.verif2 = false;
        } else if (this.user.numero == 33287){
          this.veriff = true;
          this.verif = true;
          this.verifadm = false;
          this.verif1 = false;
          this.verif2 = false;
          this.veriflis = true;
        }
      },
      err => {
        this.verifadm = false;
        this.verif2 = true;
        this.verif1 = false;
        this.veriflis = false;
      }
    );
  }

  Unservice() {
    this.database.UnService(this.ser_id).subscribe(res => {
      this.servi = res["service"];
    });
  }
  lesPostes() {
    this.database.SevicePostes(this.ser_id).subscribe(
      res => {
        this.postes = res["postes"];
        console.log(this.postes);
      },
      err => {
        console.log("erreur");
      }
    );
  }
  lesMateriels() {
    this.database.SeviceMateriel(this.ser_id).subscribe(
      res => {
        this.materiels = res["materiels"];
      },
      err => {
        console.log("erreur");
      }
    );
  }
  innitform() {
    this.form1 = this.formbuild.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      nss: ["", Validators.required],
      dn: ["", Validators.required],
      sexe: ['', Validators.required],
      statut: ["", Validators.required],
      adresse: ["", Validators.required],
      anciennete: ["", Validators.required],
      emailFormControl: ["", Validators.required],
      telephone: ["", Validators.required]
    });
    this.form2 = this.formbuild.group({
      libelle_p: ["", Validators.required],
      description_p: ["", Validators.required]
    });
    this.form3 = this.formbuild.group({
      libelle_m: ["", Validators.required],
      description_m: ["", Validators.required],
      stock: ["", Validators.required],
      Prix: ["", Validators.required]
    });
    this.form4 = this.formbuild.group({
      description: ["", Validators.required],
      quantite: ["", Validators.required]
    });
  }
  async addPoste() {
    this.posteA.Description_p = this.form2.get("description_p").value;
    this.posteA.Libelle_p = this.form2.get("libelle_p").value;
    if (this.addp) {
      this.database.CreerPoste(this.posteA, this.ser_id).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => {
          console.log("erreur " + err);
        }
      );
    } else {
      this.database.ModifierPoste(this.posteA, this.posteA.pos_id).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => {
          alert("problem de modification poste");
          console.log("erreur " + err);
        }
      );
    }
    $("#addp").modal("hide");
  }

  async DesactiverPoste(id: string) {
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
          this.database.SuppPoste(id).subscribe(
            res => {
              console.log(res);
              if (res.sup) {
                this.ngOnInit();
                swalWithBootstrapButtons.fire(
                  "Supprimé!",
                  "Le poste a été supprimé.",
                  "success"
                );
              } else {
                swalWithBootstrapButtons
                  .fire({
                    title: "Oups!",
                    text:
                      "Le poste que vous essaiez de supprimer contient des informations, vous ne pouvez que le déactiver.",
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
  async addMateriel() {
    this.materielA.Description_m = this.form3.get("description_m").value;
    this.materielA.Libelle_m = this.form3.get("libelle_m").value;
    this.materielA.stock = this.form3.get("stock").value;
    this.materielA.Prix = this.form3.get("Prix").value;
    if (this.addm) {
      this.database.CreerMateriel(this.materielA, this.ser_id).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => {
          this.ngOnInit();

          console.log("erreur " + err);
        }
      );
    } else {
      this.database
        .ModifierMateriel(this.materielA, this.materielA.mat_id)
        .subscribe(
          res => {
            console.log(res);
            this.ngOnInit();
          },
          err => {
            this.ngOnInit();

            console.log("erreur " + err);
          }
        );
    }

    $("#addm").modal("hide");
  }
  donnerid(id) {
    this.idmatc = id;
  }
  addMateriel_a_comm() {
    this.database.UnMateriel(this.idmatc).subscribe(
      res => {
        this.UnMateriel = res["Materiel"];
        console.log(this.UnMateriel);
        this.materiel_com.reference = this.UnMateriel.Libelle_m;
        this.materiel_com.Prix_unitair = this.UnMateriel.Prix;
        this.materiel_com.description = this.form4.get("description").value;
        this.materiel_com.Quantite = this.form4.get("quantite").value;
        this.database
          .CreerMateriel_comm(this.materiel_com, this.ser_id)
          .subscribe(
            res => {
              this.materielAcomm.aCommande = this.materiel_com.Quantite;
              this.database
                .ModifierMat(this.materielAcomm, this.idmatc)
                .subscribe(res => {
                  this.ngOnInit();
                });
            },
            err => {
              console.log("erreur " + err);
            }
          );
      },
      err => {
        console.log("erreur " + err);
      }
    );

    $("#addmat_comm").modal("hide");
  }
  async supMateriel(id: string) {
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
          this.database.SuppMateriel(id).subscribe(res => {
            console.log(res);
            this.ngOnInit();
            swalWithBootstrapButtons.fire(
              "Supprimé!",
              "Matériel supprimé.",
              "success"
            );
          });
        } else if (
          /* Read more about handling dismissals below */
          
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.ngOnInit();
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Suppression annulée :)",
            "error"
          );
        }
      });
  }
  remplirForm1(employer?: Employer) {
    if (employer) {
      this.form1.setValue({
        nom: employer.Nom,
        prenom: employer.Prenom,
        nss: employer.Nss,
        sexe:employer.Sexe,
        dn: employer.Date_naiss,
        statut: employer.Statut,
        adresse: employer.Adresse,
        anciennete: employer.Anciennete,
        emailFormControl: employer.Email,
        telephone: employer.Telephone
      });
    } else {
      this.form1.setValue({
        nom: "",
        prenom: "",
        nss: "",
        dn: null,
        statut: "",
        adresse: "",
        anciennete: null,
        emailFormControl: "",
        telephone: null
      });
    }
  }
  remplirForm2(poste?: Poste) {
    if (poste) {
      $("#addp").modal("show");
      this.posteA.pos_id = poste.pos_id;
      this.posteA.Active = poste.Active;
      this.addp = false;
      this.form2.setValue({
        libelle_p: poste.Libelle_p,
        description_p: poste.Description_p
      });
    } else {
      this.addp = true;
      this.form2.setValue({
        libelle_p: "",
        description_p: ""
      });
    }
  }
  remplirForm3(materiel?: Materiel) {
    if (materiel) {
      $("#addm").modal("show");
      this.materielA.mat_id = materiel.mat_id;
      this.addm = false;

      this.form3.setValue({
        libelle_m: materiel.Libelle_m,
        description_m: materiel.Description_m,
        stock: materiel.stock,
        a_commander: materiel.aCommande,
        Prix: materiel.Prix
      });
    } else {
      this.addm = true;

      this.form3.setValue({
        libelle_m: "",
        description_m: "",
        stock: 0,
        a_commander: 0,
        Prix: 0
      });
    }
  }
  addEmployer() {
    this.employerA.Nom = this.form1.get("nom").value;
    this.employerA.Prenom = this.form1.get("prenom").value;
    this.employerA.Nss = this.form1.get("nss").value;
    this.employerA.Adresse = this.form1.get("adresse").value;
    this.employerA.Anciennete = this.form1.get("anciennete").value;
    this.employerA.Sexe = this.form1.get("sexe").value;
    this.employerA.Email = this.form1.get("emailFormControl").value;
    this.employerA.Telephone = this.form1.get("telephone").value;
    this.employerA.Statut = this.form1.get("statut").value;
    this.employerA.Date_naiss = this.form1.get("dn").value;
    this.database.CreerEmployer(this.employerA, this.adde).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      err => {
        this.ngOnInit();
        console.log("erreur " + err);
      }
    );
    $("#add").modal("hide");
  }
  posteAinf(id: string) {
    this.adde = id;
  }
  getName(id: string) {
    this.database.UnEmployer(id).subscribe(
      res => {
        let a: Employer = res["employer"];
        return a.Prenom + " " + a.Nom;
      },
      err => {
        return "indisponible!";
      }
    );
  }
}
