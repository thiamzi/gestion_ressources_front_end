export interface Notification {
  _id: string;
  sender: string;
  destinataire: string
  contenu: string;
  vue:boolean,
  dateCreation: Date;
}
