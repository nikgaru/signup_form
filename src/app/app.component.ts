import { Component } from '@angular/core'
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'

import { LoginForm } from './interfaces/loginForm.interface'
import { emailValidator } from './validators/email.validator'
import { matchControlsValidator } from './validators/match-controls.validator'
import {
  atLeastOneLowercaseValidator,
  atLeastOneUppercaseValidator,
  noNameInPasswordValidator,
} from './validators/password.validator'
import { UserService } from './services/user.service'
import { first } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) {
  }

  title = 'signup_form'
  form = new FormGroup<LoginForm>({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, emailValidator]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      atLeastOneUppercaseValidator,
      atLeastOneLowercaseValidator,
    ]),
    repeatPassword: new FormControl('', [Validators.required]),
  }, {
    validators: [
      matchControlsValidator('password', 'repeatPassword'),
      noNameInPasswordValidator('firstName', 'lastName', 'password'),
    ],
  })

  onSubmit() {
    console.log(this.form.value)

    if (this.form.invalid) {
      return
    }

    const obj = { ...this.form.value }
    delete obj.repeatPassword

    this.userService.register(obj)
      .pipe(first())
      .subscribe({
        next: () => {
          this._snackBar.open('User created successfully', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
          })
        },
        error: () => {
          this._snackBar.open('Unexpected error happened', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
          })
        },
      })
  }
}
