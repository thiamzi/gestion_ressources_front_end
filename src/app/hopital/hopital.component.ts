import { Component, OnInit } from "@angular/core";
import { BasedonnesService } from "../service/basedonnes.service";
import { Hopital } from "../models/Hopital";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-hopital",
  templateUrl: "./hopital.component.html",
  styleUrls: ["./hopital.component.scss"]
})
export class HopitalComponent implements OnInit {
  hopit: Hopital[] = [];
  hop: Hopital = {
    _id: "",
    Siret: "",
    NomH: "",
    AdresseH: "",
    Telephone: 0
  };

  hop2: Hopital = {
    _id: "",
    Siret: "",
    NomH: "",
    AdresseH: "",
    Telephone: 0
  };
  form: FormGroup;

  constructor(
    private base: BasedonnesService,
    private formbuild: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.recupH();
  }

  recupH() {
    this.base.lHopital().subscribe(res => {
      this.hopit = res["hopital"];
      for (let i = 0; i < 1; i++) {
        this.hop = this.hopit[i];
      }
    });
  }
  modifierhop() {
    this.hop2.AdresseH = this.form.get("AdresseH").value;
    this.hop2.Siret = this.form.get("Siret").value;
    this.hop2.NomH = this.form.get("NomH").value;
    this.hop2.Telephone = this.form.get("Telephone").value;
    this.base.ModifHopital(this.hop2, this.hop._id).subscribe(res => {
      this.ngOnInit();
    });
    $("#edit").modal("hide");
  }
  remplirForm() {
    this.form.setValue({
      Siret: this.hop.Siret,
      NomH: this.hop.NomH,
      AdresseH: this.hop.AdresseH,
      Telephone: this.hop.Telephone
    });
  }
  initForm() {
    this.form = this.formbuild.group({
      Siret: ["", Validators.required],
      NomH: ["", Validators.required],
      AdresseH: ["", Validators.required],
      Telephone: ["", Validators.required]
    });
  }
}
