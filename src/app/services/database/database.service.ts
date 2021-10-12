import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL = environment.basepath;

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private http: HttpClient // private usuarioService: UsuarioService
  ) {}

  createMoto(item: any, photo: File) {
    // const headers = new HttpHeaders({
    //   'x-token': this.usuarioService.token
    // });

    // item.image = photo;
    return new Promise((resolve) => {
      const fd = new FormData();

      // Guardar rubro como array en formdata
      const arr = item.resultados.datosTabla;
      let arrData = [];
      console.log(item);
      for (let i = 0; i < arr.length; i++) {
        arrData.push(arr[i]);
      }
      fd.append('datosTabla', JSON.stringify(arrData));

      fd.append('anio', item.anio);
      fd.append('nroMovil', item.nroMovil);
      fd.append('avlId', item.avlId);
      fd.append('comizariaId', item.comizariaId);
      fd.append('dependencia', item.dependencia);
      fd.append('dominio', item.dominio);

      fd.append('estadoGeneralId', item.estadoGeneralId);
      fd.append('km', item.km);
      fd.append('marca', item.marca);
      fd.append('ministerioId', item.ministerioId);
      fd.append('modelo', item.modelo);
      fd.append('observacionesGlobal', item.observacionesGlobal);
      fd.append('partidoId', item.partidoId);
      fd.append('tipoId', item.tipoId);

      fd.append('image', photo);

      // console.log(JSON.parse(fd.get('datosTabla') as string));

      this.http.post(`${URL}/inspecciones-moto`, fd, {}).subscribe((resp) => {
        // this.nuevoSale.emit(resp['commerce']);
        // resolve(true); Como estaba antes
        resolve(resp); // lo cambie para obtener el ID
      });
    });
  }

  getFormsMotos() {
    // const headers = new HttpHeaders({
    //   'x-token': this.usuarioService.token
    // });

    return this.http.get<any>(`${URL}/inspecciones-moto/list/`, {});
  }
}
