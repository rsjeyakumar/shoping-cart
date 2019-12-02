import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  toggleLoginReg = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginvalidation = false;
  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      emailid: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  toggleForm() {
    this.toggleLoginReg = !this.toggleLoginReg;
  }

  loginSubmit() {
    const queryparams = '?username=' + this.loginForm.value.username + '&password=' + this.loginForm.value.password;
    const apiEndpointUrl = this.http.apiUrl + this.http.userDetails + queryparams;
    console.log(this.loginForm);
    this.http.readData(apiEndpointUrl).subscribe(
      (res: object[]) => {
        if (res.length === 1) {
          sessionStorage.clear();
          this.loginvalidation = false;
          sessionStorage.setItem('user', JSON.stringify(res[0]));
          this.router.navigate(['/home']);
        } else {
          sessionStorage.clear();
          this.loginvalidation = true;
        }
      }
    );
  }

  registerFormSubmit() {
    const apiEndpointUrl = this.http.apiUrl + this.http.userDetails;
    this.http.createData(apiEndpointUrl, this.registerForm.value).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }


}
