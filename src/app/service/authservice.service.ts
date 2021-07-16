import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/User';

export interface Userdetails {
  _id: string;
  numero: number;
  nom_utilisateur: string;
  adresse_mail: string;
  Mot_de_passe: string;
  exp: number;
  iat: number;
}
export interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  url = 'http://localhost:4000';
  private token: string;
  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken');
    }
    return this.token;
  }
  public getUserdetails(): Userdetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  public Islogged(): boolean {
    const user = this.getUserdetails();
    if (user) {
      user.exp > Date.now() / 1000;
      return true ;
    } else {
      return false;
    }
  }
  public modifier(user: User): Observable<any> {
    const base = this.http.put(`${this.url}/users/modifier`, user);
    alert(user._id);
    const request = base.pipe(
      map((data: TokenResponse) => {

        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public CreerCompte(user: User): Observable<any> {
    const base = this.http.post(`${this.url}/users/creation`, user);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public connexion(user: User): Observable<any> {
    const base = this.http.post(`${this.url}/users/connection`, user);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }
  public profile(): Observable<any> {
    return this.http.get(`${this.url}/users/profil`, {
      headers: { Authorization: `${this.getToken()}` }
    });
  }

  public decoonexion(): void {
    this.token = '';
    window.localStorage.removeItem('usertoken');
    this.router.navigateByUrl('/login');
  }

  public modifMDP(user) {
    return this.http.put(`${this.url}/users/`, user);
  }

}
