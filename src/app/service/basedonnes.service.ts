import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Service } from "../models/service";
import { Poste } from "../models/Poste";
import { Materiel } from "../models/Materiel";
import { Info } from "../models/Info";
import { Commande } from "../models/Commande";
import { Employer } from "../models/Employer";
import { Bulletin } from "app/models/Bulletin";
import { MatCommande } from "../models/mat_commande";
import { Hopital } from "../models/Hopital";

@Injectable({
  providedIn: "root"
})
export class BasedonnesService {
  url = "http://localhost:4000";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  //Service

  public CreerService(service: Service): Observable<any> {
    return this.http.post(`${this.url}/services/`, service);
  }

  public TousLesService(): Observable<any> {
    return this.http.get(`${this.url}/services/`);
  }

  public UnService(id: any): Observable<any> {
    return this.http.get(`${this.url}/services/${id}`);
  }

  public SuppService(id): Observable<any> {
    return this.http.delete(`${this.url}/services/delete/${id}`);
  }
  public getServices(): Observable<any> {
    return this.http.get(`${this.url}/services/permit/`);
  }
  public getPostes(id): Observable<any> {
    return this.http.get(`${this.url}/postes/permit/${id}`);
  }
  public ModifierService(service: Service, id): Observable<any> {
    return this.http.put(`${this.url}/services/${id}`, service);
  }

  //poste

  public CreerPoste(poste: Poste, id): Observable<any> {
    return this.http.post(`${this.url}/postes/${id}`, poste);
  }

  public ModifierPoste(poste: Poste, id): Observable<any> {
    return this.http.put(`${this.url}/postes/${id}`, poste);
  }

  public UnPoste(id): Observable<any> {
    return this.http.get(`${this.url}/postes/unposte/${id}`);
  }
  public SevicePostes(id): Observable<any> {
    return this.http.get(`${this.url}/postes/${id}`);
  }

  public SuppPoste(id): Observable<any> {
    return this.http.delete(`${this.url}/postes/delete/${id}`);
  }

  //materiel

  public CreerMateriel(materiel: Materiel, id): Observable<any> {
    return this.http.post(`${this.url}/materiels/${id}`, materiel);
  }
  public ModifierMateriel(materiel: Materiel, id): Observable<any> {
    return this.http.put(`${this.url}/materiels/${id}`, materiel);
  }
  public ModifierMat(materiel: Materiel, id): Observable<any> {
    return this.http.put(`${this.url}/materiels/acomm/${id}`, materiel);
  }

  public TousLesMateriel(): Observable<any> {
    return this.http.get(`${this.url}/materiels/`);
  }

  public UnMateriel(id: any): Observable<any> {
    return this.http.get(`${this.url}/materiels/mat/${id}`);
  }

  
  public SeviceMateriel(id: any): Observable<any> {
    return this.http.get(`${this.url}/materiels/${id}`);
  }

  public SuppMateriel(id): Observable<any> {
    return this.http.delete(`${this.url}/materiels/delete/${id}`);
  }

  //Employer

  public CreerEmployer(employer: Employer, id): Observable<any> {
    return this.http.post(`${this.url}/employers/${id}`, employer);
  }
  public ModifierEmployer(employer: Employer, id): Observable<any> {
    return this.http.put(`${this.url}/employers/${id}`, employer);
  }

  public TousLesEmployer(): Observable<any> {
    return this.http.get(`${this.url}/employers/`);
  }

  public UnEmployer(id: any): Observable<any> {
    return this.http.get(`${this.url}/employers/${id}`);
  }
  public PostesEmployer(id: any): Observable<any> {
    return this.http.get(`${this.url}/employers/poste/${id}`);
  }
  public SuppEmployer(id): Observable<any> {
    return this.http.delete(`${this.url}/employers/delete/${id}`);
  }
  public affecter(employe: Employer, id, idp, ids): Observable<any> {
    return this.http.put(
      `${this.url}/employers/affecter/${id}/${idp}/${ids}`,
      employe
    );
  }

  //Bulletein_de_paie

  public CreerBulletin(bulletin: any, id): Observable<any> {
    return this.http.post(`${this.url}/bulletins/${id}`, bulletin);
  }

