import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AermetComponent } from './aermet.component';

describe('AermetComponent', () => {
  let component: AermetComponent;
  let fixture: ComponentFixture<AermetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AermetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AermetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
