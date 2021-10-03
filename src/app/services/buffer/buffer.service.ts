import { Injectable } from '@angular/core';
import { bufferPathList } from './models/buffer-path-list.constants';

@Injectable({
  providedIn: 'root'
})
export class BufferService {

  map: Map<string, unknown> = new Map<string, unknown>();

  constructor() { }

  public deleteEntry(ruta: string): boolean {
    return this.map.delete(ruta);
  }
  
  public getEntry<T>(ruta: string): T {
    return this.map.get(ruta) as T;
  }
  
  public hasEntry(ruta: string): boolean {
    return this.map.has(ruta);
  }

  public isBufferedPath(ruta: string): boolean {
    return bufferPathList.some(path => path === ruta);
  }

  public setEntry<T>(ruta: string, value: T): void {
    this.map.set(ruta, value);
  }
}
