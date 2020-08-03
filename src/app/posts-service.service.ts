import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, shareReplay } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})

export class PostsServiceService {

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<Post[]> {

    const url = 'https://jsonplaceholder.typicode.com/posts';

    return this.http.get<Post[]>(url)
      .pipe(
        retry(3),
        catchError(this.handleError),
        shareReplay(),
        tap(posts => console.log(posts))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
