import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  deleteItem(key: string): void {
    window.localStorage.removeItem(key);
  }

  clearAll(): void {
    window.localStorage.clear();
  }
}
