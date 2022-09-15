import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AermodComponent } from './aermod.component';

describe('AermodComponent', () => {
  let component: AermodComponent;
  let fixture: ComponentFixture<AermodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AermodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AermodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
