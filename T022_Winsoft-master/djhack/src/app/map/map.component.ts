import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // place1: boolean = false;
  // place2: boolean = false;
  // place3: boolean = false;
  // place4: boolean = false;
  // place5: boolean = false;
  // place6: boolean = false;
  // place7: boolean = false;
  // place8: boolean = false;
  // place9: boolean = false;
  // place10: boolean = false;
  // place11: boolean = false;

  iplace1: boolean = false;
  iplace2: boolean = false;
  iplace3: boolean = false;
  iplace4: boolean = false;
  iplace5: boolean = false;
  iplace6: boolean = false;
  iplace7: boolean = false;
  iplace8: boolean = false;
  iplace9: boolean = false;
  iplace10: boolean = false;
  iplace11: boolean = false;

  dplace1: boolean = false;
  dplace2: boolean = false;
  dplace3: boolean = false;
  dplace4: boolean = false;
  dplace5: boolean = false;
  dplace6: boolean = false;
  dplace7: boolean = false;
  dplace8: boolean = false;
  dplace9: boolean = false;
  dplace10: boolean = false;
  dplace11: boolean = false;


  constructor(private httpClient: HttpClient, private auth: AuthService, private app: AppComponent) { }

  ngOnInit(): void {
    // this.iplace7 = true;
    // this.iplace4 = true;
    // this.dplace1 = true
    this.auth.setValuel(false);
    //this.getnode({"target": ["A", "B", "C"]});
    this.getnode(this.app.targetapp);
    
  }

  url = "http://localhost:5001/location";

  getnode(infiltrated){
    let header_node = {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
      };
      // let input = new FormData();
      // input.append("file", file);
      // input.append("docType", data);
    this.httpClient.post<any>(this.url, infiltrated, header_node).subscribe(
      (res) => {console.log(res.them);
                if(res.us == "A") this.dplace4 = true;
                else if(res.us == "B") this.dplace1 = true;
                else if(res.us == "C") this.dplace5 = true;
                else if(res.us == "D") this.dplace9 = true;
                else if(res.us == "E") this.dplace2 = true;
                else if(res.us == "F") this.dplace6 = true;
                else if(res.us == "G") this.dplace10 = true;
                else if(res.us == "H") this.dplace7 = true;
                else if(res.us == "I") this.dplace3 = true;
                else if(res.us == "J") this.dplace11 = true;
                else if(res.us == "K") this.dplace8 = true;
          
                if(res.them.includes("A")) this.iplace4 = true;
                if(res.them.includes("B")) this.iplace1 = true;
                if(res.them.includes("C")) this.iplace5 = true;
                if(res.them.includes("D")) this.iplace9 = true;
                if(res.them.includes("E")) this.iplace2 = true;
                if(res.them.includes("F")) this.iplace6 = true;
                if(res.them.includes("G")) this.iplace10 = true;
                if(res.them.includes("H")) this.iplace7 = true;
                if(res.them.includes("I")) this.iplace3 = true;
                if(res.them.includes("J")) this.iplace11 = true;
                if(res.them.includes("K")) this.iplace8 = true;
              },
      (err) => {
                  console.log(err); 
                  // if(err.status == 0 || err.status == 500)
                  // {this.setValuee(true)}
                  // else if(err.status == 401)
                  // {this.setValueu(true)}
              }
    );
  }

}
