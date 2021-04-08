import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-userinput',
  templateUrl: './userinput.component.html',
  styleUrls: ['./userinput.component.scss']
})
export class UserinputComponent implements OnInit {

  constructor(public app: AppComponent, private httpClient: HttpClient, private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.names = this.app.placesapp;
 }

  url = "http://localhost:5001/location"

  //form: FormGroup;
  public names: any[];

  form = this.formBuilder.group({
    place1: new FormControl(false),
    place2: new FormControl(false),
    place3: new FormControl(false),
    place4: new FormControl(false),
    place5: new FormControl(false),
    place6: new FormControl(false),
    place7: new FormControl(false),
    place8: new FormControl(false),
    place9: new FormControl(false),
    place10: new FormControl(false),
    place11: new FormControl(false),
});

  // formGroup = new FormGroup();
  form2 = new FormGroup({
    message: new FormControl(''),
    key: new FormControl('')
  });

  baseList: any = [
    { id: "A", name: 'Khardung La' },
    { id: "B", name: 'Lach' },
    { id: "C", name: 'Sasser Pass' },
    { id: "D", name: 'Gyon' },
    { id: "E", name: 'Sia' },
    { id: "F", name: 'Zoji La' },
    { id: "G", name: 'Indira Col' },
    { id: "H", name: 'Rezang La' },
    { id: "I", name: 'Tanglung La' },
    { id: "J", name: 'Pensi La' },
    { id: "K", name: 'Mersmil La' }

  ];

  ngOnInit(): void {

    if(localStorage.getItem('token') != "null")
    {
      let header_node = {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
        };
      this.httpClient.get<any>("http://localhost:5001/authenticate/validate", header_node).subscribe(
        (res) => {console.log(res); this.auth.setValuel(false); console.log("hiii")},
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
    //this.continue();
  }

  continue(){
    let places = {"target": []}
    if(this.form.get("place1").value == true){
      places["target"].push("A");
    }
    if(this.form.get("place2").value == true){
      places["target"].push("B");
    }
    if(this.form.get("place3").value == true){
      places["target"].push("C");
    }
    if(this.form.get("place4").value == true){
      places["target"].push("D");
    }
    if(this.form.get("place5").value == true){
      places["target"].push("E");
    }
    if(this.form.get("place6").value == true){
      places["target"].push("F");
    }
    if(this.form.get("place7").value == true){
      places["target"].push("G");
    }
    if(this.form.get("place8").value == true){
      places["target"].push("H");
    }
    if(this.form.get("place9").value == true){
      places["target"].push("I");
    }
    if(this.form.get("place10").value == true){
      places["target"].push("J");
    }
    if(this.form.get("place11").value == true){
      places["target"].push("K");
    }
    this.app.targetapp = places;
    this.router.navigate(['/map']);

    // let header_node = {
    //   headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'))
    //   };
    // this.httpClient.post<any>(this.url, places, header_node).subscribe(
    //   (res) => {console.log(res); this.app.desiresapp = res.; this.app.targetapp = ; this.router.navigate(['/map']);},
    //   (err) => {

    //               console.log(err); 
    //               if(err.status == 401)
    //                {this.router.navigate(['/login'])}
    //           }
    // );
  }



  submit(): void {

  }

  onCheckboxChange(e) {
    //  const website: FormArray = this.form.get('website') as FormArray;

    // if (e.target.checked) {
    //   website.push(new FormControl(e.target.value));
    // } else {
    //    const index = website.controls.findIndex(x => x.value === e.target.value);
    //    website.removeAt(index);
    // }
  }

  log(x) {
    console.log('>>>>', x);
  }
}
