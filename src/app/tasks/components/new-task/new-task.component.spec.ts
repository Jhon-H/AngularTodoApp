import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UuidService } from '@shared/services/uuid.service';
import { NewTaskComponent } from './new-task.component';

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;
  let txtInputElement: HTMLInputElement;

  beforeEach(async () => {
    const uuidServiceSpyObj = jasmine.createSpyObj('UuidService', ['uuid']);

    await TestBed.configureTestingModule({
      imports: [NewTaskComponent],
      providers: [{ provide: UuidService, useValue: uuidServiceSpyObj }],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    txtInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTask when enter key is pressed with input text', () => {
    spyOn(component.addTask, 'emit');
    txtInputElement.value = 'Test Task';
    txtInputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    expect(component.addTask.emit).toHaveBeenCalled();
  });

  it('should not call addTask when enter key is pressed with empty input text', () => {
    spyOn(component.addTask, 'emit');
    txtInputElement.value = '';
    txtInputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    expect(component.addTask.emit).not.toHaveBeenCalled();
  });

  it('should emit discart when clicking outside with empty input text', () => {
    spyOn(component.discart, 'emit');
    txtInputElement.value = '';
    txtInputElement.dispatchEvent(new Event('input'));
    component.canCloseIfClickOutside = true;
    component.onClickOutside();
    fixture.detectChanges();
    expect(component.discart.emit).toHaveBeenCalled();
  });

  it('should emit addTask when clicking outside with input text', () => {
    spyOn(component.addTask, 'emit');
    txtInputElement.value = 'Test Task';
    txtInputElement.dispatchEvent(new Event('input'));
    component.canCloseIfClickOutside = true;
    component.onClickOutside();
    fixture.detectChanges();

    expect(component.addTask.emit).toHaveBeenCalled();
  });
});
