import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Platform } from './platform';
import { CollectionResult } from './collection.result';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PlatformService {
  private platformsUrl = 'http://localhost:8080/retrocenter/api/platforms/';

  platforms: Observable<CollectionResult>;
  importHistories: Observable<CollectionResult>;

  page: number = 0;
  PAGE_SIZE: number = 15;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  public getPlatforms(): Observable<CollectionResult> {
    let url = this.platformsUrl + '?pageSize=' + this.PAGE_SIZE;
    if (this.page > 0) {
      url = url + "&page=" + this.page;
    }
    return this.http.get<CollectionResult>(url, httpOptions)
      .pipe(
      tap(platforms => this.log(`fetched platform`)),
      catchError(this.handleError<CollectionResult>('getPlatforms'))
      );
  }

  public getImportHistories(platformID: number): Observable<CollectionResult> {
    const url = `${this.platformsUrl}/${platformID}/import-history`;
    return this.http.get<CollectionResult>(url, httpOptions)
      .pipe(
      tap(importHistories => this.log(`fetched import histories`)),
      catchError(this.handleError<CollectionResult>('getImportHistories'))
      );
  }

  public getNextPage(): Observable<CollectionResult> {
    this.page++;
    return this.getPlatforms();
  }

  public getPrevPage(): Observable<CollectionResult> {
    if (this.page > 0) {
      this.page--;
    }
    return this.getPlatforms();
  }

  public getPageNumber(): number {
    return this.page;
  }

  public getPlatformNo404<Data>(id: number): Observable<Platform> {
    const url = `${this.platformsUrl}/?id=${id}`;
    return this.http.get<Platform[]>(url)
      .pipe(
      map(platforms => platforms[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} platform id=${id}`);
      }),
      catchError(this.handleError<Platform>(`getPlatform id=${id}`))
      );
  }

  public getPlatform(id: number): Observable<Platform> {
    const url = `${this.platformsUrl}/${id}`;
    return this.http.get<Platform>(url).pipe(
      tap(_ => this.log(`fetched platform id=${id}`)),
      catchError(this.handleError<Platform>(`getPlatform id=${id}`))
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
    this.messageService.add('PlatformService: ' + message);
  }
}
