import { TestBed } from '@angular/core/testing';
import { UuidService } from './uuid.service';

describe('UuidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UuidService,
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

  it('should create a valid UUID', () => {
    const service = new UuidService();
    const uuid = service.uuid();
    // Regular expression to match UUID v4 pattern
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuid).toMatch(uuidPattern);
  });
});
