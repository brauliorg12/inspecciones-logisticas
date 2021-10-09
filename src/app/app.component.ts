import { Component, ViewChild } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ThemeService } from './services/theme/theme.service';
import { AutocloseOverlaysService } from './services/autoCloseOverlay/auto-close-overlay.service';
import { Router } from '@angular/router';
import { IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

  // Dark Theme
  public themeSet = 'Cargando...';
  public darkmode = true;

  constructor(
    private platform: Platform,
    private theme: ThemeService,
    private autocloseOverlaysService: AutocloseOverlaysService,
    private router: Router
  ) {
    // Check Theme

    this.themeActual().then((resp) => {
      if (resp === 'true') {
        this.darkmode = true;
        this.themeSet = 'Oscuro';
        this.theme.enableDark();
      } else {
        this.darkmode = false;
        this.themeSet = 'Claro';
        this.theme.enableLight();
      }
    });

    this.inicializeApp();
  }

  inicializeApp(): void {
    if (this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        // Botón atrás nativo
        this.platform.backButton.subscribeWithPriority(999990, async () => {
          this.back();
        });
      });
    }
  }

  async themeActual() {
    const value = await Storage.get({ key: 'dark' });
    return value.value;
  }

  changeTheme() {
    if (!this.darkmode) {
      this.theme.enableDark();
      this.themeSet = 'Oscuro';
      this.darkmode = true;
    } else {
      this.theme.enableLight();
      this.themeSet = 'Claro';
      this.darkmode = false;
    }
  }

  // ! Volver || cerrar popups
  async back() {
    await this.autocloseOverlaysService
      .trigger()
      .then((resp) => {
        if (resp) {
          if (
            this.router.url === '/tabs/formulario/moto' ||
            this.router.url === '/tabs/demo/formly'
          ) {
            (navigator as any).app.exitApp();
          } else {
            this.routerOutlet.pop();
          }
        }
      })
      .catch((err) => {});
  }
}
