import { FormControl } from '@angular/forms'

export interface LoginForm {
  firstName: FormControl<string | null | undefined>
  lastName: FormControl<string | null | undefined>
  email: FormControl<string | null | undefined>;
  password: FormControl<string | null | undefined>;
  repeatPassword: FormControl<string | null | undefined>;
}
