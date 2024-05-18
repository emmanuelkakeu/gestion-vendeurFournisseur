import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GasRetailer } from './models/gas-retailer.model';
import { GasRetailerService } from './services/gas-retailer.service';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule],
    providers: [GasRetailerService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bongaz';

  gasRetailers: GasRetailer[] = [];
  newRetailer: GasRetailer = {
    id : 0,
    profile :undefined,
    name: '',
    address: '',
    contactDetails: "",
    openingHours: '',
    imageFileName:"",
    gasServices: []
  };

  constructor(private gasRetailerService: GasRetailerService) { }

  ngOnInit() {
    this.loadGasRetailers();

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.newRetailer.profile = file;
    }
  }

  loadGasRetailers() {
    this.gasRetailerService.getAllGasRetailers()
      .subscribe(retailers => {
        this.gasRetailers = retailers;
      });
  }
  getRetailerImageUrl(retailer: any) {
    if (retailer.profile && retailer.imageFileName) {
      return `${this.gasRetailerService.apiUrl}/retailers/${retailer.id}/image`;
    } else {
      return 'path/to/default/image'; // Remplacez par le chemin vers une image par défaut si aucune image n'est disponible
    }
  }

  addGasRetailer() {
    this.gasRetailerService.addGasRetailer(this.newRetailer)
      .subscribe(newRetailer => {
        this.gasRetailers.push(newRetailer);
        this.newRetailer = {
          id:0,
          profile: undefined,
          name: '',
          address: '',
          contactDetails: "",
          openingHours: '',
          imageFileName:"",
          gasServices: []
        };
      });
  }

  updateGasRetailer(retailer: GasRetailer) {
    this.gasRetailerService.updateGasRetailer(retailer.id, retailer)
      .subscribe(updatedRetailer => {
        const index = this.gasRetailers.findIndex(r => r.id === updatedRetailer.id);
        this.gasRetailers[index] = updatedRetailer;
      });
  }

  updateRetailerImage(event: any) {
    const file = event.target.files[0];
    this.newRetailer.profile = file;
  }

  uploadRetailerImage() {
    if (this.newRetailer.profile) {
      this.gasRetailerService.uploadRetailerImage(this.newRetailer.id, this.newRetailer.profile).subscribe(
        response => {
          console.log('Retailer image uploaded successfully');
        },
        error => {
          console.error('Error uploading retailer image:', error);
        }
      );
    } else {
      console.error('Profile is null. Cannot upload retailer image.');
    }
  }


  deleteGasRetailer(retailerId: number) {
    this.gasRetailerService.deleteGasRetailer(retailerId)
      .subscribe(() => {
        this.gasRetailers = this.gasRetailers.filter(r => r.id !== retailerId);
      });
  }
}

