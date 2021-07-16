import { Employer } from 'app/models/Employer';
export interface Poste {
  pos_id: string;
  Active: boolean;
  Libelle_p: string;
  Description_p: string;
  Employers: object;

}
