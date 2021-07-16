import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EchangeService {
  private emp=new BehaviorSubject<string>('');
  private bull=new BehaviorSubject<string>('');
  emp_id=this.emp.asObservable();
  bull_id=this.bull.asObservable();

  constructor() { }

  changeEmp(id:string){
    this.emp.next(id)
    
  }
  changeBull(id:string){
    this.bull.next(id)
  }
  donner(){
    let a;
    this.emp_id.subscribe(id=>a=id);
    return a;
  }
}
