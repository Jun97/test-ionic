import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token: string;

  constructor(public http: HttpClient,
              public alertController: AlertController) {}


    // Handle API errors
    handleError = ( async (error: HttpErrorResponse) => {
      console.log(error);
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error);

        const alert = await this.alertController.create({
          header: 'An Error Occured',
          message: `${error} .Please try again later. `,
          buttons: ['OK']
        });
        await alert.present();
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error.message}`);

        const alert = await this.alertController.create({
            header: 'An Error Occured',
            message: `${error} .Please try again later. `,
            buttons: ['OK']
          });
        await alert.present();
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    });

    getPostsByPage(url: string): Observable<{}> {
      return this.http
        .get(url , {observe: 'response'})
        .pipe(
          retry(2),
          catchError(this.handleError)
        );
    }

    getPostsByID(url: string): Observable<{}> {
      return this.http
        .get(url)
        .pipe(
          retry(2),
          catchError(this.handleError)
        );
    }

    createPost(url: string, data: object): Observable<{}> {
      console.log(data);
      console.log('Hi,this is create post headers:');
      return this.http
        .post(url, data)
        .pipe(
          retry(2),
          catchError(this.handleError)
        );
    }

    getEmbedAvatar(href: string): Observable<{}> {
      console.log(href);
      return this.http
        .get(href)
        .pipe(
          retry(2),
          catchError(this.handleError)
        );
    }
}
