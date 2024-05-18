import {GasService} from'./GasRetailerService.model';


export class GasRetailer {
  id: number;
  name: string;
  address: string;
  contactDetails: string;
  openingHours: string;
  imageFileName: string;
  profile: File|undefined; // Utilisez Uint8Array pour représenter des tableaux d'octets en TypeScript
  gasServices: GasService[];


}

