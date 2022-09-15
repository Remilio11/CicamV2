import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AermapComponent } from './aermap.component';

describe('AermapComponent', () => {
  let component: AermapComponent;
  let fixture: ComponentFixture<AermapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AermapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AermapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
