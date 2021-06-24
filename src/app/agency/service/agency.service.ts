import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Agency } from '../model/agency';
import { Observable } from 'rxjs/internal/Observable';
import { Agent } from 'src/app/agent/model/agent';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  private agencyUrl: string;
  private agenceAdminUrl: string;
  constructor(private http: HttpClient) {
    this.agenceAdminUrl = 'http://localhost:8082/admin/';
    this.agencyUrl = 'http://localhost:8082/agence';
  }
  public findAll(): Observable<Agency[]> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    return this.http.get<Agency[]>(this.agenceAdminUrl + 'listeagences');
  }

  public save(agence: Agency) {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    
    return this.http.post<Agency>(this.agenceAdminUrl + 'agences', agence);
  }
  delete(id: string): Observable<any> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.delete(this.agenceAdminUrl+"agence/"+id);
  }
  public update(id: string, agency: Agency): Observable<any> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.put(this.agenceAdminUrl+"agence/"+id, agency);
  }

  public findAgency(id: string): Observable<Agency[]> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Agency[]>(this.agenceAdminUrl + 'listeagences?id=' + id);
  }
}
