// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Storage } from '@ionic/storage-angular';
// import { environment } from '../../environments/environment';
// import { Usuario, RespuestaUser } from '../models/interfaces';
// import { NavController } from '@ionic/angular';
// import { StorageService } from './storage.service';

// const URL = environment.url;

// @Injectable({
//   providedIn: 'root'
// })
// export class UsuarioService {

//   paginaSales = 0;

//   token: string = '';
//   private usuario: Usuario = {};

//   constructor(
//     private http: HttpClient,
//     private storage: Storage,
//     private navCtrl: NavController,
//     private storageService: StorageService
//   ) { }


//   login(email: string, password: string) {

//     const data = { email, password };

//     return new Promise(resolve => {

//       this.http.post(`${URL}/user/login`, data)
//         .subscribe(async resp => {

//           if (await resp['ok']) {
//             await this.guardarToken(resp['token']);

//             const user = {
//               nombre: resp['nombre'],
//               email: resp['email'],
//               avatar: resp['avatar'],
//               fb: 'false',
//               provider: 'email'
//             };
//             await this.storage.set('usuariocache', user);

//             resolve(true);
//           } else {
//             this.token = '';
//             this.storage.remove('token');
//             resolve(false);
//           }

//         });

//     });

//   }

//   async LoginRedes(usuario: any) {

//     let provider = '';

//     if (await usuario.provider) {
//       provider = usuario.provider;
//     }

//     return await new Promise(resolve => {

//       this.http.post(`${URL}/user/login_redes`, usuario)
//         .subscribe(async resp => {

//           if (await resp['ok']) {
//             await this.guardarToken(resp['token']);

//             const user = {
//               nombre: resp['nombre'],
//               email: resp['email'],
//               avatar: resp['avatar'],
//               fb: resp['fb'],
//               provider: resp['provider']
//             };

//             await this.storage.set('usuariocache', user);

//             resolve(true);
//           } else {
//             this.token = '';
//             this.storage.remove('token');
//             resolve(false);
//           }

//         });


//     });


//   }

//   async logout() {

//     return new Promise(async resolve => {

//       this.token = '';
//       this.usuario = {};
//       await this.storage.remove('token');
//       await this.storage.remove('tipomapa');
//       await this.storage.remove('specialkey-icecreamp');
//       await this.storage.remove('specialkey-farmacys');
//       await this.storage.remove('specialkey-favcommerces');
//       await this.storage.remove('version');
//       await this.storage.remove('commerce_id');
//       await this.storage.remove('filter');
//       await this.storage.remove('user');
//       await this.storage.remove('usuariocache');
//       await this.storage.remove('cat_name');
//       await this.storage.remove('dark');
//       await this.storage.remove('search_text_c');
//       await this.storage.remove('search_text_o');
//       await this.storage.remove('search_text_p');
//       await this.storage.remove('search_text_s');
//       await this.navCtrl.navigateRoot('/main/tabs/home', { animated: true });
//     }).catch(err => {
//     });
//   }

//   registro(usuario: Usuario) {

//     return new Promise(resolve => {

//       this.http.post(`${URL}/user/create`, usuario)
//         .subscribe(async resp => {

//           if (await resp['ok']) {
//             await this.guardarToken(resp['token']);

//             const user = {
//               nombre: resp['nombre'],
//               email: resp['email'],
//               avatar: resp['avatar'],
//               fb: 'false',
//               provider: 'email'
//             };
//             await this.storage.set('usuariocache', user);

//             resolve(true);
//           } else {
//             this.token = '';
//             this.storage.remove('token');
//             resolve(false);
//           }

//         });


//     });


//   }

//   // !Admin users Modal
//   getUsers() {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     return this.http.get<RespuestaUser>(`${URL}/user/admusers`, { headers });

//   }

//   // Admin all users
//   getUsersAll(page) {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     return this.http.get<RespuestaUser>(`${URL}/user/admusers/?pagina=${page}`, { headers });

//   }

//   getUsersPage(pull: boolean = false) {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     if (pull) {
//       this.paginaSales = 0;
//     }

//     return this.http.get<RespuestaUser>(`${URL}/user/admusers/?pagina=${this.paginaSales}`, { headers });

//   }

//   // Admin users by date
//   getUsersAllByDate(fecha_init: any, fecha_fin: any) {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     return this.http.get<RespuestaUser>(`${URL}/user/admusersa/` + fecha_init + '/' + fecha_fin, { headers });

//   }

//   // Admin users by date
//   getFeriaAllByDate(fecha_init: any, fecha_fin: any) {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     return this.http.get<RespuestaUser>(`${URL}/stats/feria/` + fecha_init + '/' + fecha_fin, { headers });

//   }

//   getUsersPageByDate(pull: boolean = false) {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     if (pull) {
//       this.paginaSales = 0;
//     }

//     return this.http.get<RespuestaUser>(`${URL}/user/admusersa/?pagina=${this.paginaSales}`, { headers });

//   }

//   // ! TOTAL
//   getUsersTotal() {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     return this.http.get<RespuestaUser>(`${URL}/user/admuserstotal`, { headers });

