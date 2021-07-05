import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteCrudComponent } from './compte-crud.component';

describe('CompteCrudComponent', () => {
  let component: CompteCrudComponent;
  let fixture: ComponentFixture<CompteCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
