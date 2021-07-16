import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BasedonnesService } from 'app/service/basedonnes.service';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Info } from 'app/models/Info';
import { Bulletin } from 'app/models/Bulletin';
import { EchangeService } from 'app/service/echange.service';
import { Employer } from 'app/models/Employer';
@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit {
  date:Date=new Date()
  emp_id:string=''
  employer:Employer= {
    emp_id:"",
    Nom: "",
    Prenom: "",
    Nss:"",
    Adresse:"",
    Sexe: "",
    Statut: "",
    Date_naiss: null,
    Anciennete: null,
    Email: "",
    Telephone: null,
    Poste: null,
  }
  bull_id:string=''
  form1: FormGroup
  bulletin:Bulletin={
    bull_id: "",
    Periode: "",
    Date_c: null,
  }
  bulletinV={
    Infos:[]
  }
  infoA:Info[]
  constructor(private router : Router,private datepipe : DatePipe,private formbuild: FormBuilder,private database: BasedonnesService,private route: ActivatedRoute, private echange:EchangeService ) { }

  ngOnInit() {
    this.initForm();
    this.echange.bull_id.subscribe(id=>this.bull_id=id);
    this.emp_id = this.route.snapshot.paramMap.get('id');
    this.database.UnEmployer(this.emp_id).subscribe(res => {
      this.employer = res['employer'];
      console.log(this.employer);
    },
      err => { console.log('erreur'); }
    );
    if(this.bull_id.length>3){
      this.recupB();
      $('#creer').hide();
      $('#voire').show();
    }else{
      $('#voire').hide();
      $('#creer').show();
    }
  }
totalPS(){
  let total=0;
  if(this.bulletinV){
    for(let i = 0;i<this.bulletinV.Infos.length;i++ ){
      total+=this.bulletinV.Infos[i].part_salarie;
    }
  }
  return total
  

}
totalPE(){
  let total=0;
  if(this.bulletinV){
    for(let i = 0;i<this.bulletinV.Infos.length;i++ ){
      total+=this.bulletinV.Infos[i].part_employeur;
    }
  }
  return total
}
total(){
  return this.totalPE() + this.totalPS();
}

  recupB(){
    this.database.UnBulletin(this.bull_id).subscribe(res => {
      this.bulletinV = res['bulletin'];
      console.log(this.bulletinV);
    },
      err => { console.log('erreur'); }
    );
  }
  isbul(){
    if(!this.bulletinV){
      alert(false)
      return false
    }
    alert(true)
    return true
  }
  initForm(){
    
    this.form1 = this.formbuild.group({
      a0: ['', Validators.required],
      a1: ['', Validators.required],
      a2: ['', Validators.required],
      a3: ['', Validators.required],
      a4: ['', Validators.required],
      a5: ['', Validators.required],
      a6: ['', Validators.required],
      a7: ['', Validators.required],
      a8: ['', Validators.required],
      a9: ['', Validators.required],
      a10: ['', Validators.required],
      a11: ['', Validators.required],
      a12: ['', Validators.required],
      a13: ['', Validators.required],
      a14: ['', Validators.required],
      a15: ['', Validators.required],
      a16: ['', Validators.required],
      a17: ['', Validators.required],
      a18: ['', Validators.required],
      a19: ['', Validators.required],
      a20: ['', Validators.required],
      a21: ['', Validators.required],
      a22: ['', Validators.required],
      a23: ['', Validators.required],
      a24: ['', Validators.required],
      a25: ['', Validators.required],
      a26: ['', Validators.required],
      a27: ['', Validators.required],
      a28: ['', Validators.required],
      a29: ['', Validators.required],
      a30: ['', Validators.required],
      a31: ['', Validators.required],
      a32: ['', Validators.required],
      a33: ['', Validators.required],
      a34: ['', Validators.required],
      a35: ['', Validators.required],
      a36: ['', Validators.required],
      a37: ['', Validators.required],
      a38: ['', Validators.required],
      a39: ['', Validators.required],
      a40: ['', Validators.required],
      a41: ['', Validators.required],
      a42: ['', Validators.required],
      a43: ['', Validators.required],
      a44: ['', Validators.required],
      a45: ['', Validators.required],
      a46: ['', Validators.required],
      a47: ['', Validators.required],
      a48: ['', Validators.required],
      a49: ['', Validators.required],
      a50: ['', Validators.required],
      a51: ['', Validators.required],
      a52: ['', Validators.required],
      a53: ['', Validators.required],
      a54: ['', Validators.required],
      a55: ['', Validators.required],
      a56: ['', Validators.required],
      a57: ['', Validators.required],
      a58: ['', Validators.required],
      a59: ['', Validators.required],
      a60: ['', Validators.required],
      a61: ['', Validators.required],
      a62: ['', Validators.required],
      a63: ['', Validators.required],
      a64: ['', Validators.required],
      a65: ['', Validators.required],
      a66: ['', Validators.required],
      a67: ['', Validators.required],
      a68: ['', Validators.required],
      a69: ['', Validators.required],
      a70: ['', Validators.required],
      a71: ['', Validators.required],
      a72: ['', Validators.required],
      a73: ['', Validators.required],
      a74: ['', Validators.required],
      a75: ['', Validators.required],
      a76: ['', Validators.required],
      a77: ['', Validators.required],
      a78: ['', Validators.required],
      a79: ['', Validators.required],
      a80: ['', Validators.required],
      a81: ['', Validators.required],
      a82: ['', Validators.required],
      a83: ['', Validators.required],
      a84: ['', Validators.required],
    });
  }

  imprimer() {
    if(this.imprimer0()){
      window.location.reload()
    }
  }
  imprimer0(){
    const printContents = document.getElementById('bulletin').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    return true;
  }

  enregistrer0(){
    this.bulletin.Periode= this.form1.get('a0').value;
    this.database.CreerBulletin(this.bulletin,this.emp_id).subscribe(res => {
        console.log(res);
        this.bulletin=res['bulletin'];
        this.enregistrer1();
        },err => {
          console.log('erreur '+ err); 
        });
  }
  
  enregistrer1(){
    this.regler0();
    let a="a";
    this.infoA=[];
    for(let i = 1;i<=84;i++){
      if((i-1)%4==0){
        let inf:Info={
    
          info_id: "",
          CSS: "",
          Base: 0,
          Taux_salarial: 0,
          part_salarie: 0,
          part_employeur: 0,
     
        };
        inf.CSS=this.donnerCCS(i-1);
        inf.Base= this.form1.get((a+i)).value;
        inf.Taux_salarial=this.form1.get(a+(i+1)).value;
        inf.part_salarie=this.form1.get(a+(i+2)).value;
        inf.part_employeur=this.form1.get(a+(i+3)).value;
        this.infoA.push(inf);
        console.log(inf);
      } 
    }
    this.database.CreerInfos(this.infoA,this.bulletin.bull_id).subscribe(res => {
        console.log(res);
        },err => {
          console.log('erreur '+ err); 
        });
  }

  regler0(){
    let a="a";
    let total=0;
    let tota=0;
    for(let i = 1;i<=84;i++){
      if((i-3)%4==0){
        this.form1.patchValue(this.regler1((a+(i)),(this.form1.get((a+(i-2))).value)*(this.form1.get((a+(i-1))).value)*0.01));
        total+= this.form1.get((a+(i))).value
        this.form1.patchValue(this.regler1((a+(i+1)),(this.form1.get((a+(i+1))).value)*1))
        tota+=this.form1.get((a+(i+1))).value;
        

      }
    }
    $('#a85').text(total.toFixed(3))
    $('#a86').text(tota.toFixed(3))
    $('#a87').text((tota+total).toFixed(3))
  }
  regler1(a,v){
    switch(a){
        
      case "a1":
        return {a1:v};
        break
      case "a2":
        return {a2:v}
        break
      case"a3":
        return {a3:v}
        break
      case "a4":
        return {a4:v}
        break
      case "a5":
        return {a5:v}
        break
      case "a6":
        return {a6:v}
        break
      case "a7":
        return {a7:v}
        break
      case "a8":
        return {a8:v}
        break
      case "a9":
        return {a9:v}
        break
      case "a10":
        return {a10:v}
        break
      case "a11":
        return {a11:v};
        break
      case "a12":
        return {a12:v}
        break
      case"a13":
        return {a13:v}
        break
      case "a14":
        return {a14:v}
        break
      case "a15":
        return {a15:v}
        break
      case "a16":
        return {a16:v}
        break
      case "a17":
        return {a17:v}
        break
      case "a18":
        return {a18:v}
        break
      case "a19":
        return {a19:v}
        break
      case "a20":
        return {a20:v}
        break
      case "a21":
        return {a21:v};
        break
      case "a22":
        return {a22:v}
        break
      case"a23":
        return {a23:v}
        break
      case "a24":
        return {a24:v}
        break
      case "a25":
        return {a25:v}
        break
      case "a26":
        return {a26:v}
        break
      case "a27":
        return {a27:v}
        break
      case "a28":
        return {a28:v}
        break
      case "a29":
        return {a29:v}
        break
      case "a30":
        return {a30:v}
        break
      case "a31":
        return {a31:v};
        break
      case "a32":
        return {a32:v}
        break
      case"a33":
        return {a33:v}
        break
      case "a34":
        return {a34:v}
        break
      case "a35":
        return {a35:v}
        break
      case "a36":
        return {a36:v}
        break
      case "a37":
        return {a37:v}
        break
      case "a38":
        return {a38:v}
        break
      case "a39":
        return {a39:v}
        break
      case "a40":
        return {a40:v}
        break
      case "a41":
        return {a41:v};
        break
      case "a42":
        return {a42:v}
        break
      case"a43":
        return {a43:v}
        break
      case "a44":
        return {a44:v}
        break
      case "a45":
        return {a45:v}
        break
      case "a46":
        return {a46:v}
        break
      case "a47":
        return {a47:v}
        break
      case "a48":
        return {a48:v}
        break
      case "a49":
        return {a49:v}
        break
      case "a50":
        return {a50:v}
        break
      case "a51":
        return {a51:v};
        break
      case "a52":
        return {a52:v}
        break
      case"a53":
        return {a53:v}
        break
      case "a54":
        return {a54:v}
        break
      case "a55":
        return {a55:v}
        break
      case "a56":
        return {a56:v}
        break
      case "a57":
        return {a57:v}
        break
      case "a58":
        return {a58:v}
        break
      case "a59":
        return {a59:v}
        break
      case "a60":
        return {a60:v}
        break
      case "a61":
        return {a61:v};
        break
      case "a62":
        return {a62:v}
        break
      case"a63":
        return {a63:v}
        break
      case "a64":
        return {a64:v}
        break
      case "a65":
        return {a65:v}
        break
      case "a66":
        return {a66:v}
        break
      case "a67":
        return {a67:v}
        break
      case "a68":
        return {a68:v}
        break
      case "a69":
        return {a69:v}
        break
      case "a70":
        return {a70:v}
        break
      case "a71":
        return {a71:v};
        break
      case "a72":
        return {a72:v}
        break
      case"a73":
        return {a73:v}
        break
      case "a74":
        return {a74:v}
        break
      case "a75":
        return {a75:v}
        break
      case "a76":
        return {a76:v}
        break
      case "a77":
        return {a77:v}
        break
      case "a78":
        return {a78:v}
        break
      case "a79":
        return {a79:v}
        break
      case "a80":
        return {a80:v}
        break
      case "a81":
        return {a81:v};
        break
      case "a82":
        return {a82:v}
        break
      case"a83":
        return {a83:v}
        break
      case "a84":
        return {a84:v}
        break

     

    }
  }
  donnerCCS(i){
      switch(i){
        
        case 0:
          return "Sécurité Sociale-Maladie Maternité Invalidité Décès";
          break
        case 4:
          return "Complémentaire Incapcité Invalidité Décès";
          break
        case 8:
          return "Complémentaire Santé";
          break
        case 12:
          return "ACCIDENTS DU TRAVAIL-MALADIES PROFESSIONELLES";
          break
        case 16:
          return "RETRAITE";
          break
        case 20:
          return "Sécurité Sociale plafonné";
          break
        case 24:
          return "Sécurité Sociale déplafonné";
          break
        case 28:
          return "Complementaire Tranche A";
          break
        case 32:
          return "Complémentaire Garantie Minimalede Points";
          break
        case 36:
          return "Complementaire Tranche B";
          break
        case 40:
          return "Complementaire Tranche C";
          break
        case 44:
          return "Suplémentaire";
          break
        case 48:
          return "FAMILLE-SECURITE SOCIALE";
          break
        case 52:
          return "ASSURANCE CHOMAGE";
          break
        case 56:
          return "chomage";
          break
        case 60:
          return "APEC";
          break
        case 64:
          return "COTISATIONS STATUAIRES";
          break
        case 68:
          return "AUTRES CONTRIBUTIONS DUES PAR L'EMPLOYEUR";
          break
        case 72:
          return "CSG non Imposable à l'impot sur le revenu";
          break
        case 76:
          return "CSGCRDS Imposable à l'impot sur le revnu";
          break
        case 80:
          return "ALlEGEMENT DE COTISATIONS";
          break

      }
  }
}