  public UnBulletin(id: any): Observable<any> {
    return this.http.get(`${this.url}/bulletins/${id}`);
  }
  public EmployerBulletin(id: any): Observable<any> {
    return this.http.get(`${this.url}/bulletins/employer/${id}`);
  }
  public SuppBulletin(id): Observable<any> {
    return this.http.delete(`${this.url}/bulletins/delete/${id}`);
  }

  //Infos

  public CreerInfos(infoss: Info[], id): Observable<any> {
    let infos={infos:infoss}
    return this.http.post(`${this.url}/infos/${id}`, infos);
  }
  public ModifierInfos(infos: Info, id): Observable<any> {
    return this.http.put(`${this.url}/infos/${id}`, infos);
  }

  public UnInfos(id: any): Observable<any> {
    return this.http.get(`${this.url}/infos/${id}`);
  }
  public CategorieInfos(id: any): Observable<any> {
    return this.http.get(`${this.url}/infos/categorie/${id}`);
  }
  public SuppInfose(id): Observable<any> {
    return this.http.delete(`${this.url}/infos/delete/${id}`);
  }

  //Commande

  public CreerCommande(commande: Commande): Observable<any> {
    return this.http.post(`${this.url}/commandes/`, commande);
  }

  public TousLesCommande(): Observable<any> {
    return this.http.get(`${this.url}/commandes/`);
  }

  public UnCommande(id: any): Observable<any> {
    return this.http.get(`${this.url}/commandes/${id}`);
  }
  public ModifCommande(commande: Commande, id): Observable<any> {
    return this.http.put(`${this.url}/commandes/${id}`, commande);
  }
  public SuppCommande(id): Observable<any> {
    return this.http.delete(`${this.url}/commandes/delete/${id}`);
  }

  //Materiel_comm

  public CreerMateriel_comm(materiel_comm: MatCommande, id): Observable<any> {
    return this.http.post(`${this.url}/materiels_comms/${id}`, materiel_comm);
  }
  public ModifierMateriel_comm(
    materiel_comm: MatCommande,
    id_c,
    id
  ): Observable<any> {
    return this.http.put(
      `${this.url}/materiels_comms/${id_c}/${id}`,
      materiel_comm
    );
  }

  public UnMateriel_comm(id: any): Observable<any> {
    return this.http.get(`${this.url}/materiels_comms/un/${id}`);
  }
  public TousMateriel_comms(id): Observable<any> {
    return this.http.get(`${this.url}/materiels_comms/comm/${id}`);
  }
  public TousMateriel_comms_histo(id): Observable<any> {
    return this.http.get(`${this.url}/materiels_comms/histo/${id}`);
  }

  public ModifMateriel_comms_histo(mat_com : MatCommande , id_h , id): Observable<any> {
    return this.http.put(`${this.url}/materiels_comms/histo/${id_h}/${id}`, mat_com);
  }
  public serviceMateriel_comm(id: any): Observable<any> {
    return this.http.get(`${this.url}/materiels_comms/serv/${id}`);
  }
  public SuppMateriel_comm(id): Observable<any> {
    return this.http.delete(`${this.url}/materiels_comms/delete/${id}`);
  }
  public SuppMateriel_comm_com(mat_com: MatCommande, id): Observable<any> {
    return this.http.put(
      `${this.url}/materiels_comms/delete/mat/${id}`,
      mat_com
    );
  }

  public CreerNotif(sender:string, contenu:string, destinataires:Array<string>){
    let ob:Observable<any>;
    for (let destinataire in destinataires) {
      let a={
        sender:sender,
        contenu:contenu,
        destinataire: destinataires[destinataire]
      }
      this.http.post(`${this.url}/notifications/`, a).subscribe(res=>{},err=>{});
    }
  
   
  }

  public GetNotif(id): Observable<any> {
    return this.http.get(`${this.url}/notifications/${id}`);
  }

  public TousLesUsers(): Observable<any> {
    return this.http.get(`${this.url}/users/users_recup/`);
  }

  public Unuser(id): Observable<any> {
    return this.http.get(`${this.url}/notifications/unuser/${id}`);
  }
 
  public TousLesHistos(id): Observable<any> {
    return this.http.get(`${this.url}/historiques/${id}`);
  }

  public ModifHopital(hopi: Hopital, id): Observable<any> {
    return this.http.put(`${this.url}/hopital/${id}/`, hopi);
  }
  public lHopital(): Observable<any> {
    return this.http.get(`${this.url}/hopital/`);
  }
}
