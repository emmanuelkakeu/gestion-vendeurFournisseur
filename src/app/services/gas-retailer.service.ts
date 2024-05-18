import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GasRetailer } from '../models/gas-retailer.model'; // Remplacez par le bon nom de votre modèle

@Injectable({
  providedIn: 'root'
})
export class GasRetailerService {


 public apiUrl = 'http://localhost:8082/api/retailers';

  constructor(private http: HttpClient) { }

  addGasRetailer(gasRetailer: GasRetailer): Observable<GasRetailer> {
    return this.http.post<GasRetailer>(this.apiUrl, gasRetailer);
  }

  updateGasRetailer(retailerId: number, updatedRetailer: GasRetailer): Observable<GasRetailer> {
    return this.http.put<GasRetailer>(`${this.apiUrl}/${retailerId}`, updatedRetailer);
  }
  uploadRetailerImage(gasRetailerId: number, profile: File) {
    const url = `${this.apiUrl}/retailers/${gasRetailerId}/image`;
    const formData = new FormData();
    formData.append('profile', profile);
    return this.http.put(url, formData);
  }

  deleteGasRetailer(retailerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${retailerId}`);
  }

  getGasRetailerById(retailerId: number): Observable<GasRetailer> {
    return this.http.get<GasRetailer>(`${this.apiUrl}/${retailerId}`);
  }

  getAllGasRetailers(): Observable<GasRetailer[]> {
    return this.http.get<GasRetailer[]>(this.apiUrl);
  }
}