//   }

//   async getUserId(): Promise<Usuario> {
//     const storage = await this.storageService.getStoredData('usuariocache');
//     return storage;
//   }

//   getUsersTotalFb() {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     return this.http.get<RespuestaUser>(`${URL}/user/admusersfb`, { headers });

//   }

//   getUsersTotalG() {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     return this.http.get<RespuestaUser>(`${URL}/user/admusersg`, { headers });

//   }

//   getUsersTotalEm() {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     return this.http.get<RespuestaUser>(`${URL}/user/admusersem`, { headers });

//   }

//   getUsersTotalLS() {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     return this.http.get<RespuestaUser>(`${URL}/user/admusersat`, { headers });

//   }

//   getUsersTotalRegT() {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     return this.http.get<RespuestaUser>(`${URL}/user/admuserstreg`, { headers });

//   }



//   getUsuario() {

//     if (!this.usuario._id) {
//       this.validaToken();
//     }

//     return { ...this.usuario };

//   }

//   // ! Recovery
//   recoveryUser(email: string) {

//     return this.http.get<RespuestaUser>(`${URL}/user/restore/` + email);
//   }

//   // ! Change Password recovery
//   checkTokenUser(data: any) {
//     return this.http.post(`${URL}/user/checktokenuser`, data);
//   }


//   changePassword(user: any) {
//     return this.http.post(`${URL}/user/change_password`, user);
//   }




//   searchUsers(busqueda: string, pull: boolean = false) {

//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });

//     if (pull) {
//       this.paginaSales = 0;
//     }

//     this.paginaSales++;

//     return this.http.get<RespuestaUser>(`${URL}/search/usuarios/` + busqueda + `?pagina=${this.paginaSales}`, { headers });

//   }


//   async guardarToken(token: string) {

//     this.token = token;
//     await this.storage.set('token', token);

//     await this.validaToken();


//   }

//   async cargarToken() {

//     this.token = await this.storage.get('token') || null;

//   }


//   async validaToken(): Promise<boolean> {

//     await this.cargarToken();

//     if (!this.token) {
//       // this.navCtrl.navigateRoot('/login');
//       return Promise.resolve(false);
//     }


//     return new Promise<boolean>(resolve => {

//       const headers = new HttpHeaders({
//         'x-token': this.token
//       });


//       this.http.get(`${URL}/user/`, { headers })
//         .subscribe(async resp => {

//           if (await resp['ok']) {
//             this.usuario = resp['usuario'];

//             await this.storage.get('usuariocache')
//               .then(async (data) => {

//                 let provider = '';
//                 if (data && data.provider) {
//                   provider = data.provider;
//                 } else {
//                   provider = 'email';
//                 }

//                 const user = {
//                   _id: this.usuario._id,
//                   nombre: this.usuario.nombre,
//                   email: this.usuario.email,
//                   avatar: this.usuario.avatar,
//                   fb: this.usuario.fb,
//                   provider: provider
//                 };
//                 this.storage.set('usuariocache', user);
//               });

//             resolve(true);
//           } else {
//             await this.storage.remove('token');
//             await this.storage.remove('usuariocache');
//             await this.storage.remove('user');
//             this.navCtrl.navigateRoot('/login');
//             resolve(false);
//           }

//         });

//     });

//   }

//   // Token ADMINS

//   async validaTokenAdm(): Promise<boolean> {

//     await this.cargarToken();

//     if (!this.token) {
//       this.navCtrl.navigateRoot('/login');
//       return Promise.resolve(false);
//     }


//     return new Promise<boolean>(resolve => {

//       const headers = new HttpHeaders({
//         'x-token': this.token
//       });


//       this.http.get(`${URL}/user/gadmin/`, { headers })
//         .subscribe(async resp => {

//           if (await resp['ok']) {
//             this.usuario = resp['usuario'];

//             await this.storage.get('usuariocache')
//               .then(async (data) => {

//                 let provider = '';
//                 if (data && data.provider) {
//                   provider = data.provider;
//                 } else {
//                   provider = 'email';
//                 }

//                 const user = {
//                   _id: this.usuario._id,
//                   nombre: this.usuario.nombre,
//                   email: this.usuario.email,
//                   avatar: this.usuario.avatar,
//                   fb: this.usuario.fb,
//                   provider: provider
//                 };
//                 this.storage.set('usuariocache', user);
//               });

//             resolve(true);
//           } else {
//             await this.storage.remove('token');
//             await this.storage.remove('usuariocache');
//             await this.storage.remove('user');
//             this.navCtrl.navigateRoot('/login');
//             resolve(false);
//           }

//         });

//     });

//   }



//   actualizarUsuario(usuario: Usuario) {


//     const headers = new HttpHeaders({
//       'x-token': this.token
//     });


//     return new Promise(resolve => {

//       this.http.post(`${URL}/user/update`, usuario, { headers })
//         .subscribe(resp => {

//           if (resp['ok']) {
//             this.guardarToken(resp['token']);
//             resolve(true);

//           } else {
//             resolve(false);
//           }

//         });

//     });

//   }

// }
