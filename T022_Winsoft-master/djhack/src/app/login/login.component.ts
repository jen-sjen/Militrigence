import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: boolean = false;
  milid: boolean = false;
  password: boolean = false;
  errormessage: string;

  constructor(private auth: AuthService, private router: Router) { }

  form = new FormGroup({
    userid: new FormControl(''),
    password: new FormControl('')
   })

   invalid: boolean;
  ngOnInit(): void {
    localStorage.setItem('token', null);
    this.auth.setValuei(false);
    this.auth.getValuei().subscribe(res => { this.invalid = res;});
    this.auth.setValuel(true);
  }

  validate(){
    var flag = true;

    if (this.form.get("userid").value == "" || !(/^[A-Za-z]+$/.test(this.form.get("userid").value)))                                  
    { 
        this.milid = true;
        flag = false; 
    }

    if (flag == true) {
      this.submit();
     }
  }

  submit(){
    let data = this.form.value;
    this.form.get('userid').setValue('');
    this.form.get('password').setValue('');
    this.auth.login(data);
    this.auth.getValuec().subscribe(res => { if (res == true) { this.router.navigate(['/decrypt']); } });
  }

}
