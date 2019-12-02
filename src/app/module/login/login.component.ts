import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../shared/services/http.service';
import { CommunicationService } from '../../shared/services/communication.service';

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
  loginSpin: boolean;
  registerSpin: boolean;
  constructor(private http: HttpService, private router: Router, private passdata: CommunicationService) { }

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
    const usesession = sessionStorage.getItem('user');
    if (usesession) {

      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['']);
    }

  }

  toggleForm() {
    this.toggleLoginReg = !this.toggleLoginReg;
  }

  loginSubmit() {
    const queryparams = '?username=' + this.loginForm.value.username + '&password=' + this.loginForm.value.password;
    const apiEndpointUrl = this.http.apiUrl + this.http.userDetails + queryparams;
    this.loginSpin = true;
    this.http.readData(apiEndpointUrl).subscribe(
      (res: object[]) => {
        this.loginSpin = false;
        if (res.length === 1) {
          const data = {
            userDetails: true
          };
          sessionStorage.clear();
          this.loginvalidation = false;
          sessionStorage.setItem('user', JSON.stringify(res[0]));
          this.passdata.sendMessage(data);
          this.router.navigate(['/home']);
        } else {
          sessionStorage.clear();
          this.loginvalidation = true;
        }
      }
    );
  }

  registerFormSubmit() {
    this.registerSpin = true;
    const apiEndpointUrl = this.http.apiUrl + this.http.userDetails;
    this.http.createData(apiEndpointUrl, this.registerForm.value).subscribe(
      (res) => {
        this.registerSpin = false;
        console.log(res);
      }
    );
  }


}
