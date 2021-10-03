import { Injectable } from '@angular/core';

// CONSTANTS
import { fontIconMap, svgIconMap } from './icon-map.constants';
// MODELS
import { ActionImageMap } from './action-image-map';
// SERVICES
import { IconRegistryService } from '../icon-registry/icon-registry.service';

@Injectable({
  providedIn: 'root'
})
export class IconLoaderService {

  constructor(private registryHelper: IconRegistryService) { }

  public getIconAlias(name: string): string {
    return this.isSvgIcon(name) ? name : this.getFontIconAlias(name);
  }

  public getIconSvgName(iconName: string): string {
    return svgIconMap[iconName];
  }

  public isSvgIcon(name: string): boolean {
    return !!svgIconMap[name];
  }

  public loadSvgIcons(): void {
    const configs = this.getSvgIconConfigs(svgIconMap);
    configs.forEach(({name: iconName, url}) => this.registryHelper.registerSvg(iconName, url));
  }

  private getFontIconAlias(name: string): string {
    return fontIconMap[name];
  }

  private getSvgIconConfigs(map: ActionImageMap): IconConfig[] {
    return Object.entries(map)
      .map(([iconName, fileName]) => ({
        name: iconName,
        url: this.parseFileUrl(fileName)
      }));
  }

  private parseFileUrl(name: string): string {
    return `assets/images/buttons/Boton-${name}.svg`;
  }
}

interface IconConfig {name: string, url: string}
