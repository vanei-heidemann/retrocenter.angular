import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Datafile } from './datafile';
import { CollectionResult } from './collection.result';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DatafileService {
  private datafileUrl = 'http://localhost:8080/retrocenter/api/datafiles/';

  datafiles: Observable<CollectionResult>;
  page: number = 0;
  PAGE_SIZE: number = 15;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  public getDatafiles(): Observable<CollectionResult> {
    let url = this.datafileUrl + '?pageSize=' + this.PAGE_SIZE;
    if (this.page > 0) {
      url = url + "&page=" + this.page;
    }
    return this.http.get<CollectionResult>(url, httpOptions)
      .pipe(
      tap(datafiles => this.log(`fetched datafile`)),
      catchError(this.handleError<CollectionResult>('getDatafiles'))
      );
  }

  public getNextPage(): Observable<CollectionResult> {
    this.page++;
    return this.getDatafiles();
  }

  public getPrevPage(): Observable<CollectionResult> {
    if (this.page > 0) {
      this.page--;
    }
    return this.getDatafiles();
  }

  public getPageNumber(): number {
    return this.page;
  }

  public getDatafile(id: number): Observable<Datafile> {
    const url = `${this.datafileUrl}/${id}`;
    return this.http.get<Datafile>(url).pipe(
      tap(_ => this.log(`fetched datafile id=${id}`)),
      catchError(this.handleError<Datafile>(`getDatafile id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('DatafileService: ' + message);
  }
}
