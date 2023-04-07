import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Achat } from './model/achat';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AchatService {
  host="http://localhost:8080/apiachat";
  constructor(private client:HttpClient) { }
  getAllAchats(): Observable<Achat[]> {
    return this.client.get<Achat[]>(this.host+"/all");
  }
  getAchatById(id: string): Observable<Achat> {
    const url = `${this.host}/${id}`;
    return this.client.get<Achat>(url);
  }
  addAchat(achat: Achat): Observable<Achat> {
    return this.client.post<Achat>(this.host+"/add", achat);
  }

  updateAchat( achat: Achat): Observable<Achat> {
    const url = `${this.host+"/update"}`;
    return this.client.put<Achat>(url, achat);
  }

  deleteAchat(id: string): Observable<Achat> {
    const url = `${this.host}/del/${id}`;
    return this.client.delete<Achat>(url);
  }

  getAchatsByDate(dateDebut: string, dateFin: string): Observable<Achat[]> {
    const url = `${this.host+"/by-date"}/search?dateDebut=${dateDebut}&dateFin=${dateFin}`;
    return this.client.get<Achat[]>(url);
  }
}
