import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/user.model';


export type DataState<T> = {
  loading: boolean;
  data: T | null;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);
  private API_URL = 'https://jsonplaceholder.typicode.com/users';

  constructor() {}

  getUsers(): Observable<DataState<User[]>> {
    const initialState: DataState<User[]> = { loading: true, data: null, error: null }
    return this.http.get<User[]>(this.API_URL).pipe(
      map(users => ({ loading: false, data: users, error: null })),
      catchError(err => {
        console.error('API error:', err);
        return of({ loading: false, data: null, error: 'Failed to fetch user data. Please check the API URL or network connection.' });
      })
    );
  }
}
