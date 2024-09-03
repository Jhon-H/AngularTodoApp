import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { UuidService } from '@shared/services/uuid.service';
import { TasksService } from '@tasks/services/tasks.service';
import { AddListModalComponent } from './add-list-modal.component';

@Component({
  selector: 'app-test-host-component',
  standalone: true,
  imports: [AddListModalComponent],
  template: `
    <tasks-add-list-modal
      [isOpen]="isOpen"
      (closeModal)="onClose()"
    ></tasks-add-list-modal>
  `,
})
class TestHostComponent {
  isOpen = true;

  onClose(): void {}
}

describe('AddListModalComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let tasksServiceSpy: jasmine.SpyObj<TasksService>;
  let uuidServiceSpy: jasmine.SpyObj<UuidService>;
  let addListModalComponent: AddListModalComponent;
  let txtInputElement: DebugElement;

  beforeEach(async () => {
    const tasksServiceSpyObj = jasmine.createSpyObj('TasksService', [
      'addList',
    ]);
    const uuidServiceSpyObj = jasmine.createSpyObj('UuidService', ['uuid']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, AddListModalComponent, TestHostComponent],
      providers: [
        { provide: TasksService, useValue: tasksServiceSpyObj },
        { provide: UuidService, useValue: uuidServiceSpyObj },
      ],
    }).compileComponents();

    tasksServiceSpy = TestBed.inject(
      TasksService,
    ) as jasmine.SpyObj<TasksService>;
    uuidServiceSpy = TestBed.inject(UuidService) as jasmine.SpyObj<UuidService>;

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    addListModalComponent = fixture.debugElement.query(
      By.directive(AddListModalComponent),
    ).componentInstance;
    txtInputElement = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a list when onAdd is called with valid input', () => {
    const listName = 'Test List';
    const listId = '1234';
    uuidServiceSpy.uuid.and.returnValue(listId);
    txtInputElement.nativeElement.value = listName;
    txtInputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const addButton = fixture.debugElement.query(By.css('#addBtn'));
    addButton.nativeElement.click();

    expect(tasksServiceSpy.addList).toHaveBeenCalledWith({
      id: listId,
      name: listName,
      icon: jasmine.any(String),
    });
  });

  it('should not add a list when onAdd is called with invalid input', () => {
    txtInputElement.nativeElement.value = '';
    txtInputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const addButton = fixture.debugElement.query(By.css('button'));
    addButton.nativeElement.click();

    expect(tasksServiceSpy.addList).not.toHaveBeenCalled();
  });

  it('should emit onClose event when onCancel is called', () => {
    spyOn(component, 'onClose');
    addListModalComponent.onCancel();
    expect(component.onClose).toHaveBeenCalled();
  });

  it('should emit onClose event when onClose is called', () => {
    spyOn(component, 'onClose');
    addListModalComponent.onClose();
    expect(component.onClose).toHaveBeenCalled();
  });
});
