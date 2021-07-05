import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreCrudComponent } from './livre-crud.component';

describe('LivreCrudComponent', () => {
  let component: LivreCrudComponent;
  let fixture: ComponentFixture<LivreCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivreCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
