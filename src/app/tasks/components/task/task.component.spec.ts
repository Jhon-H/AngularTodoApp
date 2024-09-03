import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.id = '1';
    component.title = 'Test Task';
    component.isComplete = false;
    component.comments = 2;
    component.links = 1;
    component.tags = [{ id: '1', name: 'Tag1', color: 'blue' }];
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit check when checkbox is checked', () => {
    spyOn(component.check, 'emit');
    const checkboxElement = fixture.debugElement.query(
      By.css('shared-checkbox'),
    ).componentInstance;
    checkboxElement.check.emit(true);
    expect(component.check.emit).toHaveBeenCalledWith({
      taskId: '1',
      isChecked: true,
    });
  });

  it('should not navigate when task is complete', () => {
    spyOn(component.router, 'navigate');
    component.isComplete = true;
    const divElement = fixture.debugElement.query(By.css('div')).nativeElement;
    divElement.click();
    expect(component.router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate when task is not complete', () => {
    spyOn(component.router, 'navigate');
    const divElement = fixture.debugElement.query(By.css('div')).nativeElement;
    divElement.click();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should display task details', () => {
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Test Task');
    const commentsElement = fixture.debugElement.query(
      By.css('p'),
    ).nativeElement;
    expect(commentsElement.textContent).toContain('2');
    const linksElement = fixture.debugElement.queryAll(By.css('p'))[1]
      .nativeElement;
    expect(linksElement.textContent).toContain('1');
    const tagElement = fixture.debugElement.query(
      By.css('shared-tag'),
    ).componentInstance;
    expect(tagElement.name).toBe('Tag1');
  });
});
