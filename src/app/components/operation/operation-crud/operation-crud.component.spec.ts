import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCrudComponent } from './operation-crud.component';

describe('OperationCrudComponent', () => {
  let component: OperationCrudComponent;
  let fixture: ComponentFixture<OperationCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
