import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

import { AuthService } from '../../../services';

@Component({
  selector: 'ia-register',
  providers: [ AuthService ],
  template: `
  <div>
    <form #loginForm="ngForm" (ngSubmit)="register()" >
      <div>
        <label for="name" >Username</label>
        <input type="text" id="name" required [(ngModel)]="username" name="name" #name="ngModel" >
      </div>
      <div [hidden]="name.valid || name.pristine" >Username is required</div>

      <div>
        <label for="Email" >email</label>
        <input type="email" id="Email" required [(ngModel)]="email" name="Email" #Email="ngModel" >
      </div>
      <div [hidden]="Email.valid || Email.pristine" >Email is required</div>

      <div>
          <label for="Password" >Password</label>
          <input type="password" id="Password" required [(ngModel)]="password" name="Password" #Password="ngModel" >
      </div>
      <div [hidden]="Password.valid || Password.pristine" >Password is required</div>

      <div>
          <label for="Password_confirmation" >Password</label>
          <input type="password" id="Password_confirmation" required [(ngModel)]="confirmation_password" name="Password_confirmation" #Password_confirmation="ngModel" >
      </div>
      <div *ngIf="!pwdIsOk" >Passwords must be the same</div>

      <button type="submit" [disabled]="!loginForm.form.valid">Submit</button>
    </form>
  </div>
  <div *ngIf="hasError" >
    {{error}}
  </div>
  `,
  styleUrls: [],
})
export class RegisterComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  hasError = false;
  pwdIsOk = true;
  error = '';
  username: string;
  password: string;
  confirmation_password: string;
  email: string;

  ngOnInit() {
    this.auth.logout();
  }

  register() {
    this.hasError = false;
    if (this.password !== this.confirmation_password) {
      this.pwdIsOk = false;
      return;
    }
    this.auth.register(this.username, this.password, this.email,
      (res) => {  // nok
        const body = JSON.parse(res._body);
        this.error = body.code;
        this.hasError = true;
      },
      (res) => {  // ok
        console.log(res);
        this.router.navigate['/login'];
      });
  }
}
