import { tabsFormConfig } from './models/tabs-form-config.model';
import { Component, OnInit } from '@angular/core';
import { IAgFormlyConfig } from '@shared/components/ag-formly/models/ag-formly-config.model';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Filesystem, Directory } from '@capacitor/filesystem';
import {
  Camera,
  CameraDirection,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { finalize } from 'rxjs/operators';
import { DatabaseService } from '../../services/database/database.service';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-moto',
  templateUrl: './moto.component.html',
  styleUrls: ['./moto.component.scss'],
})
export class MotoFormlyComponent implements OnInit {
  tabsForms: IAgFormlyConfig = tabsFormConfig;

  image: LocalFile;
  file: File;

  constructor(
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private databaseService: DatabaseService
  ) {}

  async ngOnInit() {
    this.loadFiles();
  }

  submitFn(): void {
    this.tabsForms.fields[0].form.markAllAsTouched();

    if (!this.tabsForms.fields[0].form.valid || !this.file) {
      this.presentToast('Falta completar!');
    } else {
      console.log('Submit TabsForm >> ', this.tabsForms.fields[0]);
      this.createFormMoto();
    }
  }

  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: string[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;

      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });

      this.file = new File([readFile.data], 'imagen');
      console.log(this.file);

      console.log(f);

      this.image = {
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      };
    }
  }

  // Little helper
  async presentToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      // position: 'middle',
      // cssClass: text ? 'blue' : '',
      duration: 2000,
    });
    toast.present();
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    if (image) {
      this.saveImage(image);
    }
  }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      allowEditing: true,
      quality: 90,
    });

    if (capturedPhoto) {
      this.saveImage(capturedPhoto);
    }
  }

  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
    });

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
  }

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      this.file = new File([blob], 'imagen');
      console.log(this.file);

      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  // Convert the base64 to blob data
  // and create  formData with it
  async startUpload(file: LocalFile) {
    const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, file.name);
    this.uploadData(formData);
  }

  // Upload the formData to our API
  async uploadData(formData: FormData) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
    });
    await loading.present();

    // Use your own API!
    const url = 'http://localhost:8888/images/upload.php';

    this.http
      .post(url, formData)
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe((res) => {
        if (res['success']) {
          this.presentToast('File upload complete.');
        } else {
          this.presentToast('File upload failed.');
        }
      });
  }

  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });
    this.loadFiles();
    this.presentToast('Imágen eliminada');
  }

  async loadFiles() {
    this.image = null;

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    await loading.present();

    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    })
      .then(
        (result) => {
          this.loadFileData(result.files);
        },
        async (err) => {
          // Folder does not yet exists!
          await Filesystem.mkdir({
            path: IMAGE_DIR,
            directory: Directory.Data,
          });
        }
      )
      .then((_) => {
        loading.dismiss();
      });
  }

  // ! NEW Moto
  createFormMoto() {
    // this.presentLoading('Creando Comercio...');
    this.databaseService
      .createMoto(this.tabsForms.fields[0].parent.model, this.file)
      .then((res: any) => {
        console.log(res);
        if (res.ok) {
          this.deleteImage(this.image);
          this.image = null;
          this.file = null;
          this.presentToast('Archivo Guardado!');
          this.tabsForms.options.resetModel();
        }
        // if (res) {
        //   this.loading.dismiss();
        //   this.refreshEvent.Page();

        //   if (this.moderator === 'moderador' || this.moderator === 'admin' || this.moderator === 'codi') {
        //     this.router.navigateByUrl('/admin-commerces');

        //   }

        //   if (this.moderator === 'user') {
        //     this.router.navigateByUrl('/main/tabs/menu');

        //     this.uiService.paginaCreada('Comercio');
        //   }

        //   this.photoSelected = '';
        //   this.ResetForm();
        // }
      });

    return false;
  }
}
