import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  map: string[] = [];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  public registerSvg(iconName: string, url: string): void {
    if (!this.isRegistered(iconName)) {
      this.iconRegistry.addSvgIcon(
        iconName,
        this.sanitizer.bypassSecurityTrustResourceUrl(url)
      );
      this.map.push(iconName);
    }
  }

  isRegistered(key: string): boolean {
    return this.map.indexOf(key) !== -1;
  }
}
