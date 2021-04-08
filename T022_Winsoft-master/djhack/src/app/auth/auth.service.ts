import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  url = "http://localhost:5001/authenticate";
  //url2 = "https://localhost:8080/upload";
  private invalid = new BehaviorSubject<boolean>(false);
  private logout = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<boolean>(false);
  private change = new BehaviorSubject<boolean>(false);
  private unauth = new BehaviorSubject<boolean>(false);
  private details = new BehaviorSubject<boolean>(false);
  private response = new BehaviorSubject<any>(null);


  setValuei(value)
  {
    this.invalid.next(value);
  }

  getValuei(){
    return this.invalid.asObservable();
  }

  setValuee(value)
  {
    this.error.next(value);
  }

  getValuee(){
    return this.error.asObservable();
  }

  setValuec(value)
  {
    this.change.next(value);
  }

  getValuec(){
    return this.change.asObservable();
  }

  setValuel(value)
  {
    this.logout.next(value);
  }

  getValuel(){
    return this.logout.asObservable();
  }

  login(data) {
    let header_node = {
      headers: new HttpHeaders(
        { 'rejectUnauthorized': 'false' })
    };
    console.log(data);
    this.httpClient.post<any>(this.url, data, header_node).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.setValuec(true)},
        (err) => {
          console.log(err);
          if (err.status == 0 || err.status == 500) { this.setValuee(true); }
          else if (err.status == 401) { this.setValuei(true) }
        }
      );
  }
}
