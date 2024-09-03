/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '@tasks/services/tasks.service';
import { of } from 'rxjs';
import EditTaskPageComponent from './edit-task-page.component';

describe('EditTaskPageComponent', () => {
  let component: EditTaskPageComponent;
  let fixture: ComponentFixture<EditTaskPageComponent>;
  let activatedRouteMock: any;
  let routerMock: any;
  let tasksServiceMock: any;

  beforeEach(async () => {
    activatedRouteMock = {
      params: of({ 'list-id': '1', 'task-id': '1' }),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    tasksServiceMock = {
      taskList: jasmine.createSpy('taskList').and.returnValue({
        '1': {
          id: '1',
          tasks: [
            {
              id: '1',
              title: 'Test Task',
              tags: [{ id: '1', name: 'Tag1', color: 'blue' }],
              links: [{ id: '1', name: 'Link1', link: 'https://example.com' }],
              comments: [{ id: '1', text: 'Comment1' }],
            },
          ],
        },
      }),
      editTask: jasmine.createSpy('editTask'),
    };

    await TestBed.configureTestingModule({
      imports: [EditTaskPageComponent, ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        { provide: TasksService, useValue: tasksServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form with task details', () => {
    expect(component.taskForm.get('title')?.value).toBe('Test Task');
    expect(component.taskForm.get('tags')?.value).toEqual([
      { id: '1', name: 'Tag1', color: 'blue' },
    ]);
    expect(component.taskForm.get('links')?.value).toEqual([
      { id: '1', name: 'Link1', link: 'https://example.com' },
    ]);
    expect(component.taskForm.get('comments')?.value).toEqual([
      { id: '1', text: 'Comment1' },
    ]);
  });

  it('should navigate to list page on cancel', () => {
    component.onCancel();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/tasks', '1']);
  });

  it('should add new tag to form array on tag addition', () => {
    const initialTagLength = component.currentTags.length;
    component.onClickAddTag({ id: '2', name: 'New Tag', color: 'red' });
    expect(component.currentTags.length).toBe(initialTagLength + 1);
  });

  it('should add new link to form array on link addition', () => {
    const initialLinkLength = component.currentLinks.length;
    component.onAddLink({
      id: '2',
      name: 'New Link',
      link: 'https://newlink.com',
    });
    expect(component.currentLinks.length).toBe(initialLinkLength + 1);
  });

  it('should add new comment to form array on comment addition', () => {
    const initialCommentLength = component.currentComments.length;
    component.onSaveComment({ id: '2', text: 'New Comment' });
    expect(component.currentComments.length).toBe(initialCommentLength + 1);
  });

  it('should update task title on title change', () => {
    component.onChangeTitle('Updated Task Title');
    expect(component.taskForm.get('title')?.value).toBe('Updated Task Title');
  });

  it('should add new tag to form array on tag addition', () => {
    const initialTagLength = component.currentTags.length;
    component.onClickAddTag({ id: '2', name: 'New Tag', color: 'red' });
    expect(component.currentTags.length).toBe(initialTagLength + 1);
  });

  it('should add new link to form array on link addition', () => {
    const initialLinkLength = component.currentLinks.length;
    component.onAddLink({
      id: '2',
      name: 'New Link',
      link: 'https://newlink.com',
    });
    expect(component.currentLinks.length).toBe(initialLinkLength + 1);
  });

  it('should add new comment to form array on comment addition', () => {
    const initialCommentLength = component.currentComments.length;
    component.onSaveComment({ id: '2', text: 'New Comment' });
    expect(component.currentComments.length).toBe(initialCommentLength + 1);
  });

  it('should navigate to list page on cancel', () => {
    component.onCancel();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/tasks', '1']);
  });

  it('should update task title on title change', () => {
    component.onChangeTitle('Updated Task Title');
    expect(component.taskForm.get('title')?.value).toBe('Updated Task Title');
  });
});
