import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { SidebarItemComponent } from './sidebarItem.component';

describe('SidebarItemComponent', () => {
  let fixture: ComponentFixture<SidebarItemComponent>;
  let comp: SidebarItemComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidebarItemComponent, RouterModule.forRoot([])],
      providers: [],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(SidebarItemComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should initialize the component with the correct initial state', () => {
    expect(comp).toBeTruthy();
  });

  it('should set the name input correctly', () => {
    comp.name = 'Test Item';
    fixture.detectChanges();
    expect(comp.name).toBe('Test Item');
  });

  it('should set the redirectTo input correctly', () => {
    comp.redirectTo = '/test';
    fixture.detectChanges();
    expect(comp.redirectTo).toBe('/test');
  });

  it('should set the icon input correctly', () => {
    comp.icon = 'circle';
    fixture.detectChanges();
    expect(comp.icon).toBe('circle');
  });
});
