import { Agency } from 'src/app/agency/model/agency';

export class Agent {
  id: number;
  nom: string;
  prenom: string;
  cin: string;
  adresse: string;
  dateNaissance: Date;
  tel: string;
  email: string;
  agence: Agency;
  username: string;
  password: string;
}
