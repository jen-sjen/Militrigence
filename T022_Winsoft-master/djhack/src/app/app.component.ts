import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'djhack';
  url = "http://localhost:5001/logout";
  messageapp = "";
  placesapp: string[] = [];
  targetapp = {};
  desiresapp = "";

  constructor(private auth: AuthService, private httpClient: HttpClient) { }

  logoutbut: boolean;
  ngOnInit(): void {
    
    this.auth.getValuel().subscribe(res => {this.logoutbut = res; console.log(res)});
  }

  logout(){
    let header_node = {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
      };
      // let input = new FormData();
      // input.append("file", file);
      // input.append("docType", data);
    this.httpClient.post<any>(this.url, header_node).subscribe(
      (res) => {console.log(res);
                this.logoutbut = true;
              },
      (err) => {
                  console.log(err); 
              }
    );
  }
}
