import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import {
  Userdetails,
  AuthserviceService
} from "app/service/authservice.service";
import { User } from "app/models/User";
import {
  Userdetailschef,
  ChefServiceService
} from "../service/chef-service.service";
import { Chef } from "../models/Chef";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  user: Userdetails ={
    _id: "",
    numero: 0,
    nom_utilisateur: "",
    adresse_mail: "",
    Mot_de_passe: "",
    exp: 0,
    iat: 0
  }
  userc: Userdetailschef = {
    _id: "",
    nom_utilisateur: "",
    adresse_mail: "",
    Mot_de_passe: "",
    Service: "",
    exp: 0,
    iat: 0
  };
  userm: User = {
    _id: "",
    numero: 0,
    nom_utilisateur: "",
    adresse_mail: "",
    Mot_de_passe: ""
  };
  usermc: Chef = {
    id_chef: "",
    nom_utilisateur: "",
    adresse_mail: "",
    Mot_de_passe: "",
    Service: ""
  };
  form1: FormGroup;
  form2: FormGroup;
  verifffff: boolean;
  constructor(
    private auth: AuthserviceService,
    private formbuild: FormBuilder,
    private authc: ChefServiceService
  ) {}

  ngOnInit() {
    this.details();
    this.innitform();
    this.modifier_controle();
  }
  innitform() {
    this.form1 = this.formbuild.group({
      nom_utilisateur: ["", Validators.required],
      adresse_mail: ["", Validators.required],
      Mot_de_passe: ["", Validators.required]
    });
    this.form2 = this.formbuild.group({
      nom_utilisateur: ["", Validators.required],
      adresse_mail: ["", Validators.required],
      Mot_de_passe: ["", Validators.required]
    });
  }
  details() {
    this.auth.profile().subscribe(
      res => {
        this.user = res;
        this.verifffff = true;
      },
      err => {
        this.authc.profile().subscribe(
          res1 => {
            this.userc = res1;
            this.verifffff = false;
          },
          err => {}
        );
      }

    );
  }
  modifierchef() {
    this.usermc.adresse_mail = this.form2.get("adresse_mail").value;
    this.usermc.nom_utilisateur = this.form2.get("nom_utilisateur").value;
    this.usermc.Mot_de_passe = this.form2.get("Mot_de_passe").value;
    if (this.form2.get("adresse_mail").value == "") {
      this.usermc.adresse_mail = this.userc.adresse_mail;
    }
    if (this.form2.get("nom_utilisateur").value == "") {
      this.usermc.nom_utilisateur = this.userc.nom_utilisateur;
    }
    if (this.form2.get("Mot_de_passe").value == "") {
      this.usermc.Mot_de_passe = this.userc.Mot_de_passe;
    }
    this.authc.modifier(this.usermc).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      err => {
        console.log("erreur");
        alert("je suis de dans3");
      }
    );
    console.log(this.user);
    $("#editc").modal("hide");
  }
  modifier() {
    console.log(this.user);
    this.userm._id = this.user._id;
    this.userm.adresse_mail = this.form1.get("adresse_mail").value;
    this.userm.nom_utilisateur = this.form1.get("nom_utilisateur").value;
    this.userm.Mot_de_passe = this.form1.get("Mot_de_passe").value;
    if (this.form1.get("adresse_mail").value == "") {
      this.userm.adresse_mail = this.user.adresse_mail;
    }
    if (this.form1.get("nom_utilisateur").value == "") {
      this.userm.nom_utilisateur = this.user.nom_utilisateur;
    }
    if (this.form1.get("Mot_de_passe").value == "") {
      this.userm.Mot_de_passe = this.user.Mot_de_passe;
    }
    this.auth.modifier(this.userm).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      err => {
        console.log("erreur");
        alert("je suis de dans3");
      }
    );
    console.log(this.user);

    $("#edit").modal("hide");
  }
  modifier_controle() {
    $("#err_Nom_utilisateurGM").hide();
    $("#err_Adresse_emailGM").hide();
    $("#err_anc_Mot_de_passeGM").hide();
    $("#err_nouv_Mot_de_passeGM").hide();
    $("#err_conf_Mot_de_passeGM").hide();

    let validNomUtli = false;
    let validEmail = false;
    let validancMdp = false;
    let validnouvMdp = false;
    let validconfMdp = false;

    $("#Nom_utilisateur").focusout(() => {
      check_Nom_utilisateur();
    });

    $("#Adresse_email").focusout(() => {
      check_Adresse_eemail();
    });

    $("#nouv_Mot_de_passe").focusout(() => {
      check_nouv_Mot_de_passe();
    });

    $("#Conf_Mot_de_passe").focusout(() => {
      check_confimer_mot_de_passe();
    });

    function check_Nom_utilisateur() {
      let pattern = /^[a-zA-Z]*$/;
      let Nom = $("#Nom_utilisateur").val();
      if (pattern.test(Nom.toString()) && Nom != "") {
        $("#err_Nom_utilisateur").hide();
        $("#Nom_utilisateur").css("border-bottom", "2px solid #34F458");
      } else {
        $("#err_Nom_utilisateur").html(
          "Le nom na doit pas contenir certains caracteres"
        );
        $("#err_Nom_utilisateur").show();
        $("#Nom_utilisateur").css("border-bottom", "2px solid #F90A0A");
        $("#err_Nom_utilisateur").css("color", "#F90A0A");
        validNomUtli = true;
      }
    }

    function check_Adresse_eemail() {
      let pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      let Email = $("#Adresse_email").val();
      if (pattern.test(Email.toString()) && Email != "") {
        $("#err_Adresse_email").hide();
        $("#Adresse_email").css("border-bottom", "2px solid #34F458");
      } else {
        $("#err_Adresse_email").html("Adresse email non valide !");
        $("#err_Adresse_email").show();
        $("#Adresse_email").css("border-bottom", "2px solid #F90A0A");
        $("#err_Adresse_email").css("color", "#F90A0A");
        validEmail = true;
      }
    }

    function check_nouv_Mot_de_passe() {
      let Password = $("#nouv_Mot_de_passe")
        .val()
        .toString();
      let Password_length = Password.length;
      if (Password_length > 8 && Password != "") {
        $("#err_nouv_Mot_de_passe").hide();
        $("#nouv_Mot_de_passe").css("border-bottom", "2px solid #34F458");
      } else {
        $("#err_nouv_Mot_de_passe").html(
          "Le mot de passe doit contenir au moins 8 caractères"
        );
        $("#err_nouv_Mot_de_passe").show();
        $("#nouv_Mot_de_passe").css("border-bottom", "2px solid #F90A0A");
        $("#err_nouv_Mot_de_passe").css("color", "#F90A0A");
        validnouvMdp = true;
      }
    }

    function check_confimer_mot_de_passe() {
      let Password = $("#nouv_Mot_de_passe").val();
      let Password2 = $("#Conf_Mot_de_passe").val();
      if (Password2 !== Password && Password2 != "") {
        $("#err_conf_Mot_de_passe").html(
          "Les deux mots de passe ne correspondent pas"
        );
        $("#err_conf_Mot_de_passe").show();
        $("#Conf_Mot_de_passe").css("border-bottom", "2px solid #F90A0A");
        $("#err_conf_Mot_de_passe").css("color", "#F90A0A");
        validconfMdp = true;
      } else {
        $("#err_conf_Mot_de_passe").hide();
        $("#Conf_Mot_de_passe").css("border-bottom", "2px solid #34F458");
      }
    }
  }
}
