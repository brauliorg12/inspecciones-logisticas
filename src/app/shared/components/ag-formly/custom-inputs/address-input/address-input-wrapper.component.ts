import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-address-wrapper',
  template: ` <ng-container #fieldComponent></ng-container> `,
})
export class AddressWrapperComponent extends FieldWrapper implements OnInit {
  private baseUrl = 'https://apis.datos.gob.ar/georef/api/';
  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    if (this.to.disabled) {
      this.formControl.disable();
      return;
    }

    this.formState.addressWrapper = {
      dataOptionsDropdown: {
        provincias: {
          url: `${this.baseUrl}provincias?`,
          options: [],
        },
        localidades: {
          options: [],
        },
      },
    };

    this.formState.addressWrapper.dataDireccionDropdown = (value) =>
      this.getDireccionOptions(value);
    this.formState.addressWrapper.getLocalidadesOptions = (model) =>
      this.getLocalidadesOptions(model);
    this.setDataOptionsDropdown();
  }

  showProvincia(): boolean {
    return (
      this.field.templateOptions.addressWrapperAttributes.hideInput.indexOf(
        'provincia'
      ) > -1
    );
  }

  getDireccionOptions(direccion): Observable<any> {
    const model = this.model;
    const provincia = model.valueProvincia?.nombre;
    const localidad = model.valueLocalidad?.nombre;

    const parameters = [];
    if (provincia) parameters.push(`provincia=${provincia}`);
    if (localidad) parameters.push(`localidad=${localidad}`);

    const endpoint = `direcciones?direccion=${direccion}&${parameters.join(
      '&'
    )}`;

    const url = this.baseUrl + endpoint;
    return this.httpClient
      .get(url, {})
      .pipe(map((res: any) => res.direcciones));
  }

  getLocalidadesOptions(model): void {
    const parameters = [];
    const provincia = model.valueProvincia?.nombre;
    if (provincia) parameters.push(`provincia=${provincia}`);
    const endpoint = `localidades?${parameters.join('&')}`;
    const url = this.baseUrl + endpoint;
    this.httpClient
      .get(url, {})
      .subscribe(
        (res) =>
          (this.formState.addressWrapper.dataOptionsDropdown.localidades.options =
            res)
      );
  }

  setDataOptionsDropdown(): void {
    if (this.formState && this.formState.addressWrapper.dataOptionsDropdown) {
      const dataOptionsDropdown =
        this.formState.addressWrapper.dataOptionsDropdown;
      const urlKeys = Object.keys(dataOptionsDropdown);
      urlKeys.forEach((key) => {
        if (dataOptionsDropdown[key].url)
          this.httpClient
            .get<any[]>(dataOptionsDropdown[key].url, {})
            .subscribe((res) => (dataOptionsDropdown[key].options = res));
      });
    }
  }
}
