import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { Observable, pipe } from 'rxjs';
import { GenericService } from '../../../services/generic/generic.service';
// MODELS
import {
  DataOptionDropdownMethods,
  IAgFormlyConfig,
  IDataOptionDropdown,
} from './models/ag-formly-config.model';


@Component({
  selector: 'app-ag-formly',
  templateUrl: './ag-formly.component.html',
  styleUrls: ['./ag-formly.component.scss'],
})
export class AgFormlyComponent implements OnInit, OnDestroy {
  @Input() formData: IAgFormlyConfig;
  @Input() showError: false;
  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() optionsOutput: EventEmitter<FormlyFormOptions> =
    new EventEmitter<FormlyFormOptions>();
  @ViewChild('formDirective') private formDirective: NgForm;

  submitButtonText: any;
  formClass: any;
  public form = new FormGroup({});
  public options: FormlyFormOptions = {};

  constructor(
    private httpClient: HttpClient,
    private genericService: GenericService
  ) {}

  ngOnDestroy(): void {
    if (this.formDirective.invalid) {
      this.form.markAsUntouched();
    }
  }

  ngOnInit(): void {
    this.formChange.emit(this.form);
    this.options.formState = this.formData.formState
      ? this.formData.formState
      : {};
    this.submitButtonText =
      this.formData && this.formData.submitButton
        ? this.formData.submitButton.text
        : null;
    this.formClass =
      this.formData &&
      this.formData.submitButton &&
      this.formData.submitButton.position
        ? this.formData.submitButton.position
        : 'bottom';
    this.setDataOptionsDropdown();

    // Se setea el options en IAgFormlyConfig, para poder utilizar las funciones en el componente padre
    this.formData.options = this.options;
    // Esta funcion su usa para recargar de forma dinamica las opciones de un dropdown, y no solo en el init del formly
    this.formData.options.formState.setDataOptionDropdown =
      this.setDataOptionDropdown.bind(this);
  }

  setDataOptionsDropdown(): void {
    if (this.options.formState && this.options.formState.dataOptionsDropdown) {
      const dataOptionsDropdown = this.options.formState.dataOptionsDropdown;
      const urlKeys = Object.keys(dataOptionsDropdown);
      urlKeys.forEach((key) => this.setDataOptionDropdown(key));
    }
  }

  setDataOptionDropdown(key: string): void {
    const dataOptionDropdown = this.options.formState?.dataOptionsDropdown[key];
    const pipes = this.setPipes(dataOptionDropdown);
    if (dataOptionDropdown?.url) {
      this.getMethod(dataOptionDropdown, pipes)
        .toPromise()
        .then((res) => (dataOptionDropdown.options = res));
    }
  }

  setPipes(dataOptionDropdown: IDataOptionDropdown): any {
    let pipes: any = [];
    if (dataOptionDropdown?.pipes) {
      pipes = [...dataOptionDropdown.pipes];
    }
    return pipes;
  }

  getMethod(
    dataOptionDropdown: IDataOptionDropdown,
    pipes: any[]
  ): Observable<any[]> | Observable<any> {
    const reqBody = dataOptionDropdown.requestBody
      ? dataOptionDropdown.requestBody
      : {};
    switch (dataOptionDropdown.method) {
      case DataOptionDropdownMethods.POST:
        return this.httpClient
          .post<any[]>(dataOptionDropdown.url, reqBody)
          .pipe(pipe.apply(this, pipes));
        break;
      default:
        return this.httpClient
          .get<any[]>(dataOptionDropdown.url, reqBody)
          .pipe(pipe.apply(this, pipes));
        break;
    }
  }

  onSubmit(model?): boolean {
    if (!this.formData.submit || !this.form.valid) {
      return false;
    }
    this.formData.submit(model, this.options);
  }
}
