import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'getItem',
      'setItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        TasksService,
        { provider: LocalStorageService, useValue: localStorageService },
      ],
    });

    service = new TasksService(localStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load task lists', () => {
    const taskLists = {
      '1': { id: '1', name: 'List 1', iconName: 'chevron-left', tasks: [] },
    };
    service.loadLists(taskLists);

    expect(service.taskList()).toEqual(taskLists);
  });

  it('should add a task list', () => {
    const listMetadata = { id: '2', name: 'List 2', iconName: 'chevron-left' };
    service.addList(listMetadata);

    expect(service.taskList()['2']).toBeDefined();
    expect(service.taskList()['2']).toEqual({
      ...listMetadata,
      tasks: [],
    });
    expect(localStorageService.setItem).toHaveBeenCalledWith(
      'tasks',
      jasmine.any(String),
    );
  });

  it('should edit a task list', () => {
    const listMetadata = {
      id: '1',
      name: 'Updated List Name',
      iconName: 'chevron-left',
    };
    const initialTaskList = {
      '1': { id: '1', name: 'List 1', iconName: 'chevron-left', tasks: [] },
    };
    service.loadLists(initialTaskList);

    service.editList(listMetadata);

    expect(service.taskList()['1']).toEqual({ ...listMetadata, tasks: [] });
    expect(localStorageService.setItem).toHaveBeenCalledWith(
      'tasks',
      jasmine.any(String),
    );
  });

  it('should edit a task list title', () => {
    const listId = '1';
    const newName = 'Updated List Name';
    const initialTaskList = {
      '1': { id: '1', name: 'List 1', iconName: 'chevron-left', tasks: [] },
    };
    service.loadLists(initialTaskList);

    service.editListTitle(listId, newName);

    expect(service.taskList()[listId].name).toEqual(newName);
    expect(localStorageService.setItem).toHaveBeenCalledWith(
      'tasks',
      jasmine.any(String),
    );
  });

  it('should delete a task list', () => {
    const listId = '1';
    const initialTaskList = {
      '1': { id: '1', name: 'List 1', iconName: 'chevron-left', tasks: [] },
    };
    service.loadLists(initialTaskList);

    service.deleteList(listId);

    expect(service.taskList()[listId]).toBeUndefined();
    expect(localStorageService.setItem).toHaveBeenCalledWith(
      'tasks',
      jasmine.any(String),
    );
  });

  it('should add a task to a list', () => {
    const listId = '1';
    const task = {
      id: '3',
      title: 'Task 3',
      lastUpdate: new Date(),
      isComplete: false,
      comments: [],
      links: [],
      tags: [],
    };
    const initialTaskList = {
      '1': {
        id: '1',
        name: 'List 1',
        iconName: 'chevron-left',
        tasks: [
          {
            id: '2',
            title: 'Task 2',
            lastUpdate: new Date(),
            isComplete: false,
            comments: [],
            links: [],
            tags: [],
          },
        ],
      },
    };
    service.loadLists(initialTaskList);

    service.addTask(listId, task);

    expect(service.taskList()[listId].tasks).toContain(task);
    expect(localStorageService.setItem).toHaveBeenCalledWith(
      'tasks',
      jasmine.any(String),
    );
  });

  it('should edit a task in a list', () => {
    const listId = '1';
    const updatedTask = {
      id: '2',
      title: 'Updated Task Title',
      lastUpdate: new Date(),
      isComplete: false,
      comments: [],
      links: [],
      tags: [],
    };
    const initialTaskList = {
      '1': {
        id: '1',
        name: 'List 1',
        iconName: 'chevron-left',
        tasks: [
          {
            id: '2',
            title: 'Task 2',
            lastUpdate: new Date(),
            isComplete: false,
            comments: [],
            links: [],
            tags: [],
          },
        ],
      },
    };
    service.loadLists(initialTaskList);

    service.editTask(listId, updatedTask);

    expect(service.taskList()[listId].tasks).toContain(updatedTask);
    expect(localStorageService.setItem).toHaveBeenCalledWith(
      'tasks',
      jasmine.any(String),
    );
  });

  it('should update the completed state of a task', () => {
    const listId = '1';
    const taskId = '2';
    const actionType = 'toogle';
    const initialTaskList = {
      '1': {
        id: '1',
        name: 'List 1',
        iconName: 'chevron-left',
        tasks: [
          {
            id: '2',
            title: 'Task 2',
            lastUpdate: new Date(),
            isComplete: false,
            comments: [],
            links: [],
            tags: [],
          },
        ],
      },
    };
    service.loadLists(initialTaskList);

    service.updatedCompletedStateOfTask(listId, taskId, actionType);

    const updatedTask = service
      .taskList()
      [listId].tasks.find((task) => task.id === taskId);
    expect(updatedTask?.isComplete).toBe(true);
    expect(localStorageService.setItem).toHaveBeenCalledWith(
      'tasks',
      jasmine.any(String),
    );
  });
});
