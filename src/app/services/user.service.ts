import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { UserInterface } from '../interfaces/user.interface'

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient
  ) {
  }
  register(user: UserInterface) {
    return this.http.post(`${environment.baseApi}/users`, user);
  }
}
