import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() classes = '';
  @Input() disabled?: boolean;
  @Input() typeButton: string = 'button';

  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor() {}

  @HostListener('click', ['$event'])
  click(event: MouseEvent): void {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}

export enum ButtonStyles {
  basic = 'basic',
  primary = 'primary',
  disabled = 'disabled',
  alert = 'alert',
  inlineForm = 'inline-form',
}
