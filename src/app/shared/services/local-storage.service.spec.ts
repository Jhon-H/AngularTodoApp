import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        // for additional providers, write as examples below
        // ServiceName,
        // { provider: ServiceName, useValue: fakeServiceName },
        // { provider: ServiceName, useClass: FakeServiceClass },
        // { provider: ServiceName, useFactory: fakeServiceFactory, deps: [] },
      ],
    });
  });

  // you can also wrap inject() with async() for asynchronous tasks
  // it('...', async(inject([...], (...) => {}));

  it('should set an item in the local storage', () => {
    const service = new LocalStorageService();
    service.setItem('testKey', 'testValue');
    const storedValue = window.localStorage.getItem('testKey');
    expect(storedValue).toBe('testValue');
  });

  it('should get an item from the local storage', () => {
    window.localStorage.setItem('testKey', 'testValue');
    const service = new LocalStorageService();
    const retrievedValue = service.getItem('testKey');
    expect(retrievedValue).toBe('testValue');
  });

  it('should delete an item from the local storage', () => {
    window.localStorage.setItem('testKey', 'testValue');
    const service = new LocalStorageService();
    service.deleteItem('testKey');
    const storedValue = window.localStorage.getItem('testKey');
    expect(storedValue).toBeNull();
  });

  it('should clear all items from the local storage', () => {
    window.localStorage.setItem('testKey1', 'testValue1');
    window.localStorage.setItem('testKey2', 'testValue2');
    const service = new LocalStorageService();
    service.clearAll();
    const storedValue1 = window.localStorage.getItem('testKey1');
    const storedValue2 = window.localStorage.getItem('testKey2');
    expect(storedValue1).toBeNull();
    expect(storedValue2).toBeNull();
  });
});
