import { Injectable, ViewChildren, QueryList } from '@angular/core';
import {
  IonRouterOutlet,
  ActionSheetController,
  PopoverController,
  ModalController,
  ToastController,
  AlertController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AutocloseOverlaysService {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private alertController: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}
  async trigger() {
    // Hide overlays
    const element =
      (await this.alertController.getTop()) ||
      (await this.actionSheetCtrl.getTop()) ||
      (await this.popoverCtrl.getTop()) ||
      (await this.modalCtrl.getTop()) ||
      (await this.toastController.getTop());
    if (element) {
      element.dismiss();
      return false; // Prevent navigation
    } else {
      return true;
    }
  }
}
