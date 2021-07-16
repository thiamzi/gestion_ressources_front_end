import { Component, OnInit } from '@angular/core';
import { AuthserviceService, Userdetails } from 'app/service/authservice.service';
import { BasedonnesService } from 'app/service/basedonnes.service';
import { Notification } from 'app/models/Notifications';
import { DatePipe } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  vues:number=4
  tout:boolean=false;
  constructor(private datepipe : DatePipe,private auth  :AuthserviceService ,private database: BasedonnesService) { 
  }
  user: Userdetails;
  notifications:Notification[]=[]
  afficherNotifs(){
    if(this.notifications){
      for (let i=0;i<this.notifications.length;i++) {
        if(!this.notifications[i].vue){
          this.showNotification(this.notifications[i].sender,this.notifications[i].contenu,this.notifications[i].dateCreation);
          this.wait(2) 
        }
      }
    }
    
  }
  inf(i){
    if(this.tout){
      return true;
    }
    if(i<this.vues){
      return true;
    }
    return false;
  }

  plus(){
    if(this.tout){
      this.tout=false;
    }else{
      this.tout=true;
    }
    this.ngOnInit();
  }
  wait(ms)
  {
  var d = new Date();
  var d2 = null;
  do {
     d2 = new Date(); 
    }
  while(d2.getTime() -d.getTime()< ms);
  }
  recupNotif(){
    this.auth.profile().subscribe(
      res => {
        this.user = res;
        if(this.user.numero){
          this.database.GetNotif(''+this.user.numero).subscribe(
            res => {
              this.notifications = res['notifications'];
              this.afficherNotifs();   
            },
            err => { console.log('erreur'); }
          );
        }
        
      },
      err => { console.log('erreur'); }
    );
  }
  formatDate(date:Date){
    let d=this.datepipe.transform(date , 'dd/MM/yyyy');
    let h=this.datepipe.transform(date , 'hh');
    let m=this.datepipe.transform(date , 'mm');
    return '' + d+' à '+h+'h '+m+'mn'


  }
  showNotification(sender:string,contenu:string,date:Date){
      $.notify({
          icon: "notifications",
          message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

      },{
          type: 'info',
          timer: 4000,
          placement: {
              from: 'bottom',
              align: 'right'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">'+this.formatDate(date)+'</span> ' +
            '<span data-notify="message">'+sender+' '+ contenu+'</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });

  }
  ngOnInit() {
    this.recupNotif();
    if(this.tout){
      document.getElementById('idd').innerHTML='moins'
    }else{
      document.getElementById('idd').innerHTML='voire tout'
    }
  }

}
