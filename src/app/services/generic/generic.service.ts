import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { BufferService } from '@services/buffer/buffer.service';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor(private bufferService: BufferService, private http: HttpClient) {}

  /**
   * Realiza un pedido `GET`a backend y devuelve el cuerpo de la respuesta casteado al tipo dado por `T`, o a `unknown` si `T` no es especificado
   *
   * @return Un `Observable` de tipo `T` o `unknown`
   */
  // deberiamos ver las versiones en la ruta
  get<T>(
    ruta: string,
    queryId?: number,
    basepath: string = environment.basepath
  ): Observable<T> {
    const url = !queryId
      ? basepath + '/' + ruta
      : basepath + '/' + ruta + '/' + queryId;
    return this.http.get<T>(url);
  }

  /**
   * Realiza un pedido `GET`a backend y devuelve el cuerpo de la respuesta casteado a un arreglo del tipo dado por `T`, o a `unknown[]` si `T` no es especificado
   *
   * @return Un `Observable` de tipo `T[]` o `unknown[]`
   */
  getAll<T>(
    ruta: string,
    body,
    forceRefresh = false,
    basepath: string = environment.basepath
  ): Observable<T[]> {
    let obs: Observable<T[]>;
    if (
      !forceRefresh &&
      this.bufferService.isBufferedPath(ruta) &&
      this.bufferService.hasEntry(ruta)
    ) {
      obs = of(this.bufferService.getEntry<T[]>(ruta)).pipe(take(1));
    } else {
      obs = this.http.get<T[]>(basepath + '/' + ruta, body).pipe(
        switchMap((res: unknown) => of<T[]>(res as T[])),
        tap((res) => {
          if (this.bufferService.isBufferedPath(ruta)) {
            this.bufferService.setEntry<T[]>(ruta, res);
          }
        })
      );
    }
    return obs;
  }

  /**
   * Realiza un pedido `POST`a backend y devuelve el cuerpo de la respuesta casteado al tipo dado por `T`, o a `unknown` si `T` no es especificado
   *
   * @return Un `Observable` de tipo `T` o `unknown`
   */
  post<T>(
    ruta: string,
    body,
    basepath: string = environment.basepath
  ): Observable<T> {
    return this.http.post<T>(basepath + '/' + ruta, body);
  }

  /**
   * Realiza un pedido `PUT`a backend y devuelve el cuerpo de la respuesta casteado al tipo dado por `T`, o a `unknown` si `T` no es especificado
   *
   * @return Un `Observable` de tipo `T` o `unknown`
   */
  put<T>(
    ruta: string,
    body,
    basepath: string = environment.basepath
  ): Observable<T> {
    return this.http.put<T>(basepath + '/' + ruta, body);
  }

  /**
   * Realiza un pedido `DELETE`a backend y devuelve el cuerpo de la respuesta casteado al tipo dado por `T`, o a `null` si `T` no es especificado
   *
   * @return Un `Observable` de tipo `T` o `null`
   */
  delete<T = null>(
    ruta: string,
    queryId: number,
    basepath: string = environment.basepath
  ): Observable<T> {
    return this.http.delete<T>(basepath + '/' + ruta + '/' + queryId);
  }

  getPdf(
    ruta: string,
    basepath: string = environment.basepath
  ): Observable<any> {
    return this.http.get(basepath + '/' + ruta, { responseType: 'blob' });
  }

  postPdf(ruta: string, body): Observable<any> {
    // {observe: 'response', responseType: 'blob'}
    return this.http.post(ruta, body, { responseType: 'blob' });
  }

  postFile(ruta: string, file, params): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(environment.basepath + '/' + ruta, formData, params);
  }
  postFiles(ruta: string, file, params): Observable<any> {
    let formData: FormData = new FormData();
    file.forEach((element) => {
      formData.append('file', element, element.name);
    });
    return this.http.post(environment.basepath + '/' + ruta, formData, params);
  }
}
