import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';

// CONSTANTS
import { iconsConfig } from './constants';
// MODELS
import { ActionBtnTemplateOptions, ActionBtnTypeEnum } from './models';
import { ButtonStyles } from '../../../button/button.component';
import { IconRegistryService } from '../../../../../services/icon-registry/icon-registry.service';

@Component({
  selector: 'app-formly-action-button',
  templateUrl: './formly-action-button.component.html',
  styleUrls: ['./formly-action-button.component.scss'],
})
export class FormlyActionButtonComponent
  extends FieldType
  implements OnInit, OnDestroy
{
  to: ActionBtnTemplateOptions;
  parentGroup: FormlyFieldConfig;

  public buttonClasses = ButtonStyles;
  public buttonTypes = ActionBtnTypeEnum;
  public iconName: string;
  public isValid: boolean = false;
  public classes: string;

  private sub: Subscription;

  constructor(private registryHelper: IconRegistryService) {
    super();
  }

  ngOnInit(): void {
    if (this.isIconType()) {
      this.initButtonIcon();
    }
    this.initClasses();
    this.initGroup();
    this.initValiditySub();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onClick(): void {
    if (this.to.actionFn) {
      this.to.actionFn(this.parentGroup?.model || this.to.model);
    }
  }

  private initButtonIcon() {
    const namespace = 'actionBtn';
    const url = iconsConfig[this.to.btnType];
    this.iconName = `${namespace}-${this.to.btnType}`;
    this.registryHelper.registerSvg(this.iconName, url);
  }

  private initClasses(): void {
    const classes = this.to.classes ? this.to.classes : [ButtonStyles.primary];
    this.classes = classes.join(' ');
  }

  private initGroup(): void {
    if (!this.to.parentGroup) {
      return;
    }

    this.parentGroup =
      typeof this.to.parentGroup === 'string'
        ? eval(`this.${this.to.parentGroup}`)
        : this.to.parentGroup(this.field);
  }

  private initValiditySub(): void {
    const formToCheck = this.parentGroup?.formControl || this.formControl;
    this.isValid = formToCheck.valid;
    this.sub = formToCheck.statusChanges.subscribe(() => {
      this.isValid = formToCheck.valid;
    });
  }

  private isIconType(): boolean {
    return this.to.btnType !== ActionBtnTypeEnum.DEFAULT;
  }
}
