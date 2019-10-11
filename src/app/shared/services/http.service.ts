import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConstants } from '../constants/app.constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  CONTEXT_PATH: string = AppConstants.API_CONTEXT_PATH;

  constructor(private _http: HttpClient, private _router: Router) {

      if(environment.production){
        this.CONTEXT_PATH = "";
      }
  }

  get(url: string): Observable<any> {
    return this._http.get(this.CONTEXT_PATH + url, { headers: this.getHeaders() })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  getOne(url: string, id: number): Observable<any> {
    return this._http.get(`${this.CONTEXT_PATH + url}/${id}`, { headers: this.getHeaders() })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  getWithBody(url: string, data: any): Observable<any> {
    return this._http.request('get', this.CONTEXT_PATH + url, { body: data, headers: this.getHeaders() })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  post(url: string, data: any): Observable<any> {
    //   console.log(this.CONTEXT_PATH + url)
    return this._http.post(this.CONTEXT_PATH + url, data, { headers: this.getHeaders() })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  postWithReponse(url: string, data: any, responseType:any): Observable<any> {
    return this._http.post(this.CONTEXT_PATH + url, data, { headers: this.getHeaders(), responseType: responseType })
      .pipe(map(this.handleTextResponse), catchError(this.handleError));
  }

  // To upload files
  postFormData(url: string, formData) {
    return this._http.post(this.CONTEXT_PATH + url, formData, { headers: this.getHeadersForFormData() })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  put(url: string, data: any): Observable<any> {
    return this._http.put(this.CONTEXT_PATH + url, data, { headers: this.getHeaders() })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  delete(url: string, id: number): Observable<any> {
    return this._http.delete(`${this.CONTEXT_PATH + url}/${id}`, { headers: this.getHeaders() })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  deleteWithBody(url: string, request): Observable<any> {
    return this._http.request('delete', this.CONTEXT_PATH + url, { body: request, headers: this.getHeaders() })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  private handleTextResponse(res: any) {
    return res;
  }

  private handleResponse(res: Response) {
    return res;
  }

  private handleError = (error: any) => {
    if (error.status === 401) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('disclaimer'); // remove disclaimer for log out to GP user
      localStorage.removeItem('patientDisclaimer'); // remove patient disclaimer for log out to GP user
      this._router.navigateByUrl('/login');
      return;
    }
    return of(error);
  }


  private getHeaders(): any {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return httpHeaders;
  }

  private getHeadersForFormData(): any {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Accept', 'application/json');
    httpHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    return httpHeaders;
  }

}
