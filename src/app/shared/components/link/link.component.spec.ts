import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let fixture: ComponentFixture<LinkComponent>;
  let comp: LinkComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LinkComponent],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(LinkComponent);
      comp = fixture.componentInstance;

      comp.title = 'Test title';
      comp.link = 'https://';
      fixture.detectChanges();
    });
  }));

  it('Should render a link with correct href', () => {
    const link = fixture.debugElement.query(By.css('a'));
    expect(link).toBeDefined();
    expect(link.attributes['href']).toBe('https://');
  });

  it('Should render title if is passed on input', () => {
    const link = fixture.debugElement.query(By.css('a'));

    expect(link.nativeElement.textContent).toContain('Test title');
    expect(link.nativeElement.textContent).not.toContain('https://');
  });

  it('Should render href if title is not passed on input', () => {
    comp.title = undefined;
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a'));

    expect(link.nativeElement.textContent).toContain('https://');
    expect(link.nativeElement.textContent).not.toContain('Test title');
  });
});
