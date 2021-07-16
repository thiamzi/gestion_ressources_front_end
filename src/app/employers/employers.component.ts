import { Component, OnInit, Input } from '@angular/core';
import { Employer } from 'app/models/Employer';
import { DatePipe } from '@angular/common';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { BasedonnesService } from 'app/service/basedonnes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EchangeService } from 'app/service/echange.service';


@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.scss']
})
export class EmployersComponent implements OnInit {
  @Input() emp_id:string;

  services:object[]
  postes:object[]
  ser:string
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
  employerM: Employer= {
    emp_id:"",
    Nss:"",
    Nom: "",
    Prenom: "",
    Statut: "",
    Sexe: "",
    Adresse:"",
    Date_naiss: null,
    Anciennete: null,
    Email: "",
    Telephone: null,
    Poste: null,
  }
  form1 : FormGroup
  form2 : FormGroup  
  form3 : FormGroup
  constructor( private router : Router,private datepipe : DatePipe,private formbuild: FormBuilder,private database: BasedonnesService,private route: ActivatedRoute, private echange:EchangeService ) { }
dater: string;
emailFormControl = new FormControl('', [
  Validators.required,
  Validators.email,
]);

matcher = new ErrorStateMatcher();
  ngOnInit() {
    this.emp_id = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.Lemployer();
    this.lesServices();
   this.dater = this.datepipe.transform(this.employer.Date_naiss , 'dd/MM/yyyy');
   
   
  }

  ajouterB(){
this.echange.changeEmp(this.emp_id)
this.echange.changeBull('')
  }
  voireB(id :string){
    this.echange.changeEmp(this.emp_id)
    this.echange.changeBull(id)
  }

  lesServices(){
    this.database.getServices().subscribe(res => {
      this.services = res['services'];
      console.log(this.services)
    },
      err => { console.log('erreur'); }
    );
  }

  Lemployer(){
    this.database.UnEmployer(this.emp_id).subscribe(res => {
      this.employer = res['employer'];
      console.log(this.employer);
    },
      err => { console.log('erreur'); }
    );
  }
  initForm(){
    this.form1 = this.formbuild.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      nss: ['', Validators.required],
      dn: ['', Validators.required],
      statut: ['', Validators.required],
      adresse: ['', Validators.required],
      anciennete: ['', Validators.required],
      sexe: ['', Validators.required],
      emailFormControl: ['', Validators.required],
      telephone: ['', Validators.required],
    })
    this.form2 = this.formbuild.group({
      ser: ['', Validators.required],
    })
    this.form3 = this.formbuild.group({
      pos: ['', Validators.required],
    })
  }
  modEmployer(){
    this.employerM.Nom = this.form1.get('nom').value;
    this.employerM.Prenom = this.form1.get('prenom').value;
    this.employerM.Nss = this.form1.get('nss').value;
    this.employerM.Adresse = this.form1.get('adresse').value;
    this.employerM.Sexe = this.form1.get('sexe').value;
    this.employerM.Anciennete = this.form1.get('anciennete').value;
    this.employerM.Email = this.form1.get('emailFormControl').value;
    this.employerM.Telephone = this.form1.get('telephone').value;
    this.employerM.Statut = this.form1.get('statut').value;
    this.employerM.Date_naiss = this.form1.get('dn').value;
    this.database.ModifierEmployer(this.employerM,this.emp_id).subscribe(res => {
      console.log(res);
      this.ngOnInit();
      },err => {
        console.log('erreur '+ err); 
      });
    $('#edit').modal('hide')
  }
  remplirForm1(){
  
      this.form1.setValue({ 
        nom : this.employer.Nom,
        prenom :  this.employer.Prenom,
        sexe :  this.employer.Sexe || '',
        nss :  this.employer.Nss,
        dn :  this.employer.Date_naiss,
        statut :  this.employer.Statut,
        adresse :  this.employer.Adresse,
        anciennete :  this.employer.Anciennete,
        emailFormControl :  this.employer.Email,
        telephone :  this.employer.Telephone               
      });

  }
  supEmployer(){
      const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Etes vous sûre?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'No, annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.database.SuppEmployer(this.emp_id).subscribe(res =>{
          console.log(res);
          history.go(-1);
            swalWithBootstrapButtons.fire(
              'Supprimé!',
              'Employé supprimé.',
              'success'
            )
         
            });
      }else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annulé',
          'Suppression annulée :)',
          'error'
        )
      }
    });
  }
  affecter(){
    this.ser= this.form2.get('ser').value;
    $('#premier').modal('hide')
    this.database.getPostes(this.ser).subscribe(res => {
      this.postes = res['postes'];
      console.log(this.postes);
      $('#deuxieme').modal('show')
    },
      err => { console.log('erreur'); }
    );
    
  }

  confirmer(){
    let  pos= this.form3.get('pos').value;
    console.log('you yyyyyyyyyyyyyyy111111')
    this.database.affecter(this.employer,this.emp_id,pos,this.ser).subscribe(res => {
      console.log('you yyyyyyyyyyyyyyy')
      console.log(res)
      console.log('you yyyyyyyyyyyyyyy')

      $('#deuxieme').modal('hide');

      history.go(-1)
    },
      err => { console.log('erreur'); }
    );
    
  }
  matricul(id:string){
    return "0018";
  }
  
}
