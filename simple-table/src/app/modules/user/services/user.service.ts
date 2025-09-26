import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { BehaviorSubject, catchError, from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  getUsers(): Observable<User[]> {
    return from(
      fetch(this.apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((users: User[]) => {
          this.usersSubject.next(users);
          return users;
        })
    ).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => error);
      })
    );
  }
}
