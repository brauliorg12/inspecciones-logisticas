import { Injectable, RendererFactory2, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Storage } from '@capacitor/storage';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private statusBar: StatusBar,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    // APP
    if (this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        this.statusBar.overlaysWebView(false);
      });
    }
  }

  async enableDark() {
    this.renderer.addClass(this.document.body, 'dark');
    await Storage.set({
      key: 'dark',
      value: 'true',
    });
    // APP
    if (this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        this.statusBar.backgroundColorByHexString('#222428');
      });
    }
  }

  async enableLight() {
    this.renderer.removeClass(this.document.body, 'dark');
    await Storage.set({
      key: 'dark',
      value: 'false',
    });
    // APP
    if (this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        this.statusBar.backgroundColorByHexString('#333333');
      });
    }
  }
}
