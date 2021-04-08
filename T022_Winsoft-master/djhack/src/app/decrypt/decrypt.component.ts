import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.scss']
})
export class DecryptComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router, private auth: AuthService, private app: AppComponent) { }


  decoded: '';
  infiltrated: '';


  url = 'http://localhost:5001/message';

  decstring = {
    'message': 'Cnwvtus KuaiTaa rlodeeurethn  an Ia_mrhs baer oag ndC_a aeoat dLj lLdio_me  p  hagZLngan _',
    'key': 'delhi'
  };


  form = new FormGroup({
    message: new FormControl(''),
    key: new FormControl('')
  });

  ngOnInit(): void {
    if(localStorage.getItem('token') != "null")
    {
      let header_node = {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        };
      this.httpClient.get<any>("http://localhost:5001/authenticate/validate", header_node).subscribe(
        (res) => {console.log(res);},
        (err) => {
  
                    console.log(err); 
                    if(err.status == 401)
                     {this.router.navigate(['/login'])}
                }
      );
    }

    else{
      this.router.navigate(['/login'])
    }
  }


  decryptstring(decstring) {
    let header_node = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    };
    // let input = new FormData();
    // input.append("file", file);
    // input.append("docType", data);
    this.httpClient.post<any>(this.url, decstring, header_node).subscribe(
      (res) => { console.log(res); this.decoded = res.message; this.infiltrated = res.infiltrated; this.app.messageapp = res.message; this.app.placesapp = res.infiltrated; this.router.navigate(['/userinput']); },
      (err) => {

                  console.log(err); 
                  // if(err.status == 0 || err.status == 500)
                  // {this.setValuee(true)}
                  if(err.status == 401)
                   {this.router.navigate(['/login'])}
              }
    );
  }

  submit() {
    this.decryptstring(this.form.value);
  }
}
