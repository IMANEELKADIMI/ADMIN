import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminUrl: string;

  constructor(private http: HttpClient) {
    this.adminUrl = 'http://localhost:8082/admin';
  }
  public findAll(): Observable<Admin[]> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    return this.http.get<Admin[]>(this.adminUrl + 's');
  }
  public findOne(id:number): Observable<Admin>{
    let usename = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic' + btoa(usename + ':' + password)
    });
    return this.http.get<Admin>(this.adminUrl + '?id=' + id);
  }
  public save(admin: Admin) {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    return this.http.post<Admin>(this.adminUrl + 's', admin);
  }
  delete(id: number): Observable<any> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    return this.http.delete(this.adminUrl+"/"+id);
  }
  public update(id: number, admin: Admin) {
    let usename = 'adm';
    let password = 'adm';
    const headers = new HttpHeaders({
      Authorization: 'Basic' + btoa(usename + ':' + password)
    })
    return this.http.put(this.adminUrl + '/' + id, admin);
  }
}
