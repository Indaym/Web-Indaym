import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

import { AuthService } from '../../services';

@Component({
  selector: 'ia-login',
  providers: [ AuthService ],
  template: `
  <div *ngIf="!hasError">
    <form #loginForm="ngForm" (ngSubmit)="login()" >
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
        <label for="Passwod" >Password</label>
        <input type="password" id="Passwod" required [(ngModel)]="password" name="Passwod" #Passwod="ngModel" >
      </div>
      <div [hidden]="Passwod.valid || Passwod.pristine" >Password is required</div>

      <button type="submit" [disabled]="!loginForm.form.valid">Submit</button>
    </form>
  </div>
  <div *ngIf="hasError" >
    {{error}}
  </div>
  `,
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  hasError = false;
  username: string;
  password: string;
  email: string;
  error = '';

  ngOnInit() {
    this.auth.logout();
  }

  login() {
    this.hasError = true;
    this.auth.login(this.username, this.password, this.email,
      (res) => this.error = res.statusText,
      (res) => {
        const data = JSON.parse(res);
        localStorage.setItem('jwt', data.token);
        this.router.navigate['/home'];
    });
  }
}
