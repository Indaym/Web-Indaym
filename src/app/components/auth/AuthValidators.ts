import { AbstractControl }  from '@angular/forms';

export class AuthValidator {

  checkPassword(control: AbstractControl): { [key: string]: any } {
    const p1 = control.get('password').value;
    const p2 = control.get('confirm_password').value;
    if (p1 === p2) return null;
    return { nomatch: true };
  }

}
